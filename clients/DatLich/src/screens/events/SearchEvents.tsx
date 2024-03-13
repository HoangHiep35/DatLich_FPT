import React from "react";
import { View, Text } from 'react-native';

const SearchEvents = ({ navigation, route }: any) => {

    const { isFilter }: { isFilter: boolean } = route.params;

    console.log(isFilter)
    return (
        <View>

        </View>
    )
}

export default SearchEvents