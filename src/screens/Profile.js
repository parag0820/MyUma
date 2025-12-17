import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  useWindowDimensions,
  Alert,
} from 'react-native';
import BASE_URL from '../utils/styles/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation}) => {
  const {width} = useWindowDimensions();
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleUpdateProfile = async () => {
    if (!firstName || !lastName || !email || !password || !mobileNo) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPass) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      mobile_no: mobileNo,
      cpassword: confirmPass,
    };

    try {
      const responseEditProfile = await axios.post(
        `${BASE_URL}editUserProfile`,
        payload,
      );
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      if (error.response) {
        console.log('Server responded with:', error.response.data);
        console.log('Status:', error.response.status);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('Error setting up request:', error.message);
      }

      Alert.alert('Error', 'Something went wrong while updating your profile.');
    }
  };

  const getUserInfo = async () => {
    const userData = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(userData);
    const userId = userInfo?.id;

    try {
      const res = await axios.get(`${BASE_URL}myumaprofileviewone/${userId}`);
      console.log('UserId New API', res?.data?.data);

      const profileArray = res?.data?.data;

      // If it's an array, loop through and use the first (or all) entries
      profileArray?.map(item => {
        setEmail(item.email || '');
        setName(item.name || '');
        setFirstName(item.first_name || '');
        setLastName(item.last_name || '');
        setMobileNo(item.mobile_no || '');
      });
    } catch (error) {
      console.error('Failed to load user info:', error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}>
      <View style={styles.profileImageContainer}>
        {/* <View style={styles.imageWrapper}>
                    <Image source={require('../assets/myuma_logo.png')} style={styles.profileImage} />
                    <TouchableOpacity style={styles.cameraButton}>
                        <Text style={styles.cameraIcon}>📷</Text>
                    </TouchableOpacity>
                </View> */}
      </View>

      <View style={[styles.inputContainer, {width: width * 0.9}]}>
        {/* <Text style={styles.label}>Username</Text> */}
        {/* <TextInput style={styles.disabledInput}
                    placeholder='please enter user name'
                    placeholderTextColor={'gray'}
                    onChangeText={(txt) => { setUserName(txt) }}
                    value={userName} editable={false} /> */}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="please enter email"
          placeholderTextColor={'gray'}
          autoCapitalize="none"
          onChangeText={txt => {
            setEmail(txt);
          }}
          value={email}
          readOnly={true}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="please enter password"
          placeholderTextColor={'gray'}
          onChangeText={txt => {
            setPassword(txt);
          }}
          value={password}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="please enter confirm password"
          placeholderTextColor={'gray'}
          onChangeText={txt => {
            setConfirmPass(txt);
          }}
          value={confirmPass}
        />
        {/* 
                <Text style={styles.label}>Display name</Text>
                <TextInput style={styles.input}
                    placeholder='please enter user name'
                    placeholderTextColor={'gray'}
                    onChangeText={(txt) => { setName(txt) }}
                    value={name} /> */}

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="please enter first name"
          placeholderTextColor={'gray'}
          onChangeText={txt => {
            setFirstName(txt);
          }}
          value={firstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="please enter last name"
          placeholderTextColor={'gray'}
          onChangeText={txt => {
            setLastName(txt);
          }}
          value={lastName}
        />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="please enter mobile number"
          placeholderTextColor={'gray'}
          keyboardType="numeric"
          onChangeText={txt => {
            setMobileNo(txt);
          }}
          maxLength={10}
          value={mobileNo}
        />

        <TouchableOpacity
          onPress={handleUpdateProfile}
          style={[styles.button, {opacity: 1}]}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    borderRadius: 15,
    padding: 5,
  },
  cameraIcon: {
    color: '#fff',
    fontSize: 14,
  },
  inputContainer: {
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  disabledInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    color: '#999',
  },
  button: {
    width: '100%',
    backgroundColor: '#33c7b4',
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Profile;
