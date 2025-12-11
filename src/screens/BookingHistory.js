import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BASE_URL from '../utils/styles/config';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const userData = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userData);
      const userId = userInfo?.id;

      const response = await axios.get(`${BASE_URL}booknowone/${userId}`);
      setBookings(response.data.data || []);
    } catch (error) {
      console.log('Error fetching booking history:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image style={styles.image} source={{uri: item.images}} />
      <View style={styles.detailsView}>
        <Text style={styles.service}>{item.tittle}</Text>
        <Text style={styles.date}>Date: {item.created_date}</Text>
        <Text style={styles.date}>address: {item.address}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No booking history found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={bookings}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  detailsView: {
    marginLeft: 10,
  },
  image: {borderRadius: 10, width: 100, height: 100},
  service: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  status: {
    marginTop: 5,
    fontSize: 14,
    color: '#007bff',
  },
  amount: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#28a745',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    fontSize: 16,
    color: '#666',
  },
});

export default BookingHistory;
