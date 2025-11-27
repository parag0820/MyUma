import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Colors from '../utils/styles/Colors';
import axios from 'axios';
import BASE_URL from '../utils/styles/config';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = async () => {
    // Send OTP API Call Here
    const payload = {
      username: email.trim(),
    };

    try {
      const forgetPassResponse = await axios.post(
        `${BASE_URL}forgotpasswordd`,
        payload,
      );
    } catch (error) {
      console.log('Forget Testing ', error);
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    // Verify OTP API Call Here

    const payload = {
      email: email.trim(),
      otp: otp.trim(),
    };

    try {
      const otpResponse = await axios.post(
        `${BASE_URL}verify_Forgot_otp`,
        payload,
      );
      navigation.navigate('changePassword', {email: email});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/myuma_logo.png')}
      />
      <View style={{flex: 1, justifyContent: 'center'}}>
        {/* <Text style={styles.title}>Forgot Password</Text> */}

        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {!otpSent ? (
          <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TextInput
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              style={styles.input}
              maxLength={6}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    height: 50,
    paddingTop: 30,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
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
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
