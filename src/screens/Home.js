import axios from 'axios';
import React, {useEffect, useState} from 'react'; // <-- Make sure useState is imported
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from 'react-native';
import BASE_URL from '../utils/styles/config';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../custom/Loader';

const {width} = Dimensions.get('window');

// const categoryServices = {
//   Apartments: [
//     {
//       id: '1',
//       title: 'Sunny Apartment',
//       location: 'Dorothea Lane, New York',
//       price: '$150.00 - $500.00',
//       type: 'RENTAL',
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXDnSpCzqnCejfj_IeS-C8FJCvdcoq6iHSg&s',
//     },
//     {
//       id: '2',
//       title: 'Tony Apartment',
//       location: 'Dorothea Lane, New York',
//       price: '$150.00 - $500.00',
//       type: 'RENTAL',
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXDnSpCzqnCejfj_IeS-C8FJCvdcoq6iHSg&s',
//     },
//     // ...other apartments
//   ],
//   'Eat & Drink': [
//     {
//       id: '2',
//       title: 'Burger House',
//       location: 'Jay St, Brooklyn, New York',
//       price: '$5.00 - $25.00',
//       type: 'SERVICE',
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXDnSpCzqnCejfj_IeS-C8FJCvdcoq6iHSg&s',
//     },
//     // ...other food places
//   ],
//   Event: [
//     {
//       id: '3',
//       title: 'Music Night',
//       location: 'Times Square, NY',
//       price: '$30.00',
//       type: 'EVENT',
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXDnSpCzqnCejfj_IeS-C8FJCvdcoq6iHSg&s',
//     },
//     // ...other events
//   ],
//   'Dairy Products': [
//     {
//       id: '4',
//       title: 'Fresh Milk',
//       location: 'Local Farm',
//       price: '$3.00',
//       type: 'PRODUCT',
//       image:
//         'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXDnSpCzqnCejfj_IeS-C8FJCvdcoq6iHSg&s',
//     },
//   ],
// };
// const category = [
//   'Apartments',
//   'Eat & Drink',
//   'Event',
//   'Dairy Products',
//   'raghu',
//   'gopal',
//   'shivam',
// ];

// const recentServices = [
//   {
//     id: '1',
//     title: 'Burger House',
//     location: 'Jay St, Brooklyn, New York',
//     price: '$5.00 - $25.00',
//     type: 'SERVICE',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXDnSpCzqnCejfj_IeS-C8FJCvdcoq6iHSg&s',
//   },
//   {
//     id: '2',
//     title: 'Sunny Apartment',
//     location: 'Dorothea Lane, New York',
//     price: '$150.00 - $500.00',
//     type: 'RENTAL',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXDnSpCzqnCejfj_IeS-C8FJCvdcoq6iHSg&s',
//   },
//   {
//     id: '3',
//     title: 'Sunny Apartment',
//     location: 'Dorothea Lane, New York',
//     price: '$150.00 - $500.00',
//     type: 'RENTAL',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXDnSpCzqnCejfj_IeS-C8FJCvdcoq6iHSg&s',
//   },
//   {
//     id: '4',
//     title: 'Sunny Apartment',
//     location: 'Dorothea Lane, New York',
//     price: '$150.00 - $500.00',
//     type: 'RENTAL',
//     image:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyXDnSpCzqnCejfj_IeS-C8FJCvdcoq6iHSg&s',
//   },
// ];

// categoey api

