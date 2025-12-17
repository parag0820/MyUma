import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CustomSearchBar from '../custom/SearchBar/CustomSearchBar';
import axios from 'axios';
import BASE_URL from '../utils/styles/config';
import {useFocusEffect} from '@react-navigation/native';

const Search = () => {
  const [search, setSearch] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const getCategoryList = async () => {
    try {
      const categoryResponse = await axios.get(`${BASE_URL}myumacategory`);
      setCategoryList(categoryResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = categoryList.filter(item =>
    item.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: item.images}} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.cardText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  useFocusEffect(
    useCallback(() => {
      getCategoryList();
    }, []),
  );

  return (
    <View style={styles.container}>
      <CustomSearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search for Items"
        placeholderTextColor={'gray'}
      />

      <Text style={styles.title}>Categories</Text>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingLeft: 16}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 16,
    marginLeft: 16,
    color: '#000',
  },
  card: {
    marginRight: 16,
    borderRadius: 10,
    overflow: 'hidden',
    width: 140,
    height: 120,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 10,
  },
  cardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Search;
