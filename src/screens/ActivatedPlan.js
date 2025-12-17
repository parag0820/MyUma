import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import BASE_URL from '../utils/styles/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../utils/styles/Colors';

const ActivatedPlan = ({navigation}) => {
  const [plan, setPlan] = useState([]);

  const userPlan = async () => {
    try {
      const userData = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userData);
      const userId = userInfo?.id;

      const response = await axios.get(
        `${BASE_URL}myumaplanviewplan/${userId}`,
      );

      console.log('planResponse', response?.data?.data);
      setPlan(response?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userPlan();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Active Plan</Text>

      <FlatList
        data={plan}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.planTitle}>{item?.tittle}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Price</Text>
              <Text style={[styles.value, {color: 'green'}]}>
                {item?.price}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>{item?.duration}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Start Date</Text>
              <Text style={styles.value}>{item?.created_date}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>End Date</Text>
              <Text style={styles.value}>{item?.expire_date}</Text>
            </View>
          </View>
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
    backgroundColor: '#F2F4F7',
    padding: 20,
  },

  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 15,
    alignSelf: 'center',
  },

  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
  },

  planTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.buttonRounded,
    marginBottom: 12,
    alignSelf: 'center',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  label: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },

  value: {
    fontSize: 16,
    color: '#1B1B1B',
    fontWeight: '600',
  },

  closeButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: Colors.buttonRounded,
    borderRadius: 10,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
