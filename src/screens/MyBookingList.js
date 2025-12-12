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
import Loader from '../custom/Loader';

const MyBookingList = () => {
  const {width} = useWindowDimensions();
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    myBooking();
  }, []);
  const getStatusStyle = status => {
    if (status === '1') return {color: 'green'};
    if (status === '0') return {color: 'red'};

    if (!status) return {color: 'gray'};

    // If the status is string
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

  const formatDate = dateString => {
    if (!dateString) return 'N/A';

    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const renderBookingItem = ({item}) => {
    return (
      <View style={[styles.row, {width: width * 1}]}>
        <Text style={[styles.cell, styles.colDate]}>
          {formatDate(item?.created_date)}
        </Text>

        <Text style={[styles.cell, styles.colName, {textAlign: 'left'}]}>
          {item?.tittle}
        </Text>

        <Text style={[styles.cell, styles.colCategory]}>{item?.pricefrom}</Text>

        <Text
          style={[styles.cell, styles.colStatus, getStatusStyle(item?.status)]}>
          {item?.status === '1'
            ? 'Active'
            : item?.status === '0'
            ? 'Deactive'
            : item?.status ?? 'N/A'}
        </Text>
      </View>
    );
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.headerRow, {width: width * 1}]}>
        <Text style={[styles.headerCell, styles.colDate]}>Date</Text>
        <Text style={[styles.headerCell, styles.colName]}>Name</Text>
        <Text style={[styles.headerCell, styles.colCategory]}>Categories</Text>
        <Text style={[styles.headerCell, styles.colStatus]}>Status</Text>
      </View>

      {/* List */}
      <FlatList
        data={bookingList}
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
    backgroundColor: '#fff',
  },
  list: {
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#552020ff',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#552020ff',
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  cell: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: 4,
  },

  // NEW WIDTHS ADDED
  colDate: {width: 90},
  colName: {width: 80},
  colCategory: {width: 100},
  colStatus: {width: 80},
});
