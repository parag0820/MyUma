import { View, StyleSheet, Image } from 'react-native'
import React, { useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function Splash({ navigation }) {

    const userAuth = () => {
        setTimeout(async () => {
            const userdata = await AsyncStorage.getItem('userInfo')
            const userInfo = JSON.parse(userdata)
            const token = userInfo?.id
            if (token) {
                navigation.replace('BottomNav')
            } else {
                navigation.navigate('Welcome')
            }
        }, 4000);
    }
    useFocusEffect(
        useCallback(() => {
            userAuth();
        }, [])
    );
    return (
        <View style={styles.root}>
            <Image style={styles.image} resizeMode='contain' source={require(`../assets/myuma_logo.png`)} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 150,
        width: 150
    }
})