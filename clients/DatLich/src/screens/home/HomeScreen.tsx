import { HambergerMenu, Notification, SearchNormal, Sort } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ImageBackground, ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import { CategoriesList, CircleComponent, EventItem, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TagComponent, TextComponent } from "../../components";
import { appColors } from "../../constants/appColors";
import { fontFamilies } from "../../constants/fontFamilies";
import { authSelector } from "../../redux/reducers/authReducer";
import { globalStyles } from "../../styles/globalStyles";
import Geoocation from '@react-native-community/geolocation';
import axios from "axios";
import { AddressModels } from "../../models/AddressModels";
import Geolocation from "@react-native-community/geolocation";

const HomeScreen = ({ navigation }: any) => {

    // const [currentLocation, setCurrentLocation] = useState<AddressModels>();

    const dispatch = useDispatch();

    const auth = useSelector(authSelector);

    // Map API 
    // useEffect(() => {
    //     Geolocation.getCurrentPosition(
    //         (position: any) => {
    //             if (position.coords) {
    //                 console.log(position);
    //                 reverseGeoCode({
    //                     lat: position.coords.latitude,
    //                     long: position.coords.longitude,
    //                 });
    //             }
    //         },
    //         (error: any) => {
    //             console.error(error);
    //         },
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    //     );
    // }, []);
    // const reverseGeoCode = async ({ lat, long }: { lat: number; long: number }) => {
    //     //console.log(lat, long);
    //     const api = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=en-US&apiKey=vURxjm2nJ5C052d0Aq8J1MUNY-7CYS3cetyRuhTFLFk`;
    //     try {
    //         const res = await axios(api);
    //         if (res && res.status === 200 && res.data) {
    //             const items = res.data.items;
    //             // console.log(items[0].address);
    //             setCurrentLocation(items[0]);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const itemEvent = {
        title: 'Trình diễn thời trang',
        description:
            'Enjoy your favorite dishe and a lovely your friends and family and have a great time. Food from local food trucks will be available for purchase.',
        location: {
            title: 'Trình diễn thời trang',
            address: 'Kim Hải , Kim Sơn , Ninh Bình',
        },
        //HNssYgE8tPMwVt1x00Ga
        imageUrl: '',
        users: [''],
        authorId: '',
        startAt: Date.now(),
        endAt: Date.now(),
        date: Date.now(),
    }
    return (
        <View style={[globalStyles.container]}>
            <StatusBar barStyle={'light-content'} />

            <View style={{
                backgroundColor: appColors.primary,
                height: 168,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                paddingTop: StatusBar.currentHeight,
            }}>

                <View style={{ paddingHorizontal: 16 }}></View>
                <RowComponent>
                    <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <HambergerMenu size={24} color={appColors.white} />
                    </TouchableOpacity>
                    <View style={[{ flex: 1, alignItems: 'center' }]}>
                        <RowComponent>
                            <TextComponent
                                text='Vị trí hiện tại'
                                color={appColors.white2}
                                size={12} />
                            <MaterialIcons name="arrow-drop-down" size={18} color={appColors.white} />
                        </RowComponent>
                        {/* {
                            currentLocation && (
                                <TextComponent
                                    text={`${currentLocation.address.city},${currentLocation.address.countryName}`}
                                    flex={0}
                                    color={appColors.white}
                                    font={fontFamilies.medium}
                                    size={13} />
                            )
                        } */}
                        <TextComponent
                            text="Kim Sơn , Ninh Bình"
                            flex={0}
                            color={appColors.white}
                            font={fontFamilies.medium}
                            size={13} />
                    </View>

                    <CircleComponent color="#524CE0" size={36} >
                        <Notification size={18} color={appColors.white} />
                        <View style={{
                            backgroundColor: '#02E9FE',
                            width: 10,
                            height: 10,
                            borderRadius: 4,
                            borderWidth: 2,
                            borderColor: '#524CE0',
                            position: 'absolute',
                            top: -2,
                            right: -2,
                        }} />
                    </CircleComponent>

                </RowComponent>
                <SpaceComponent height={20} />
                <RowComponent>
                    <RowComponent
                        styles={{ flex: 1 }}
                        onPress={() => navigation.navigate('SearchEvents', {
                            isFilter: false,
                        })}
                    >
                        <SearchNormal
                            variant="TwoTone"
                            color={appColors.white}
                            size={20} />

                        <View style={{
                            width: 1,
                            backgroundColor: appColors.white,
                            marginHorizontal: 10,
                            height: 24,
                        }} />
                        <TextComponent
                            flex={1}
                            text="Tìm kiếm..."
                            color={appColors.gray2}
                            size={16} />
                    </RowComponent>

                    <TagComponent
                        bgColor={'#5D56F3'}
                        onPress={() => navigation.navigate('SearchEvents', {
                            isFilter: true,
                        })}
                        label="Bộ lọc"
                        icon={
                            <CircleComponent size={20} color="#B1AEFA">
                                <Sort size={16} color="#5D56F3" />
                            </CircleComponent>
                        } />
                </RowComponent>
                <SpaceComponent height={20} />
                <View style={{ marginBottom: -16 }}>
                    <CategoriesList isFill />
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={[
                    {
                        flex: 1,
                        marginTop: 16,
                    },
                ]}>
                <SectionComponent styles={{ paddingHorizontal: 0, paddingTop: 20 }}>
                    <TabBarComponent title="Sự kiện sắp tới" onPress={() => { }} />
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={Array.from({ length: 5 })}
                        renderItem={({ item, index }) =>
                            <EventItem key={`event${index}`} item={itemEvent} type='card' />} />
                </SectionComponent>
                <SectionComponent>
                    < ImageBackground
                        source={require('../../assets/images/invite.png')}
                        style={{
                            flex: 1,
                            padding: 16,
                            //chiều cao ảnh
                            minHeight: 127
                        }}
                        imageStyle={{
                            resizeMode: 'cover',
                            borderRadius: 12
                        }}
                    >
                        <TextComponent text="Mời bạn của bạn" title />
                        <TextComponent text="+200.000" title />

                        <TouchableOpacity style={[globalStyles.button, { marginTop: 12, backgroundColor: '#00DF8FF', paddingHorizontal: 28 }]}>
                            <TextComponent
                                text="MỜI"
                                font={fontFamilies.bold}
                                color={appColors.primary} />
                        </TouchableOpacity>
                    </ImageBackground >
                </SectionComponent>
                <SectionComponent>
                    <TabBarComponent title="Gần bên bạn" onPress={() => { }} />
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={Array.from({ length: 5 })}
                        renderItem={({ item, index }) =>
                            <EventItem key={`event${index}`} item={itemEvent} type='card' />} />
                </SectionComponent>

            </ScrollView>
        </View>
    );
};

export default HomeScreen
