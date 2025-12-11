import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../utils/styles/Colors';
import axios from 'axios';
import BASE_URL from '../utils/styles/config';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Congratulatiopns..',
      text2: 'Welcome to Myumma 👋',
    });
    setTimeout(() => {
      navigation.replace('BottomNav');
    }, 2000);
  };

  const validateEmail = value => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!value.trim()) {
      setEmailError('Email is required');
    } else if (!regex.test(value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = value => {
    if (!value.trim()) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const loginHandler = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let hasError = false;

    if (!trimmedEmail) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!regex.test(trimmedEmail)) {
      setEmailError('Invalid email format');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (!trimmedPassword) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) return;
    const payload = {
      email: trimmedEmail,
      password: trimmedPassword,
    };
    try {
      const loginResponse = await axios.post(
        `${BASE_URL}myumaloginbypassword`,
        payload,
      );

      // Check the actual success flag/message
      const res = loginResponse.data;

      console.log('Response Login', res?.payment_status);
      if (
        (res?.status === true || res?.success === true) &&
        res?.payment_status === 'paid'
      ) {
        console.log('Login successful:', res?.data);
        const userdata = res?.data;
        const login = res.message;
        console.log('Response Login', login);

        await AsyncStorage.setItem('userInfo', JSON.stringify(userdata));
        await AsyncStorage.setItem('userLogin', JSON.stringify(login));
        showToast(); // Show success message
      } else {
        // Handle invalid credentials case
        const userdata = res?.data;

        await AsyncStorage.setItem('userInfo', JSON.stringify(userdata));
        navigation.navigate('Pricing');
        console.log('Invalid credentials:', res.message);
        setPasswordError(res.message || 'Invalid credentials'); // Show error on UI
      }
    } catch (error) {
      console.log('Login error:', error);
      setPasswordError('Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      {/* <TouchableOpacity style={styles.backArrow}>
                <Icon name="arrow-left" size={24} color="#333" />
                <Text style={{ color: '#000', fontSize: 20 }}>SignUp</Text>
            </TouchableOpacity> */}

      {/* Logo */}
      <Image
        source={require('../assets/myuma_logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          onBlur={() => validateEmail(email)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
      </View>
      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={secure}
            value={password}
            onChangeText={setPassword}
            onBlur={() => validatePassword(password)}
            style={[styles.input, {flex: 1}]}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Icon
              name={secure ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#999"
            />
          </TouchableOpacity>
        </View>
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}
      </View>

      {/* Reset Password */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('forget');
        }}
        style={{alignSelf: 'flex-end'}}>
        <Text style={styles.resetText}>Forget Password</Text>
      </TouchableOpacity>

      {/* Sign in Button */}
      <TouchableOpacity onPress={loginHandler} style={styles.signInBtn}>
        <Text style={styles.signInText}>Sign in with email</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <View style={styles.orContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.divider} />
      </View>

      {/* Google Sign-In */}
      <TouchableOpacity>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png',
          }}
          style={styles.googleLogo}
        />
      </TouchableOpacity>

      {/* Sign up link */}
      <TouchableOpacity
        onPress={() => {
          navigation.replace('SignUp');
        }}>
        <Text style={styles.signupText}>
          Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  backArrow: {
    alignSelf: 'flex-start',
    marginBottom: 20,
    color: '#000',
  },
  logo: {
    width: 200,
    height: 80,
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    color: Colors.buttonRounded,
    fontWeight: '500',
    marginBottom: 4,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    color: '#333',
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },

  resetText: {
    color: '#9F2B68',
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  signInBtn: {
    // backgroundColor: '#22c8b3',
    backgroundColor: Colors.buttonRounded,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  signInText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#999',
  },
  googleLogo: {
    width: 40,
    height: 40,
    marginBottom: 30,
  },
  signupText: {
    color: '#333',
  },
  signupLink: {
    color: Colors.buttonRounded,
    fontWeight: '600',
  },
});
