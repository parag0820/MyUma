import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
  View,
  useWindowDimensions,
} from 'react-native';

import BASE_URL from '../utils/styles/config';

const AboutUs = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const {width} = useWindowDimensions();

  const getAbout = async () => {
    try {
      const res = await axios.get(`${BASE_URL}newaboutus`);
      setNotes(res.data?.data || []);
    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Text style={styles.noteText}>{item.note}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
    textAlign: 'center',
  },
  noteText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 22,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
});

export default AboutUs;
