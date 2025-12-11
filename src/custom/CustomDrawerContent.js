import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../utils/styles/config';

export default function CustomDrawerContent(props) {
  const {navigation} = props;
  const [categoryExpanded, setCategoryExpanded] = useState(false);
  const [categoryListData, setCategoryListData] = useState([]);

  const categoryList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}myumacategory`);
      // console.log('serViceDROP', response.data.data);
      setCategoryListData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      categoryList();
    }, [setCategoryExpanded]),
  );

  return (
    <DrawerContentScrollView style={{backgroundColor: '#549a83'}} {...props}>
      <Image
        style={styles.profileImage}
        source={require('../assets/profile.png')}
      />
      <DrawerItem
        style={{backgroundColor: '#dcfef3', marginVertical: 5}}
        label="Home"
        onPress={() => navigation.navigate('Main Tabs', {screen: 'Home'})}
        icon={({color, size}) => (
          <Ionicons name="home-outline" color={color} size={size} />
        )}
      />
      <DrawerItem
        style={{backgroundColor: '#dcfef3', marginVertical: 5}}
        label="Category"
        onPress={() => navigation.navigate('Main Tabs', {screen: 'Category'})}
        icon={({color, size}) => (
          <Ionicons name="grid-outline" color={color} size={size} />
        )}
      />

      <DrawerItem
        style={{backgroundColor: '#dcfef3', marginVertical: 5}}
        label="Search"
        onPress={() => navigation.navigate('Main Tabs', {screen: 'Search'})}
        icon={({color, size}) => (
          <Ionicons name="search-outline" color={color} size={size} />
        )}
      />
      <DrawerItem
        style={{backgroundColor: '#dcfef3', marginVertical: 5}}
        label="Blog"
        onPress={() => navigation.navigate('Blog')}
        icon={({color, size}) => (
          <Ionicons name="newspaper-outline" color={color} size={size} />
        )}
      />
      <DrawerItem
        label="Setting"
        style={{backgroundColor: '#dcfef3', marginVertical: 5}}
        onPress={() => navigation.navigate('Main Tabs', {screen: 'Setting'})}
        icon={({color, size}) => (
          <Ionicons name="person-outline" color={color} size={size} />
        )}
      />

      <TouchableOpacity
        onPress={() => setCategoryExpanded(!categoryExpanded)}
        style={styles.dropdownHeader}>
        <Ionicons name="grid-outline" size={20} color="black" />
        <Text style={styles.dropdownHeaderText}>Category</Text>
        <View style={{marginRight: 10}}>
          <Ionicons
            name={categoryExpanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color="black"
          />
        </View>
      </TouchableOpacity>

      {categoryExpanded && (
        <View style={styles.dropdownContent}>
          {categoryListData.map(category => (
            <TouchableOpacity
              key={category.id}
              onPress={() =>
                navigation.navigate('Main Tabs', {
                  screen: 'Category',
                  params: {screen: category.name},
                })
              }
              style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 17,
    marginVertical: 5,
    backgroundColor: '#dcfef3',
    padding: 10,
    borderRadius: 30,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginVertical: 10,
    alignSelf: 'center',
  },
  dropdownHeaderText: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  dropdownContent: {
    // paddingLeft: 40,
  },
  dropdownItem: {
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginVertical: 3,
    paddingLeft: 10,
    borderRadius: 15,
    paddingLeft: 20,
  },
  dropdownItemText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
  },
});
