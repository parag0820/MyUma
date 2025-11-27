import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BASE_URL from '../utils/styles/config';
import {useRoute} from '@react-navigation/native';
import Colors from '../utils/styles/Colors';

export default function BlogDetails({navigation}) {
  const [blogDetails, setBlogDetails] = useState([]);
  const route = useRoute();
  const id = route?.params?.id;

  const getBlogDetails = async () => {
    try {
      const blogDetailsResponse = await axios.get(
        `${BASE_URL}myumablogviewone/${id}`,
      );
      setBlogDetails(blogDetailsResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetails();
  }, []);
  const renderItem = ({item}) => (
    <View style={styles.container}>
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{uri: item.image}}
        />
      </View>
      <Text style={styles.blogText}>{item.tittle}</Text>
      <Text style={styles.blogContent}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={blogDetails}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.content}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    padding: 20,
  },
  imageView: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  blogText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.secondary || '#333',
  },
  blogContent: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
    textAlign: 'justify',
  },
});
