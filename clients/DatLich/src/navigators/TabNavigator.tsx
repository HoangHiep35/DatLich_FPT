import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AddSquare, Calendar, Location, User } from "iconsax-react-native";
import React, { ReactNode } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CircleComponent, TextComponent } from "../components";
import { appColors } from "../constants/appColors";
import { AddNewScreen } from "../screens";
import EventNavigator from "./EventNavigator";
import ExploreNavigator from "./ExploreNavigator";
import MapNavigator from "./MapNavigator";
import ProfileNavigator from "./ProfileNavigator";

const TabNavigator = () => {

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          height: 68,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: appColors.white,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon: ReactNode;
          color = focused ? appColors.primary : appColors.gray5;
          size = 24;

          switch (route.name) {
            case 'Explore':
              icon = <MaterialIcons name="explore" size={size} color={color} />
              break;

            case 'Event':
              icon = <Calendar size={size} variant='Bold' color={color} />
              break;
            case 'Map':
              icon = <Location size={size} variant='Bold' color={color} />
              break;
            case 'Profile':
              icon = <User size={size} variant='Bold' color={color} />
              break;

            case 'Add':
              icon = (
                <CircleComponent
                  size={52}
                  styles={{ marginTop: -60, }}>
                  <AddSquare size={20} color={appColors.white} variant="Bold" />
                </CircleComponent>
              );
              break;
          }
          return icon;
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
        tabBarLabel({ focused }) {
          return route.name === 'Add' ? null : (
            <TextComponent
              text={route.name}
              flex={0}
              size={12}
              color={focused ? appColors.primary : appColors.gray}
              styles={{
                marginBottom: 12,
              }}
            />);
        },
      })}>
      <Tab.Screen name="Explore" component={ExploreNavigator} />
      <Tab.Screen name="Event" component={EventNavigator} />
      <Tab.Screen
        name="Add"
        component={AddNewScreen} />
      <Tab.Screen name="Map" component={MapNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator >
  )
}

export default TabNavigator;