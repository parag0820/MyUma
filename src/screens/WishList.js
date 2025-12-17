import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
// import Icon from 'react-native-vector-icons/AntDesign';
import BASE_URL from '../utils/styles/config';
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
const bgColors = ['#4B94FF', '#F7697C', '#FFB53C', '#A991FF'];
const {width} = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // padding + margin

const WishlistScreen = ({navigation}) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    const userDeatil = await AsyncStorage.getItem(`userInfo`);
    const userInfo = JSON.parse(userDeatil);
    const userId = userInfo.id;

    try {
      // Replace this with your actual API call
      const response = await axios.get(`${BASE_URL}wishlistone/${userId}`);
      const data = await response.data.data;

      setWishlist(data); // should be an array
    } catch (error) {
      //   console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async selectedId => {
    console.log('Selected service_id to remove:', selectedId);

    try {
      // Find the wishlist item by ID
      const matchedFav = wishlist.find(fav => fav.id === selectedId);

      if (!matchedFav) {
        Alert.alert('Item not found in wishlist');
        return;
      }

      const wishlistId = matchedFav.id;

      const response = await axios.delete(
        `${BASE_URL}deletewishlist/${wishlistId}`,
      );
      console.log('Deleted successfully:', response.data);

      // Update state after successful deletion
      const updatedWishlist = wishlist.filter(item => item.id !== selectedId);
      setWishlist(updatedWishlist);

      Alert.alert('Removed from Favorites');
    } catch (error) {
      console.error('Favorite toggle failed:', error);
      Alert.alert('Error', 'Could not update favorite status');
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Your logic here, for example:
      fetchWishlist();
    }, []),
  );

  const renderItem = ({item}) => (
    <View style={[styles.card, {backgroundColor: '#fff'}]}>
      <TouchableOpacity
        onPress={() => handleToggleFavorite(item.id)}
        style={styles.heartIcon}>
        <Icon
          name={item.isFavorite ? 'hearto' : 'heart'}
          size={20}
          color={item.isFavorite ? '#fff' : '#FF4C61'}
        />
      </TouchableOpacity>

      <Image
        source={{uri: item.images}}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{item.tittle}</Text>
      <Text style={styles.price}>{item.address}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 50}}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Setting')}
          style={styles.backButton}>
          <Icon name="arrowleft" color={'#000'} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>WishList</Text>
      </View>

      {wishlist.length === 0 ? (
        <View style={styles.content}>
          <Image
            source={require('../assets/myuma_logo.png')}
            style={styles.image}
          />
          <Text style={styles.noFavText}>No favorites yet.</Text>
          <Text style={styles.subText}>
            Tap any heart next to a product to favorite. We’ll save them for you
            here!
          </Text>

          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.shopButtonText}>START SHOPPING</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => navigation.navigate('Search')}>
            <Text style={styles.searchButtonText}>SEARCH FOR ITEMS</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEADE',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 30,
  },

  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 6,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    borderRadius: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
    color: '#000',
  },
  price: {
    fontSize: 14,
    marginTop: 4,
    color: 'gray',
  },
  noFavText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#000',
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#3dc3b6',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  shopButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
  },
  searchButtonText: {
    color: '#888',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  // card: {
  //     flexDirection: 'row',
  //     backgroundColor: '#f9f9f9',
  //     borderRadius: 10,
  //     padding: 10,
  //     marginBottom: 10,
  //     alignItems: 'center',
  // },
  card: {
    width: cardWidth,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    position: 'relative',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  cardAddress: {
    fontSize: 14,
    color: '#ddd',
  },
});
