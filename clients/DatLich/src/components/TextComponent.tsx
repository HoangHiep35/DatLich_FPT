import React from "react";
import { View, Text, TextStyle, StyleProp } from 'react-native';
import { appColors } from "../constants/appColors";
import { fontFamilies } from "../constants/fontFamilies";
import { globalStyles } from "../styles/globalStyles";

interface Props {
    text: string;
    color?: string;
    size?: number;
    flex?: number;
    font?: string;
    styles?: StyleProp<TextStyle>;
    title?: boolean;
    numOfline?: number;
}

const TextComponent = (props: Props) => {

    const { text, size, flex, font, color, styles, title, numOfline } = props;

    return (
        <Text
        numberOfLines={numOfline}
            style={[
                globalStyles.text,
                {
                    color: color ?? appColors.text,
                    flex: flex ?? 0,
                    fontSize: size ? size : title ? 20 : 14,
                    fontFamily: font
                        ? font
                        : title
                            ? fontFamilies.medium
                            : fontFamilies.regular,
                },
                styles,
            ]}>
            {text}
        </Text>
    );
};

export default TextComponent