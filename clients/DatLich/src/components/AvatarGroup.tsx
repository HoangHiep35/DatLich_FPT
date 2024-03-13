import React from "react";
import { View, Text } from 'react-native';
import { CircleComponent, RowComponent, SpaceComponent, TextComponent } from ".";
import { appColors } from "../constants/appColors";
import { fontFamilies } from "../constants/fontFamilies";
import { Image } from "react-native";

interface Props {
    size?: number;
}

const AvatarGroup = (props: Props) => {

    const { size } = props;

    const photoUrl =
        'https://images2.thanhnien.vn/zoom/686_429/528068263637045248/2023/10/24/phuong-nhi-trong-thiet-ke-thanh-van-9-16981165922521516145442-316-0-1566-2000-crop-1698119236467199379061.jpg';
    return (
        <RowComponent justify='flex-start' styles={{ marginVertical: 12 }}>
            {
                Array.from({ length: 3 }).map((item, index) => (
                    <Image
                        key={`img${index}`}
                        source={{ uri: photoUrl }}
                        style={{
                            width: size ?? 24,
                            height: size ?? 24,
                            borderRadius: 100,
                            borderWidth: 1,
                            borderColor: appColors.white,
                            marginLeft: index > 0 ? -8 : 0,
                        }} />
                ))
            }
            <SpaceComponent width={12} />
            <TextComponent
                text="+20 Going"
                size={12 + (size ? (size - 24) / 5 : 0)}
                color={appColors.primary}
                font={fontFamilies.semiBold} />
        </RowComponent>
    )
}

export default AvatarGroup