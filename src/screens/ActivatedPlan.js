import axios from 'axios';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import BASE_URL from '../utils/styles/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ActivatedPlan = ({navigation, route}) => {
  const userPlan = async () => {
    const userData = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(userData);
    const userId = userInfo?.id;
    try {
      const planResponse = await axios.get(
        `${BASE_URL}myumaplanviewplan/${userId}`,
      );
      console.log('planResponse', planResponse?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userPlan();
  }, []);

  const planData = {
    planName: 'Premium Plan',
    validity: 30,
    startDate: '01 July 2025',
    endDate: '31 July 2025',
    features: ['Unlimited Chat', '10 Audio Calls', '5 Video Consultations'],
  };

  const {planName, validity, startDate, endDate, features} = planData;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Activated Plan</Text>

      <Text style={styles.label}>
        Plan Name: <Text style={styles.value}>{planName}</Text>
      </Text>
      <Text style={styles.label}>
        Validity: <Text style={styles.value}>{validity} days</Text>
      </Text>
      <Text style={styles.label}>
        Start Date: <Text style={styles.value}>{startDate}</Text>
      </Text>
      <Text style={styles.label}>
        End Date: <Text style={styles.value}>{endDate}</Text>
      </Text>

      <Text style={[styles.label, {marginTop: 10}]}>Features:</Text>
      <FlatList
        data={features}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Text style={styles.featureItem}>✓ {item}</Text>
        )}
      />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.closeButtonText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ActivatedPlan;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 2,
  },
  value: {
    fontWeight: '600',
  },
  featureItem: {
    fontSize: 14,
    marginLeft: 10,
    marginVertical: 1,
  },
  closeButton: {
    marginTop: 25,
    padding: 12,
    backgroundColor: 'tomato',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
