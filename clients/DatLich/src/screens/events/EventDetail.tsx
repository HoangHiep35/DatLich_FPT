import { ArrowLeft, ArrowRight, Calendar, Location } from "iconsax-react-native";
import React from "react";
import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AvatarGroup, ButtonComponent, CardComponent, RowComponent, SectionComponent, SpaceComponent, TabBarComponent, TextComponent } from "../../components";
import { appColors } from "../../constants/appColors";
import { EventModel } from "../../models/EventModel";
import { globalStyles } from "../../styles/globalStyles";
import { fontFamilies } from "../../constants/fontFamilies";

const EventDetail = ({ navigation, route }: any) => {

    const { item }: { item: EventModel } = route.params;
    return (
        <View style={{ flex: 1, backgroundColor: appColors.white }}>
            <ImageBackground
                source={require('../../assets/images/event.png')}
                style={{ flex: 1, height: 244, zIndex: -1 }}
                imageStyle={{
                    resizeMode: 'cover',
                }} >

                <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}>
                    <RowComponent
                        styles={{
                            padding: 16,
                            alignItems: 'flex-end',
                            paddingTop: 42,
                        }}>
                        <RowComponent styles={{ flex: 1 }}>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{
                                    width: 48,
                                    height: 48,
                                    justifyContent: 'center',
                                }}>
                                <ArrowLeft
                                    size={28}
                                    color={appColors.white} />
                            </TouchableOpacity>
                            <TextComponent
                                flex={1}
                                text="EVENT DETAILS"
                                title
                                color={appColors.white} />
                            <CardComponent
                                styles={[globalStyles.noSpaceCard,
                                { width: 36, height: 36 }]}
                                color="#ffffff4D">
                                <MaterialIcons
                                    name="bookmark"
                                    color={appColors.white}
                                    size={22} />
                            </CardComponent>
                        </RowComponent>

                    </RowComponent>
                </LinearGradient>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        paddingTop: 244 - 130,
                    }}>
                    <SectionComponent>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center'
                            }}>
                            <RowComponent
                                justify='space-between'
                                styles={[globalStyles.shadow, {
                                    backgroundColor: appColors.white,
                                    borderRadius: 100,
                                    paddingHorizontal: 12,
                                    width: '90%',
                                    alignItems: 'center'
                                }]}>
                                <AvatarGroup size={36} />
                                <TouchableOpacity
                                    style={[globalStyles.button,
                                    {
                                        backgroundColor: appColors.primary,
                                        paddingVertical: 8
                                    },
                                    ]}>
                                    <TextComponent text="Mời" color={appColors.white} />
                                </TouchableOpacity>
                            </RowComponent>
                        </View>
                    </SectionComponent>

                    <View style={{
                        backgroundColor: appColors.white
                    }}>
                        <SectionComponent>
                            <TextComponent
                                title
                                size={34}
                                font={fontFamilies.medium}
                                text={item.title} />
                        </SectionComponent>
                        <SectionComponent>
                            <RowComponent styles={{ marginBottom: 20 }}>
                                <CardComponent
                                    styles={[globalStyles.noSpaceCard,
                                    { width: 36, height: 36 }]}
                                    color={`${appColors.primary}4D`}>
                                    <Calendar
                                        variant="Bold"
                                        color={appColors.primary}
                                        size={24} />
                                </CardComponent>
                                <SpaceComponent width={16} />
                                <View style={{ flex: 1, height: 48, justifyContent: 'space-around' }}>
                                    <TextComponent
                                        text="20 Tháng 3 2024"
                                        font={fontFamilies.medium}
                                        size={16}
                                    />
                                    <TextComponent
                                        text="Thứ 3, 4:00PM - 9:00PM"
                                        color={appColors.gray} />
                                </View>
                            </RowComponent>
                            <RowComponent styles={{ marginBottom: 20 }}>
                                <CardComponent
                                    styles={[globalStyles.noSpaceCard,
                                    { width: 36, height: 36 }]}
                                    color={`${appColors.primary}4D`}>
                                    <Location
                                        variant="Bold"
                                        color={appColors.primary}
                                        size={24} />
                                </CardComponent>
                                <SpaceComponent width={16} />
                                <View style={{ flex: 1, height: 48, justifyContent: 'space-around' }}>
                                    <TextComponent
                                        text={item.location.title}
                                        font={fontFamilies.medium}
                                        size={16}
                                    />
                                    <TextComponent
                                        text={item.location.address}
                                        color={appColors.gray} />
                                </View>
                            </RowComponent>
                            <RowComponent styles={{ marginBottom: 20 }}>
                                <Image source={{
                                    uri:
                                        'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/10/24/phuong-nhi-trong-thiet-ke-thanh-van-9-16981165922521516145442-316-0-1566-2000-crop-1698119236467199379061.jpg'
                                }}
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 12,
                                        resizeMode: 'cover'
                                    }} />
                                <SpaceComponent width={16} />
                                <View style={{ flex: 1, height: 48, justifyContent: 'space-around' }}>
                                    <TextComponent
                                        text="Phương Nhi"
                                        font={fontFamilies.medium}
                                        size={16}
                                    />
                                    <TextComponent
                                        text="Thứ 3, 4:00PM - 9:00PM"
                                        color={appColors.gray} />
                                </View>
                            </RowComponent>
                        </SectionComponent>
                        <TabBarComponent title="Thông tin sự kiện" />
                        <SectionComponent>
                            <TextComponent text={item.description} />
                        </SectionComponent>
                    </View>

                </ScrollView>
            </ImageBackground>

            <LinearGradient
                colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,1)']}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    left: 0,
                    padding: 12,
                }}>
                <ButtonComponent
                    text="Mua Vé"
                    type="primary"
                    onPress={() => { }}
                    icon={
                        <View style={[
                            globalStyles.iconContainer,
                            {
                                backgroundColor: '#3D56F0',
                            }
                        ]}>
                            <ArrowRight size={18} color={appColors.white} />
                        </View>
                    }
                />
            </LinearGradient>
        </View >
    )
};

export default EventDetail