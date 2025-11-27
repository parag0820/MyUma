// MyBookingList.js
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import BASE_URL from '../utils/styles/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyBookingList = () => {
  const {width} = useWindowDimensions();
  const [bookingList, setBookingList] = useState([]);

  const bookings = [
    {
      id: '1',
      date: '23/06/2025',
      listingName: 'Salon',
      categories: 'Shop',
      status: 'Approved',
    },
    {
      id: '2',
      date: '24/06/2025',
      listingName: 'Therapist',
      categories: 'Health',
      status: 'Pending',
    },
  ];

  const myBooking = async () => {
    const userData = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(userData);
    const userId = userInfo.id;

    try {
      const response = await axios.get(
        `${BASE_URL}myumaserviceviewonebyuser/${userId}`,
      );
      console.log('user REsponse', response?.data?.data);
      setBookingList(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    myBooking();
  }, []);

  const getStatusStyle = status => {
    switch (status.toLowerCase()) {
      case 'approved':
        return {color: 'green'};
      case 'pending':
        return {color: 'orange'};
      case 'cancelled':
        return {color: 'red'};
      default:
        return {color: 'gray'};
    }
  };

  const renderBookingItem = ({item}) => {
    return (
      <View style={[styles.row, {width: width * 1}]}>
        <Text style={styles.cell}>{item.date}</Text>
        <Text style={styles.cell}>{item.listingName}</Text>
        <Text style={styles.cell}>{item.categories}</Text>
        <Text style={[styles.cell, getStatusStyle(item.status)]}>
          {item.status}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.headerRow, {width: width * 1}]}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}> Name</Text>
        <Text style={styles.headerCell}>Categories</Text>
        <Text style={styles.headerCell}>Status</Text>
      </View>

      {/* List */}
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={renderBookingItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MyBookingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  list: {
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ddd',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});
