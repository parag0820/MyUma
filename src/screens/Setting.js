import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
  ScrollView,
  Modal, // ADD THIS
  Pressable, // ADD THIS
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CommonActions} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({navigation}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false); // New state
  const [email, setEmail] = useState('');
  const [name, setUserName] = useState('');

  const toggleSwitch = () => setNotificationsEnabled(previous => !previous);

  const logoutHandler = async () => {
    setLogoutModalVisible(false); // Hide Modal first
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('userLogin');
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }, 3000);
  };

  const getsUerInfo = async () => {
    const userData = await AsyncStorage.getItem('userInfo');
    const userInfo = await JSON.parse(userData);

    setUserName(userInfo.first_name);
    setEmail(userInfo.email);
  };

  useEffect(() => {
    getsUerInfo();
  }, []);

  return (
    <>
      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        visible={logoutModalVisible}
        animationType="fade"
        onRequestClose={() => setLogoutModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.modalButtonContainer}>
              <Pressable style={styles.modalButton} onPress={logoutHandler}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, {backgroundColor: '#ccc'}]}
                onPress={() => setLogoutModalVisible(false)}>
                <Text style={[styles.modalButtonText, {color: '#333'}]}>
                  No
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Main Content */}
      <ScrollView style={styles.container}>
        <View style={[styles.header, {backgroundColor: '#a5697f'}]}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR592vi0ne7O0g54LK7j4DyX0iDp9cC8lsoag&s',
            }}
            style={styles.headerImage}
          />
          <Text style={styles.headerText}>Settings</Text>
        </View>

        <View style={styles.profileSection}>
          {/* <Ionicons name="person-circle" size={60} color="#ccc" /> */}
          <View style={styles.userInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <MaterialIcons name="edit" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* When user clicks this, show modal */}
        <TouchableOpacity
          onPress={() => setLogoutModalVisible(true)}
          style={styles.item}>
          <Ionicons name="log-out-outline" size={20} color="#333" />
          <Text style={styles.itemText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>General Setting</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BookingHistory');
          }}
          style={styles.item}>
          <Ionicons name="time-outline" size={20} color="#333" />
          <Text style={styles.itemText}>Booking History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(`Pricing`);
          }}
          style={styles.item}>
          <MaterialIcons name="price-change" size={20} color="#333" />
          <Text style={styles.itemText}>Pricing </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('wishList');
          }}
          style={styles.item}>
          <FontAwesome name="heart-o" size={20} color="#333" />
          <Text style={styles.itemText}>My Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ActivePlan');
          }}
          style={styles.item}>
          <Icon name="crown" size={20} color="#333" />
          <Text style={styles.itemText}>Active Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AboutUs');
          }}
          style={styles.item}>
          <MaterialIcons name="info-outline" size={20} color="#333" />
          <Text style={styles.itemText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Message');
          }}
          style={styles.item}>
          <MaterialIcons name="message" size={20} color="#333" />
          <Text style={styles.itemText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MyBookingList');
          }}
          style={styles.item}>
          <MaterialIcons name="sticky-note-2" size={20} color="#333" />
          <Text style={styles.itemText}>My Booking</Text>
        </TouchableOpacity>
        {/* <View style={styles.item}>
          <Ionicons name="notifications-outline" size={20} color="#333" />
          <Text style={styles.itemText}>Get Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleSwitch}
            style={{marginLeft: 'auto'}}
          />
        </View> */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('TearmsAndConditions');
          }}
          style={styles.item}>
          <MaterialIcons name="info-outline" size={20} color="#333" />
          <Text style={styles.itemText}>Terms & Conditions</Text>
        </TouchableOpacity>
        {/* 
        <TouchableOpacity style={styles.item}>
          <MaterialIcons name="message" size={20} color="#333" />
          <Text style={styles.itemText}>Notification Messages</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => { navigation.navigate('map') }} style={styles.item}>
                    <MaterialIcons name="message" size={20} color="#333" />
                    <Text style={styles.itemText}>Map </Text>
                </TouchableOpacity> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#00aaff',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 40,
  },
  headerImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '600',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    paddingHorizontal: 15,
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#00aaff',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    elevation: 4,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Setting;
