import React from "react";
import { MapScreen } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const MapNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
    );
};

export default MapNavigator