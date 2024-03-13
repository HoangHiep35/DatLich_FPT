import React from "react";
import { EventsScreen } from "../screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const EventNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="EventsScreen" component={EventsScreen} />
        </Stack.Navigator>
    );
};

export default EventNavigator