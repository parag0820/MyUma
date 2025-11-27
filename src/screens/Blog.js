import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../utils/styles/Colors';
import axios from 'axios';
import BASE_URL from '../utils/styles/config';

export default function Blog({navigation}) {
  const [blogData, setBlogData] = useState([]);

  const getBlogData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}myumablog`);
      setBlogData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('blogDetail', {id: item.id});
        }}
        style={styles.imageView}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{uri: item.image}}
        />
      </TouchableOpacity>
      <Text style={styles.blogText}>{item.tittle}</Text>
      <Text style={styles.blogContent}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={blogData}
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
