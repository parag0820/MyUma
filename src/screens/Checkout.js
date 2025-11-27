import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
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

const API_URL = 'https://myuma.net/api/ApiCommonController/charge'; // ← replace with your backend

export default function Checkout({navigation}) {
  const {createToken} = useStripe();
  const [cardDetailsComplete, setCardDetailsComplete] = useState(false);
  const [cardFieldKey, setCardFieldKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const amountTotal = route?.params?.totalAmount;
  const [amount, setAmount] = useState(amountTotal);

  const handlePayment = async () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Validation', 'Please enter a valid amount.');
      return;
    }
    if (!cardDetailsComplete) {
      Alert.alert('Validation', 'Please enter complete card details.');
      return;
    }

    setLoading(true);
    const userData = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(userData);
    const userId = userInfo?.id;
    const userLogin = await AsyncStorage.getItem('userLogin');
    const isLogin = JSON.parse(userLogin);

    try {
      // Create a Stripe token from the CardField input
      const {token, error} = await createToken({type: 'Card'});

      if (error) {
        console.error('Stripe token error:', error);
        Alert.alert(
          'Card Error',
          error.message || 'Failed to create card token',
        );
        setLoading(false);
        return;
      }

      if (!token?.id) {
        Alert.alert('Card Error', 'No token returned from Stripe.');
        setLoading(false);
        return;
      }

      // Send token, amount and user_id to your backend API
      const payload = {
        stripeToken: 'tok_visa', // e.g. "tok_1Hxxxx"
        amount: String(amount), // backend expects string in your example
        user_id: userId,
      };

      const resp = await axios.post(API_URL, payload, {
        headers: {'Content-Type': 'application/json'},
        timeout: 30000,
      });

      // handle response from backend
      Alert.alert('Success', 'Payment completed successfully!');
      // reset UI or navigate
      setAmount('');
      if (isLogin === 'Login successful') {
        navigation.navigate('Setting');
      }
      navigation.navigate('BottomNav');
      setCardFieldKey(prev => prev + 1);
    } catch (err) {
      console.error(
        'Payment request failed:',
        err?.response?.data ?? err.message ?? err,
      );
      Alert.alert(
        'Payment failed',
        err?.response?.data?.message ?? 'An error occurred',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding', android: undefined})}
      style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.label}>Amount </Text>
        {/* <TextInput
          placeholder="Enter amount (e.g. 50)"
          value={amount}
          onChangeText={t => setAmount(t.replace(/[^0-9.]/g, ''))}
          keyboardType="numeric"
          style={styles.input}
          returnKeyType="done"
        /> */}
        <View style={styles.input}>
          <Text style={styles.textAmount}>{amount}</Text>
        </View>

        <Text style={[styles.label, {marginTop: 8}]}>Card Details</Text>
        <CardField
          key={cardFieldKey}
          postalCodeEnabled={false}
          placeholders={{number: '4242 4242 4242 4242'}}
          cardStyle={{
            backgroundColor: '#FFFFFF', // valid
            textColor: '#000000', // required for text visibility
            fontSize: 16,
          }}
          style={styles.cardContainer}
          onCardChange={card => setCardDetailsComplete(Boolean(card?.complete))}
        />

        <TouchableOpacity
          style={[
            styles.payButton,
            (!cardDetailsComplete || !amount || loading) && styles.disabled,
          ]}
          onPress={handlePayment}
          disabled={!cardDetailsComplete || !amount || loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>Pay Now</Text>
          )}
        </TouchableOpacity>

        {/* <Text style={styles.small}>
          Using Stripe test card: 4242 4242 4242 4242 — any future expiry/CVC.
        </Text> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ddd',
  },
  label: {fontSize: 14, marginBottom: 6, color: '#222'},
  input: {
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardContainer: {
    height: 50,
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
  },
  textAmount: {
    fontSize: 12,
  },
  cardField: {
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16,
  },
  payButton: {
    marginTop: 20,
    backgroundColor: '#0B5345',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  disabled: {opacity: 0.6},
  small: {marginTop: 12, fontSize: 12, color: '#666'},
});
