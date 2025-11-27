import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        key: '1',
        title: 'Find Nearby Services',
        image: require('../assets/myuma_logo.png'),
    },
    {
        key: '2',
        title: 'Get Real-Time Assistance',
        image: require('../assets/myuma_logo.png'),
    },
    {
        key: '3',
        title: 'Enjoy Your Journey',
        image: require('../assets/myuma_logo.png'),
    },
];

const Welcome = ({ navigation }) => {
    const flatListRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const onViewRef = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    });

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
    };

    const handleSkip = () => {
        // Navigate to main app screen
        console.log('Skip to main screen');
        navigation.replace('Login')
    };

    const renderItem = ({ item }) => (
        <View style={styles.slide}>
            {/* <TouchableOpacity style={styles.languageBtn}>
                <Text style={styles.languageText}>🇬🇧 English</Text>
            </TouchableOpacity> */}
            <Image source={item.image} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderItem}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.key}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
            />
            <View style={styles.footer}>
                <TouchableOpacity onPress={handleSkip}>
                    <Text style={styles.skip}>Skip</Text>
                </TouchableOpacity>
                <View style={styles.dots}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
                <TouchableOpacity onPress={handleNext}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    slide: {
        width,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    image: {
        width: width * 0.8,
        height: height * 0.4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 40,
        color: '#263238',
    },
    languageBtn: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#22c8b3',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    languageText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        width,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        alignItems: 'center',
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
