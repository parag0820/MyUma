import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import BASE_URL from '../utils/styles/config';
const {width} = Dimensions.get('window');

const Category = ({navigation}) => {
  const [data, setData] = useState([]);

  const getCategoryList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}myumacategory`);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('catSearch', {categoryId: item.id});
      }}
      style={styles.card}>
      <ImageBackground
        source={{uri: item.images}}
        style={styles.image}
        imageStyle={{borderRadius: 10}}>
        <View style={styles.overlay}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.header}>Category</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('catSearch');
          }}>
          <Icons name="search" color={'gray'} size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingTop: 40,
    paddingHorizontal: 16,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  list: {
    paddingBottom: 20,
  },

  icon: {
    marginHorizontal: 10,
  },

  card: {
    marginBottom: 16,
  },
  image: {
    width: width - 32,
    height: 180,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
