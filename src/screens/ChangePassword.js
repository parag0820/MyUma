import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import BASE_URL from '../utils/styles/config';
import {useRoute} from '@react-navigation/native';
import Colors from '../utils/styles/Colors';

const ChangePassword = ({navigation}) => {
  const route = useRoute();
  const email = route?.params?.email;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      return Alert.alert('Error', 'Please fill in all fields.');
    }

    if (newPassword !== confirmPassword) {
      return Alert.alert('Error', 'New passwords do not match.');
    }

    // Call API to change password here

    const payload = {
      password: newPassword,
      cpassword: confirmPassword,
      email: email,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}change_forgot_password`,
        payload,
      );
      Alert.alert('password changed');
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }

    Alert.alert('Success', 'Password changed successfully!');
    // Reset fields if needed
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        placeholder="New Password"
        placeholderTextColor={'gray'}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm New Password"
        placeholderTextColor={'gray'}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  button: {
    backgroundColor: Colors.buttonRounded,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
