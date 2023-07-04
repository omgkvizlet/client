import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import MainPage from "../pages/MainPage";
import StackNavigator from "../navigation/StackNavigator";

const MainLayout = () => {
    return (
        <NavigationContainer>
            <StackNavigator/>
        </NavigationContainer>
    );
};

export default MainLayout;