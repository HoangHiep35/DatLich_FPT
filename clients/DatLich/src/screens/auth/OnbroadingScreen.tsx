import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { globalStyles } from "../../styles/globalStyles";
import Swiper from "react-native-swiper";
import { appInfo } from "../../constants/appInfos";
import { appColors } from "../../constants/appColors";
import { TextComponent } from "../../components";

const OnbroadingScreen = ({ navigation }: any) => {

    const [index, setIndex] = useState(0);

    return (
        <View style={[globalStyles.container]}>
            <Swiper style={{}} loop={false}
                onIndexChanged={num => setIndex(num)}
                index={index}
                activeDotColor={appColors.white}
            >
                <Image source={require('../../assets/images/onbroading_1.png')}
                    style={{
                        flex: 1,
                        width: appInfo.sizes.WIDTH,
                        height: appInfo.sizes.HEIGHT,
                        resizeMode: 'cover',
                    }} />
                <Image source={require('../../assets/images/onbroading_1.png')}
                    style={{
                        flex: 1,
                        width: appInfo.sizes.WIDTH,
                        height: appInfo.sizes.HEIGHT,
                        resizeMode: 'cover',
                    }} />
                <Image source={require('../../assets/images/onbroading_1.png')}
                    style={{
                        flex: 1,
                        width: appInfo.sizes.WIDTH,
                        height: appInfo.sizes.HEIGHT,
                        resizeMode: 'cover',
                    }} />
            </Swiper>
            <View style={[{
                paddingHorizontal: 16,
                paddingVertical: 20,
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }]}>
                <TouchableOpacity onPress={() =>
                    navigation.navigate('LoginScreen')}>
                    <TextComponent text="Skip" color={appColors.black} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => index < 2 ? setIndex(index + 1) : navigation.navigate('LoginScreen')} >
                    <TextComponent text="Next" color={appColors.black} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OnbroadingScreen;

const style = StyleSheet.create({
    text: {
        color: appColors.white,
        fontSize: 20,
        fontWeight: '500',
    },
});