import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import BASE_URL from '../utils/styles/config';

export default function Checkout({navigation}) {
  const {createPaymentMethod} = useStripe();
  const route = useRoute();

  const amountTotal = route?.params?.totalAmount;

  // remove currency symbols
  const numericAmount = amountTotal
    ? Number(amountTotal.replace(/[^0-9.]/g, ''))
    : 0;

  const [amount] = useState(numericAmount);
  const [cardDetailsComplete, setCardDetailsComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Validation', 'Invalid amount');
      return;
    }

    if (!cardDetailsComplete) {
      Alert.alert('Validation', 'Please enter complete card details');
      return;
    }

    setLoading(true);

    try {
      const userData = await AsyncStorage.getItem('userInfo');
      if (!userData) {
        Alert.alert('Error', 'User not logged in');
        return;
      }

      const userInfo = JSON.parse(userData);
      const userId = userInfo?.id || userInfo?.user_id || userInfo?._id;

      if (!userId) {
        console.log('userInfo:', userInfo);
        Alert.alert('Error', 'User ID missing');
        return;
      }

      // ✅ CREATE PAYMENT METHOD
      const {paymentMethod, error} = await createPaymentMethod({
        paymentMethodType: 'Card',
      });

      if (error) {
        Alert.alert('Card Error', error.message);
        return;
      }

      if (!paymentMethod?.id) {
        Alert.alert('Error', 'Payment method creation failed');
        return;
      }

      // ✅ SEND CORRECT PAYLOAD
      const payload = {
        stripeToken: paymentMethod.id, // 🔥 IMPORTANT
        amount: Math.round(amount * 100),
        user_id: userId,
      };

      console.log('PAYMENT PAYLOAD:', payload);

      const response = await axios.post(`${BASE_URL}charge`, payload);

      console.log('Payment response:', response.data);

      Alert.alert('Success', 'Payment completed successfully');
      navigation.navigate('BottomNav');
    } catch (err) {
      console.log('Payment error full:', err?.response?.data || err);

      Alert.alert(
        'Payment Failed',
        err?.response?.data?.message || 'Payment could not be completed',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.label}>Amount</Text>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>{amount}</Text>
        </View>

        <Text style={[styles.label, {marginTop: 12}]}>Card Details</Text>

        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
            expiration: 'MM/YY',
            cvc: 'CVC',
          }}
          cardStyle={styles.cardContainer}
          style={styles.cardField}
          onCardChange={card => {
            setCardDetailsComplete(card?.complete === true);
          }}
        />

        <TouchableOpacity
          style={[
            styles.payButton,
            (!cardDetailsComplete || loading) && styles.disabled,
          ]}
          onPress={handlePayment}
          disabled={!cardDetailsComplete || loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>Pay Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  amountBox: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    placeholderColor: '#9E9E9E',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    fontSize: 16,
  },
  cardField: {
    width: '100%',
    height: 60,
    marginVertical: 12,
  },
  payButton: {
    height: 50,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  disabled: {
    opacity: 0.6,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
