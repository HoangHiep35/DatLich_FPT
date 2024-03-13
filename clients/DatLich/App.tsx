import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import AppRouters from "./src/navigators/AppRouters";
import store from "./src/redux/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <NavigationContainer>
          <AppRouters />
        </NavigationContainer>
      </Provider>
    </>
  );
};
export default App;
//ltna mfgf pban xsgl
// 28.59
//12:29:7C:EA:DD:DE:17:81:A7:FA:10:A9:EF:8B:BB:B3:8F:21:03:C5