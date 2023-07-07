import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import MainPage from "../pages/MainPage";
import FlagsSelection from "../pages/FlagsSelection";
import SetPage from "../pages/SetPage";
import {TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useNavigation} from "@react-navigation/native";
import Form from "../pages/Form";
import SetsSelection from "../pages/SetsSelection";
const Stack = createStackNavigator()
const StackNavigator = () => {
    const navigation = useNavigation()
    return (
        <Stack.Navigator>
            {/*<Stack.Screen name={'Main'}  component={MainPage} />*/}
            {/*<Stack.Screen  name={'FS'} component={FlagsSelection}/>*/}
            {/*<Stack.Screen name={'FORM'} options={{headerShown:false}} component={Form}/>*/}
            <Stack.Screen options={{headerShown:false}} name={'Main'} component={MainPage}/>
            <Stack.Screen options={{headerShown:false}} name={'FS'} component={FlagsSelection}/>
            <Stack.Screen name={'SETS_SELECTION'} component={SetsSelection} options={{headerShown:false}}/>
            <Stack.Screen name={'SET_PAGE'} options={{
                headerShown:false
            }} component={SetPage}/>


        </Stack.Navigator>
    );
};

export default StackNavigator;