const Home = ({navigation}) => {
  const [blogData, setBlogData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [categoryListData, setCategoryListData] = useState([]);
  const [categoryServices, setCategoryServices] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedTab, setSelectedTab] = useState('');
  const [loading, setLoading] = useState(false);

  const categoryGetList = async () => {
    try {
      const responseCategory = await axios.get(`${BASE_URL}myumanewcategory`);
      const serviceData = responseCategory?.data?.data;

      // Get keys from the API data
      const keys = Object.keys(serviceData);

      // Create a label map (e.g., { "APARTMENTS": "Apartments" })
      const readableCategories = keys.map(
        key => key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, ' '),
      );

      setCategory(readableCategories); // For rendering tabs
      setCategoryServices(serviceData); // Original data

      if (readableCategories.length > 0) {
        setSelectedTab(readableCategories[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getOriginalKey = label =>
    Object.keys(categoryServices).find(
      key => key.toLowerCase().replace(/_/g, ' ') === label.toLowerCase(),
    );

  const categoryList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}myumacategory`);
      setCategoryListData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const recentServicesGet = async () => {
    try {
      const response = await axios.get(`${BASE_URL}myumaservice`);
      setServiceData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBlogData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}myumablog`);
      setBlogData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        recentServicesGet(),
        categoryList(),
        getBlogData(),
        categoryGetList(),
      ]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllData(); // Runs only once
  }, []);
  const refresh = () => fetchAllData();

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }>
      {/* Categories */}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}>
        {categoryListData.map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => {
              navigation.navigate('Category');
            }}
            style={styles.categoryCard}>
            <Image
              resizeMode="contain"
              source={{uri: cat.images}}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryTitle}>{cat.name}</Text>
            <Text style={styles.categorySub}>{cat.products}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recent Services Header */}
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>Recent Service</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Main Tabs', {
              screen: 'Category',
              params: {screen: 'Category'},
            })
          }>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Services */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.servicesRow}>
        {serviceData.map((service, index) => (
          <TouchableOpacity
            key={`service-${index}`}
            onPress={() => {
              navigation.navigate('Category');
            }}
            style={styles.serviceCard}>
            <Image
              source={{uri: service.images}}
              resizeMode="contain"
              style={styles.serviceImage}
            />
            <View style={styles.featuredTag}>
              <Text style={styles.featuredText}>★ Featured</Text>
            </View>
            {/* <Text style={styles.serviceType}>{service.type}</Text> */}
            <Text style={styles.serviceName}>{service.tittle}</Text>
            <Text style={styles.serviceLocation}>
              ${service.pricefrom}$ - {service.priceto}
            </Text>
            <Text style={styles.servicePrice}>{service.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.blogView}>
        {/* <Image style={styles.imageBlog} /> */}
        <View>
          {/* <Text style={{color: '#000', marginLeft: 20}}>Muslim Community</Text> */}

          <View style={styles.serviceHeader}>
            <View>
              <Text style={[styles.serviceTitle]}>{'Our Blog Posts'}</Text>
              <Text style={[styles.serviceTitle, {fontSize: 14}]}>
                Muslim Community
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Main Tabs', {
                  screen: 'Setting',
                  params: {screen: 'Blog'},
                })
              }>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {/* Services */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesRow}>
            {blogData.map((service, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Main Tabs', {
                    screen: 'Setting',
                    params: {
                      screen: 'blogDetail',
                      params: {
                        id: service.id,
                      },
                    },
                  })
                }
                key={`service-${index}`}
                style={styles.serviceCard}>
                <Image
                  source={{uri: service.image}}
                  resizeMode="cover"
                  style={styles.serviceImage}
                />
                <Text style={[styles.servicePrice, {marginLeft: 10}]}>
                  {service.tittle}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topTabs}>
        {category.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedTab && categoryServices[getOriginalKey(selectedTab)] && (
        <View>
          <Text style={styles.tabContentText}>{selectedTab} tab content</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesRow}>
            {categoryServices[getOriginalKey(selectedTab)].length > 0 ? (
              categoryServices[getOriginalKey(selectedTab)].map(service => (
                <TouchableOpacity
                  key={service.id}
                  onPress={() => {
                    navigation.navigate('Category');
                  }}
                  style={styles.serviceCard}>
                  <Image
                    source={{uri: service.image}}
                    style={styles.serviceImage}
                  />
                  <View style={styles.featuredTag}>
                    <Text style={styles.featuredText}>★ Featured</Text>
                  </View>
                  <Text style={styles.serviceType}>{service.type}</Text>
                  <Text style={styles.serviceName}>{service.title}</Text>
                  <Text style={styles.serviceLocation}>{service.location}</Text>
                  <Text style={styles.servicePrice}>{service.price}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{marginLeft: 15, marginTop: 10}}>
                No services available
              </Text>
            )}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  logo: {
    width: 100,
    height: 30,
    resizeMode: 'contain',
  },
  categoryScroll: {
    marginLeft: 10,
    marginVertical: 10,
  },
  categoryCard: {
    width: width * 0.35,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 6,
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  categoryTitle: {
    color: '#000',
    fontWeight: '600',
    marginTop: 6,
    fontSize: 14,
  },
  categorySub: {
    fontSize: 12,
    color: '#555',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 16,
  },
  serviceTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: '600',
  },
  seeAll: {
    color: '#1dbf73',
    fontWeight: '500',
  },
  servicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  serviceCard: {
    width: (width - 48) / 2,
    marginTop: 16,
    marginHorizontal: 10,
  },
  serviceImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  featuredTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#eee',
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  featuredText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#cc005f',
  },
  serviceType: {
    fontSize: 12,
    color: '#1dbf73',
    marginTop: 8,
    fontWeight: '500',
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  serviceLocation: {
    fontSize: 12,
    color: '#666',
  },
  servicePrice: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
    color: '#000',
  },
  blogView: {
    // flexDirection: 'row'
    // marginLeft: 5
  },
  imageBlog: {
    height: 30,
    width: 30,
  },
  topTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'teal',
  },
  tabText: {
    fontSize: 14,
    color: '#555',
  },
  activeTabText: {
    color: 'teal',
    fontWeight: 'bold',
  },
  tabContentText: {
    textAlign: 'flex-start',
    marginTop: 20,
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
});

export default Home;
