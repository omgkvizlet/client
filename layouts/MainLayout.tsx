import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {LoadingStatuses} from "../types";
import LoadingScreen from "../pages/LoadingScreen";
import StackNavigator from "../navigation/StackNavigator";
import Form from "../pages/Form";
import UserNavigation from "../navigation/UserNavigation";

const MainLayout = () => {
    const { user,status } = useTypedSelector(state1 => state1.authReducer)
    // if(status === LoadingStatuses.LOADING){
    //     return <LoadingScreen/>
    // }
    return (
        <NavigationContainer>
            {/*@ts-ignore*/}
            {/*<LoadingScreen/>*/}
            {user ? <StackNavigator/> : <UserNavigation/>}
        {/*    */}
        </NavigationContainer>
    );
};

export default MainLayout;