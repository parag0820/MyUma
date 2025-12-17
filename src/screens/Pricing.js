import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Pressable} from 'react-native';
import BASE_URL from '../utils/styles/config';
import SubscribeModal from '../modal/Subscribe';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Pricing = ({navigation}) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [planAmount, setPlanAmount] = useState(null);
  const [userId, setuserId] = useState(null);
  const [planData, setPlanData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubscribe = async payload => {
    const payloads = {
      user_id: userId,
      plan_id: selectedPlanId,
    };
    try {
      const response = await axios.post(`${BASE_URL}userplanpost`, payloads);
      navigation.navigate('Checkout', {totalAmount: planAmount});
    } catch (error) {
      console.log(error);
    }
    // 🔁 Replace with your Axios POST request
    axios.post(`${BASE_URL}/subscribe`, payload);
    setModalVisible(false);
  };

  const handlePlanPress = async plan => {
    console.log('selected Id final ', plan?.id);

    setSelectedPlanId(plan?.id);
    setPlanAmount(plan?.price);
    const userdata = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(userdata);
    const userId = userInfo?.id;
    setuserId(userId);
    setModalVisible(true);
    // You can also navigate or call APIs here if needed
    console.log('Selected Plan:', id);
  };
  const getPlans = async () => {
    try {
      const res = await axios.get(`${BASE_URL}subcriptionplannew`);
      setPlanData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.heading}>Pricing</Text>
      <Text style={styles.subHeading}>
        Sacramento Business Listing and Directory
      </Text> */}

      <View style={styles.cardContainer}>
        {planData.map(plan => (
          <Pressable
            key={plan.id}
            onPress={() => handlePlanPress(plan)}
            style={[
              styles.card,
              plan.id === 'extended' && styles.highlight,
              selectedPlanId === plan.id && styles.selectedCard,
            ]}>
            <Text style={styles.title}>{plan.title}</Text>
            <Text style={styles.price}>{plan.price}</Text>
            <Text style={styles.duration}>{plan.duration}</Text>
            <Text style={styles.description}>{plan.description}</Text>
            {plan.features.map((item, i) => (
              <Text key={i} style={styles.feature}>
                {'\u2022'} {item}
              </Text>
            ))}
          </Pressable>
        ))}
      </View>
      <SubscribeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubscribe={handleSubscribe}
        userId={userId}
        planId={selectedPlanId}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  // heading: {
  //   color: '#111',
  //   fontSize: 26,
  //   fontWeight: 'bold',
  //   marginBottom: 6,
  //   textAlign: 'center',
  // },
  // subHeading: {
  //   fontSize: 14,
  //   color: '#777',
  //   marginBottom: 20,
  //   textAlign: 'center',
  // },
  cardContainer: {
    flexDirection: 'column',
    gap: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  highlight: {
    // borderColor: 'black',
    backgroundColor: '#f0f8ff',
  },
  selectedCard: {
    borderColor: '#007bff',
    backgroundColor: '#e6f0ff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e60000',
  },
  duration: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    color: '#555',
    marginBottom: 8,
  },
  feature: {
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
  },
});

export default Pricing;
