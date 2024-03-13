import React, { ReactNode } from 'react';
import { View, Text, ImageBackground, ScrollView, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { ButtonComponent, RowComponent, TextComponent } from '.';
import { ArrowLeft, Flag } from 'iconsax-react-native';
import { appColors } from '../constants/appColors';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
    isImageBackground?: boolean;
    isScroll?: boolean;
    title?: string;
    children: ReactNode;
    back?: boolean;

}
const ContainerComponent = (props: Props) => {

    const { children, isScroll, isImageBackground, title, back } = props;

    const navigation: any = useNavigation();

    const headerComponent = () => {
        return (
            <View style={{ flex: 1, paddingTop: 28 }}>
                {(title || back) && (
                    <RowComponent
                        styles={{
                            paddingHorizontal: 16,
                            paddingVertical: 10,
                            backgroundColor: 'coral',
                            minWidth: 48,
                            minHeight: 48,
                            justifyContent: 'flex-start',
                        }}>
                        {back && (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ marginRight: 12 }} >
                                <ArrowLeft size={24} color={appColors.text} />
                            </TouchableOpacity>
                        )}
                        {title ? (
                            <TextComponent
                                text={title}
                                size={16}
                                font={fontFamilies.medium}
                                flex={1} />
                        ) : (
                            <></>
                        )}
                    </RowComponent>
                )}
                {returnContainer}
            </View>
        );
    };

    const returnContainer = isScroll ? (
        <ScrollView
            style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>) : (<View>{children}</View>)
    return isImageBackground ?
        (
            <ImageBackground
                source={require('../assets/images/splash-img.png')}
                style={{ flex: 1 }}
                imageStyle={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>{headerComponent()}</SafeAreaView>
            </ImageBackground>
        ) : (
            <SafeAreaView style={[globalStyles.container]}>
                <StatusBar barStyle={'dark-content'} />
                <View style={[globalStyles.container]}>{headerComponent()}</View>
            </SafeAreaView>
        )
};

export default ContainerComponent