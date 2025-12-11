import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Colors from '../utils/styles/Colors';
import axios from 'axios';
import BASE_URL from '../utils/styles/config';
import Toast from 'react-native-toast-message';

const SignUp = ({navigation}) => {
  const {width} = useWindowDimensions();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(''); // 'customer' or 'vendor'
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: '',
  });

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Congratulations...',
      text2: 'You are Registered Successfully 👋',
    });
    setTimeout(() => {
      navigation.replace('Login');
    }, 5000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleBlur = field => {
    const value = formData[field]?.trim() || '';
    let newErrors = {...errors};

    if (!value) {
      newErrors[field] = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } is required`;
    } else {
      delete newErrors[field];

      if (field === 'email') {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regex.test(value)) {
          newErrors.email = 'Invalid email format';
        }
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      type: formData.userType,
    };
    console.log('signup apyload', payload);

    try {
      const signUpResponse = await axios.post(
        `${BASE_URL}userRegister`,
        payload,
      );
      console.log('userResponse ', signUpResponse?.data?.data);
      showToast();
    } catch (error) {
      console.log(error);
      console.log('user Error ', error.response);
    }
  };

  const validateBeforeSubmit = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'userType',
    ];
    let newErrors = {};

    requiredFields.forEach(field => {
      const value = formData[field]?.trim() || '';
      if (!value) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (field === 'email') {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regex.test(value)) {
          newErrors.email = 'Invalid email format';
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleSubmit(); // or submit your API call here
    }
  };

  // const validateBeforeSubmit = () => {

  //     const requiredFields = ['firstName', 'lastName', 'email', 'password'];
  //     let newErrors = {};

  //     requiredFields.forEach((field) => {
  //         const value = formData[field]?.trim() || '';
  //         if (!value) {
  //             newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
  //         } else if (field === 'email') {
  //             const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //             if (!regex.test(value)) {
  //                 newErrors.email = 'Invalid email format';
  //             }
  //         }
  //     });

  //     if (!userType) {
  //         newErrors.userType = 'Please select a role';
  //     }

  //     setErrors(newErrors);

  //     if (Object.keys(newErrors).length === 0) {
  //         console.log('All Fields ', firstName, lastName, email, password, userType);
  //         // Submit the form here
  //         console.log('Submitted:', {
  //             ...formData,
  //             userType
  //         });
  //     }

  //     // const requiredFields = ['firstName', 'lastName', 'email', 'password'];
  //     // let newErrors = {};

  //     // requiredFields.forEach((field) => {
  //     //     const value = formData[field]?.trim() || '';
  //     //     if (!value) {
  //     //         newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
  //     //     } else if (field === 'email') {
  //     //         const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  //     //         if (!regex.test(value)) {
  //     //             newErrors.email = 'Invalid email format';
  //     //         }
  //     //     }
  //     // });

  //     // if (!userType) {
  //     //     newErrors.userType = 'Please select a role';
  //     // }

  //     // setErrors(newErrors);

  //     // if (Object.keys(newErrors).length === 0) {
  //     //     console.log('Submit form here!');
  //     //     console.log('All Fields ', firstName, lastName, email, password, userType);

  //     //     // Proceed to submit your form
  //     // }
  // };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={[styles.form, {width: width * 0.9}]}>
        <View style={styles.backArrow}>
          {/* <TouchableOpacity>
                        <Icon name="arrow-left" size={24} color="#333" />
                    </TouchableOpacity> */}

          <Text style={styles.SignUpHeading}>SignUp</Text>
        </View>
        <TextInput
          placeholder="First Name"
          placeholderTextColor={'gray'}
          value={formData.firstName}
          onChangeText={text => handleChange('firstName', text)}
          onBlur={() => handleBlur('firstName')}
          style={styles.input}
        />
        {errors.firstName && (
          <Text style={styles.error}>{errors.firstName}</Text>
        )}

        <TextInput
          placeholder="Last Name"
          placeholderTextColor={'gray'}
          value={formData.lastName}
          onChangeText={text => handleChange('lastName', text)}
          onBlur={() => handleBlur('lastName')}
          style={styles.input}
        />
        {errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor={'gray'}
          value={formData.email}
          onChangeText={text => handleChange('email', text)} // ✅ Fixed here
          onBlur={() => handleBlur('email')}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter password"
          placeholderTextColor={'gray'}
          value={formData.password}
          onChangeText={text => handleChange('password', text)} // ✅ Fixed here
          onBlur={() => handleBlur('password')}
          style={styles.input}
          secureTextEntry
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
        <Text style={styles.label}>Register as:</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleChange('userType', 'guest')}>
            <View
              style={[
                styles.circle,
                formData.userType === 'guest' && styles.selected,
              ]}
            />
            <Text style={styles.radioText}>Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => handleChange('userType', 'owner')}>
            <View
              style={[
                styles.circle,
                formData.userType === 'owner' && styles.selected,
              ]}
            />
            <Text style={styles.radioText}>Owner</Text>
          </TouchableOpacity>
        </View>
        {errors.userType && <Text style={styles.error}>{errors.userType}</Text>}

        <Text style={styles.agreeText}>
          By signing up, you agree to our{' '}
          <Text style={styles.link}>Privacy and Term</Text>
        </Text>

        <TouchableOpacity style={styles.button} onPress={validateBeforeSubmit}>
          <Text style={styles.buttonText}>Create an account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.replace(`Login`);
          }}>
          <Text style={styles.loginLink}>
            OR <Text style={styles.link}>Login to your account</Text>
          </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  SignUpHeading: {color: '#000', fontSize: 20, fontWeight: '700'},
  backArrow: {
    flex: 1,
    alignSelf: 'flex-start',
    // marginBottom: 20,
    flexDirection: 'row',
    color: '#000',
  },
  form: {
    alignSelf: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: 15,
    padding: 10,
    fontSize: 16,
    color: '#000',
  },
  label: {
    color: 'teal',
    marginTop: 20,
    fontSize: 14,
    fontWeight: '500',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  radioContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: Colors.buttonRounded,
  },
  radioText: {
    fontSize: 14,
    color: '#000',
  },
  agreeText: {
    marginTop: 20,
    fontSize: 12,
    color: '#666',
  },
  link: {
    color: Colors.buttonRounded,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: Colors.buttonRounded,
    marginTop: 30,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },
});
