import axios from 'axios';
import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Rating} from 'react-native-ratings';
import BASE_URL from '../utils/styles/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const ReviewModal = ({visible, onClose, onSubmit, serviceId}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const showToast = reviewData => {
    Toast.show({
      type: 'success',
      text1: 'Congratulations...',
      text2: 'Your Rating Added!',
    });
    setTimeout(() => {
      onSubmit(reviewData);
    }, 5000);
  };
  const handleSubmit = async () => {
    const userDeatil = await AsyncStorage.getItem(`userInfo`);
    const userInfo = JSON.parse(userDeatil);
    const userId = userInfo?.id;

    const reviewData = {
      user_id: userId,
      service_id: serviceId,
      review: reviewText,
      rating: rating,
    };

    try {
      const responseRate = await axios.post(
        `${BASE_URL}ratingpost`,
        reviewData,
      );
      showToast(reviewData);
    } catch (error) {
      console.log(error);
    }

    setRating(0);
    setReviewText('');
  };

  return (
    <Modal visible={visible} transparent animationType=" ">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.heading}>Rate the Service</Text>

          <View style={{backgroundColor: '#ddd', paddingVertical: 10}}>
            <Rating
              showRating={false}
              imageSize={30}
              startingValue={rating}
              onFinishRating={value => setRating(value)}
              style={{marginVertical: 10}}
              // tintColor="gray" // match with modalContent background
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Write your review..."
            value={reviewText}
            onChangeText={setReviewText}
            multiline
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={{color: '#fff'}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
              <Text style={{color: '#fff'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast />
    </Modal>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 80,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelBtn: {
    backgroundColor: '#999',
    padding: 10,
    borderRadius: 6,
    flex: 0.45,
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    flex: 0.45,
    alignItems: 'center',
  },
});
