import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import BASE_URL from '../utils/styles/config';
import {useRoute} from '@react-navigation/native';
import ReviewModal from '../modal/ReviewModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const {width, height} = Dimensions.get('window');

export default function ServiceDetail({navigation}) {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState([]);
  const [itemlist, setItemList] = useState([]);
  const [serviceDetail, setServiceDetail] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const serviceId = route?.params?.id;
  console.log('whatsApp', serviceDetail?.whatsapp);

  const itemlistSocial = [
    {
      id: '1',
      title: 'WhatsApp',
      image: require('../assets/whatsapp.png'),
    },
    {
      id: '2',
      title: 'facebook',
      image: require('../assets/facebook.png'),
    },
    {
      id: '3',
      title: 'LinkedIn',
      image: require('../assets/linkedin.png'),
    },
    {
      id: '4',
      title: 'x',
      image: require('../assets/twitter.png'),
    },
  ];

  const showToast = reviewData => {
    Toast.show({
      type: 'success',
      text1: 'Congratulations...',
      text2: 'Booked!!',
    });
    setTimeout(() => {
      navigation.goBack();
    }, 5000);
  };

  const onViewRef = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const bookNowHandler = async () => {
    const userDeatil = await AsyncStorage.getItem(`userInfo`);
    const userInfo = JSON.parse(userDeatil);
    const userId = userInfo?.id;

    try {
      const res = axios.post(`${BASE_URL}booknowpost`, {
        user_id: userId,
        service_id: serviceId,
      });
      showToast();
    } catch (error) {
      console.log(error);
    }
  };

  const serviceDetails = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}myumadetailsviewone/${serviceId}`,
      );
      const details = res.data.data[0];

      setServiceDetail(details);
      setSlides(res.data.data[0].banner);
      setItemList(res.data.data[0].items);
      console.log('api user Social ', res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewSubmit = data => {
    console.log('Review submitted:', data);

    // Example API call using axios
    // axios.post(`${BASE_URL}submit-review`, data)
    //   .then(response => console.log(response.data))
    //   .catch(error => console.error(error));

    setModalVisible(false);
  };

  const renderItem = ({item}) => (
    <View style={styles.slide}>
      <Image source={{uri: item}} style={styles.image} resizeMode="cover" />
    </View>
  );

  const renderItemList = ({item}) => (
    <View style={styles.ItemView}>
      <TouchableOpacity style={[styles.languageBtn, {paddingHorizontal: 25}]}>
        <Text style={styles.title}>{item.item_name}</Text>
        <Text style={styles.title}>{item.priceto}</Text>
      </TouchableOpacity>
    </View>
  );
  const renderItemListSocial = ({item}) => {
    const getColor = () => {
      switch (item.title) {
        case 'WhatsApp':
          return '#075E54';
        case 'facebook':
          return '#1877F2';
        case 'LinkedIn':
          return '#0A66C2';
        case 'twitter':
          return '#000';
        default:
          return '#000';
      }
    };

    return (
      <View style={styles.ItemView}>
        <TouchableOpacity
          style={[
            styles.languageBtn,
            {backgroundColor: '#fff', flexDirection: 'row'},
          ]}
          onPress={() => {
            if (item.title === 'WhatsApp') {
              openWhatsApp(serviceDetail?.whatsapp);
            } else if (item.title === 'facebook') {
              openLink(serviceDetail?.facebook);
            } else if (item.title === 'x') {
              openLink(serviceDetail?.twitter);
            } else if (item.title === 'LinkedIn') {
              openLink(serviceDetail?.linked_in);
            }
          }}>
          <Image
            tintColor={getColor()}
            source={item.image}
            style={styles.imageSocial}
            resizeMode="contain"
          />
          <Text style={[styles.title, {color: getColor()}]}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const openLink = url => {
    if (!url) {
      Alert.alert('Link not available');
      return;
    }

    Linking.openURL(url).catch(() => {
      Alert.alert('Unable to open link');
    });
  };

  const openWhatsApp = phone => {
    let url = `whatsapp://send?phone=${phone}`;

    Linking.openURL(url)
      .then(() => {
        console.log('WhatsApp opened');
      })
      .catch(() => {
        Alert.alert(
          'WhatsApp not installed',
          'Please install WhatsApp to chat.',
        );
      });
  };

  useEffect(() => {
    serviceDetails();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (slides.length > 0) {
        const nextIndex =
          currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        flatListRef.current?.scrollToIndex({index: nextIndex, animated: true});
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, slides]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          alignSelf: 'flex-end',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setModalVisible(true)}>
        <Icon name={'star-half-full'} color={'red'} size={16} />
        <Text style={{color: 'red', alignSelf: 'flex-end', marginRight: 20}}>
          Rate Us
        </Text>
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />

      <FlatList
        data={itemlist}
        renderItem={renderItemList}
        keyExtractor={item => item.id.toString()}
        horizontal
      />

      <FlatList
        data={itemlistSocial}
        renderItem={renderItemListSocial}
        keyExtractor={item => item.id.toString()}
        horizontal
      />

      <TouchableOpacity onPress={bookNowHandler} style={styles.bookNowBtn}>
        <Icon name={'bookmark-check'} size={24} color={'#fff'} />
        <Text style={{marginLeft: 10, textAlign: 'center', color: '#fff'}}>
          {'Book Now'}
        </Text>
      </TouchableOpacity>
      <Toast />
      <ReviewModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleReviewSubmit}
        serviceId={serviceId}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    alignItems: 'center',
  },
  image: {
    width: width * 1,
    height: height * 0.3,
  },
  imageSocial: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  ItemView: {
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',

    color: '#000',
    textAlign: 'center',
  },
  languageBtn: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 3,
  },
  languageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {},
  bookNowBtn: {
    backgroundColor: '#006400',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 110,
    marginBottom: 20,
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
  },
  skip: {
    color: '#800000',
    fontSize: 16,
  },
  next: {
    color: '#800000',
    fontSize: 16,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  activeDot: {
    backgroundColor: '#800000',
  },
});
