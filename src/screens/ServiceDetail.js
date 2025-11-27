import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    Dimensions,
    Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import BASE_URL from '../utils/styles/config';
import { useRoute } from '@react-navigation/native';
import ReviewModal from '../modal/ReviewModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const { width, height } = Dimensions.get('window');

export default function ServiceDetail({ navigation }) {
    const flatListRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slides, setSlides] = useState([]);
    const [itemlist, setItemList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const route = useRoute();
    const serviceId = route?.params?.id;

    const itemlistSocial = [
        {
            id: '1',
            title: 'Whats app',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa3hs0CKuOzfb7296qyOuYVIExMI6WEBwKkg&s',
        },
        {
            id: '2',
            title: 'face book',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHbrpulone-NQHEYZp7jXAO70t_jQ5s_itgA&s',
        },
        {
            id: '3',
            title: 'you tube ',
            image:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMaKPzFTNEL7YSIhO5K7UeSm6U9D0BjFycUg&s',
        },
    ];

    const showToast = (reviewData) => {
        Toast.show({
            type: 'success',
            text1: 'Congratulations...',
            text2: 'Booked!!'
        });
        setTimeout(() => {
            navigation.goBack()
        }, 5000);
    }

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const bookNowHandler = async () => {
        const userDeatil = await AsyncStorage.getItem(`userInfo`)
        const userInfo = JSON.parse(userDeatil)
        const userId = userInfo?.id

        try {
            const res = axios.post(`${BASE_URL}booknowpost`, {

                "user_id": userId,
                "service_id": serviceId
            })
            showToast()
        } catch (error) {
            console.log(error);

        }

    }

    const serviceDetails = async () => {
        try {
            const res = await axios.get(`${BASE_URL}myumadetailsviewone/${serviceId}`);
            setSlides(res.data.data[0].banner);
            setItemList(res.data.data[0].items);
            console.log('api user Social ', res.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    const handleReviewSubmit = (data) => {
        console.log('Review submitted:', data);

        // Example API call using axios
        // axios.post(`${BASE_URL}submit-review`, data)
        //   .then(response => console.log(response.data))
        //   .catch(error => console.error(error));

        setModalVisible(false);
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
        </View>
    );

    const renderItemList = ({ item }) => (
        <View style={styles.ItemView}>
            <TouchableOpacity style={[styles.languageBtn, { paddingHorizontal: 25 }]}>
                <Text style={styles.title}>{item.item_name}</Text>
                <Text style={styles.title}>{item.priceto}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderItemListSocial = ({ item }) => (
        <View style={styles.ItemView}>
            <TouchableOpacity style={[styles.languageBtn, { backgroundColor: 'red', flexDirection: 'row' }]}>
                <Image source={{ uri: item.image }} style={styles.imageSocial} resizeMode="contain" />
                <Text style={[styles.title, { color: '#fff' }]}>{item.title}</Text>
            </TouchableOpacity>
        </View>
    );

    useEffect(() => {
        serviceDetails();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (slides.length > 0) {
                const nextIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex, slides]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ marginVertical: 10, flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'center', alignItems: 'center' }} onPress={() => setModalVisible(true)} >
                <Icon name={'star-half-full'} color={'red'} size={16} />
                <Text style={{ color: 'red', alignSelf: 'flex-end', marginRight: 20 }}>Rating us</Text>
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
                keyExtractor={(item) => item.id.toString()}
                horizontal
            />

            <FlatList
                data={itemlistSocial}
                renderItem={renderItemListSocial}
                keyExtractor={(item) => item.id.toString()}
                horizontal
            />

            <TouchableOpacity onPress={bookNowHandler} style={styles.bookNowBtn}>
                <Icon name={'bookmark-check'} size={24} color={'#fff'} />
                <Text style={{ marginLeft: 10, textAlign: 'center', color: '#fff' }}>
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
        // justifyContent: 'center',
        // paddingTop: 60,
    },
    image: {
        width: width * 1,
        height: height * 0.3,
    },
    imageSocial: {
        width: 24,
        height: 24,
        marginRight: 10
    },
    ItemView: {
        marginHorizontal: 10,
        // marginLeft: 10
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        // marginTop: 40,
        color: '#000',
        textAlign: 'center'
    },
    languageBtn: {
        // position: 'absolute',
        // top: 40,
        // right: 20,
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 10,
        elevation: 3
    },
    languageText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        // position: 'absolute',
        // bottom: 50,
        // width,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // paddingHorizontal: 40,
        // alignItems: 'center',
    },
    bookNowBtn: {
        backgroundColor: '#006400',
        justifyContent: 'center',
        flexDirection: 'row',
        width: 110,
        marginBottom: 20,
        marginLeft: 10,
        borderRadius: 10,
        padding: 10
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
