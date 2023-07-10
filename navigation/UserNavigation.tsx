import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Form from "../pages/Form";
import RegistrationPage from "../pages/RegistrationPage";
const Stack = createStackNavigator()
const UserNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown:false
        }}>
            <Stack.Screen name={'LOGIN'} component={Form}/>
            <Stack.Screen name={'REGISTRATION'} component={RegistrationPage}/>
        </Stack.Navigator>
    );
};

export default UserNavigation;