import React, {useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {LoadingStatuses} from "../types";
import LoadingScreen from "../pages/LoadingScreen";

import StackNavigator from "../navigation/StackNavigator";
import Form from "../pages/Form";
import UserNavigation from "../navigation/UserNavigation";
import {fetchUser} from "../store/actions";
import {useDispatch} from "react-redux";
import MatchGame from "../components/MatchGame";
import {navigationState} from "../navigation/navigationState";

const MainLayout = () => {
    const { user,status } = useTypedSelector(state1 => state1.authReducer)
    // if(status === LoadingStatuses.LOADING){
    //     return <LoadingScreen/>
    // }
    let dispatch = useDispatch()
    useEffect(()=>{
        // dispatch(fetchUser())
    },[])
    //
    return (
        <NavigationContainer>
            {/*@ts-ignore*/}
            {/*<LoadingScreen/>*/}
            {/*<MatchGame/>*/}
            {user ? <StackNavigator/> : <UserNavigation/>}
        {/*    */}
        </NavigationContainer>
    );
};

export default  MainLayout;