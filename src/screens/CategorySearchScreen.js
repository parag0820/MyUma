import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import BASE_URL from '../utils/styles/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CategorySearchScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [likedItems, setLikedItems] = useState(new Set()); // Using Set to store liked item IDs
  const [favoriteData, setFavoriteData] = useState([]);

  const route = useRoute();
  const catId = route?.params?.categoryId;

  const getCategory = async () => {
    try {
      const res = await axios.get(`${BASE_URL}myumaserviceviewone/${catId}`);
      setCategoryList(res.data.data || []);
    } catch (error) {
      console.log('Error fetching category:', error);
    }
  };

  // get Fav List

  const getFaverate = async () => {
    const userdata = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(userdata);
    const userId = userInfo?.id;

    try {
      const favListResponse = await axios.get(`${BASE_URL}wishlist/${userId}`);
      const favData = favListResponse?.data?.data || [];

      // Save the full data for unliking
      setFavoriteData(favData);

      // Extract only service_ids
      const favServiceIds = favData.map(fav => fav.service_id);
      setLikedItems(new Set(favServiceIds));
    } catch (error) {
      console.log('Error fetching favorite list:', error);
    }
  };

  const handleToggleFavorite = async selectedId => {
    try {
      const userdata = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userdata);
      const userId = userInfo?.id;

      const isLiked = likedItems.has(selectedId);

      if (isLiked) {
        console.log('Unliking service_id:', selectedId);

        // Find wishlist item by service_id
        const matchedFav = favoriteData.find(
          fav => fav.service_id === selectedId,
        );
        const wishlistId = matchedFav?.id;

        if (!wishlistId) {
          Alert.alert('Error', 'Unable to find wishlist item for removal');
          return;
        }

        await axios.delete(`${BASE_URL}deletewishlist/${wishlistId}`);
        Alert.alert('Removed from Favorites');

        // Update both likedItems and favoriteData
        setLikedItems(prev => {
          const updated = new Set(prev);
          updated.delete(selectedId);
          return updated;
        });
        setFavoriteData(prev =>
          prev.filter(fav => fav.service_id !== selectedId),
        );
      } else {
        await axios.post(
          `https://spacebuildingsolutions.com/myuma_admin/api/ApiCommonController/wishlistpost`,
          {
            user_id: userId,
            service_id: selectedId,
          },
        );
        Alert.alert('Added to Favorites');
        setLikedItems(prev => new Set(prev).add(selectedId));
      }
    } catch (error) {
      console.error('Favorite toggle failed:', error);
      Alert.alert('Error', 'Could not update favorite status');
    }
  };

  // useEffect(() => {

  //     getFaverate()

  //     if (catId) {
  //         getCategory();
  //     }
  // }, [catId]);
  useEffect(() => {
    getFaverate(); // Independent
  }, []);

  useEffect(() => {
    if (catId) {
      getCategory();
    }
  }, [catId]);

  const filteredItems = categoryList.filter(
    item =>
      item.tittle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for Items"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          renderItem={({item}) => {
            const isLiked = likedItems.has(item.id);
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ServiceDetail', {id: item.id});
                }}
                style={styles.card}>
                <Image
                  source={{uri: item.images}}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.title}>{item.tittle}</Text>
                  <Text style={styles.location}>{item.address}</Text>
                  {item.pricefrom || item.priceto ? (
                    <Text style={styles.price}>
                      {item.pricefrom && `₹${item.pricefrom}`}
                      {item.priceto && ` - ₹${item.priceto}`}
                    </Text>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => handleToggleFavorite(item.id)}
                    style={{alignSelf: 'flex-end'}}>
                    <Icon
                      name={isLiked ? 'heart' : 'heart-o'}
                      size={24}
                      color={isLiked ? 'red' : 'gray'}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No items found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, backgroundColor: '#fff'},
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {flex: 1, padding: 8},
  categoryTabs: {flexDirection: 'row', marginBottom: 10, flexWrap: 'wrap'},
  categoryItem: {
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  activeCategory: {
    backgroundColor: '#d6eaff',
  },
  categoryText: {fontWeight: 'bold', color: '#555'},
  activeCategoryText: {color: '#0077cc'},
  grid: {paddingBottom: 20},
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    padding: 10,
    elevation: 3,
  },
  image: {height: 100, borderRadius: 10, marginBottom: 8},
  title: {fontWeight: 'bold', fontSize: 14},
  location: {fontSize: 12, color: '#666'},
  price: {marginTop: 4, fontSize: 12, color: '#2a9d8f'},
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataText: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 20,
  },
  mapTaxt: {
    fontSize: 14,
    fontWeight: '500',
    color: 'green',
  },
});
