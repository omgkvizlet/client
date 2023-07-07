import React, {useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from "react-native";
import * as Device from "expo-device";
import Animated, {Extrapolation, interpolate, useAnimatedStyle} from "react-native-reanimated";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {useActions} from "../hooks/useActions";
import {useNavigation} from "@react-navigation/native";
import {SharedValue} from "react-native-reanimated/lib/types/lib";
import {useTypedSelector} from "../hooks/useTypedSelector";
interface INavBarProps {
    y:SharedValue<number>
}
const NavBar = ({y}:INavBarProps) => {
    let navigation = useNavigation()
    let state = useTypedSelector(state1 => state1.authReducer)
    const { logoutActionCreator } = useActions()
    let animNavBarStyles = useAnimatedStyle(()=>{
        return {
            height:interpolate(
                y.value,
                [0,150],
                [100,100],
                Extrapolation.CLAMP
            ),
        }
    })
    let welcomeAnimStyles = useAnimatedStyle(()=>{
        return {
            transform:[{
                translateY:interpolate(
                    y.value,
                    [0,20],
                    [0,-10],
                    Extrapolation.CLAMP
                ),
            }],
            opacity:interpolate(
                y.value,
                [0,20],
                [1,0],
                Extrapolation.CLAMP
            )
        }
    })
    useEffect(()=>{
        console.log(state)
    },[])
    return (
        <Animated.View style={[{
            backgroundColor:'#e6e6e6',
            width:'100%',
            alignItems:'center',
            position:'absolute',
            zIndex:1,
            paddingTop:10,
            // paddingTop:Number(Device.modelName?.replace(/\D+/g,'')) >= 10 ? 20 : 0,
            flexDirection:'row',
            justifyContent:'space-evenly'
        },animNavBarStyles]}>
            <View style={{
                alignItems:'center',
                justifyContent:'center',
                gap:3
            }}>
            <Animated.Text style={[{
                fontFamily:'HurmeGeom',
                color:'#555',
                fontSize:16
            },welcomeAnimStyles]}>Welcome back</Animated.Text>
            <Text style={{
                fontFamily:'HurmeGeomBold',
                fontSize:22,
                color:'#333'
            }}>Eblan</Text>

            </View>
            <TouchableOpacity onPress={()=>{
                logoutActionCreator(navigation)
            }} style={{
                width:50,
                height:50,
                position:'absolute',
                // backgroundColor:'#000',
                transform:[{translateY:10}],
                justifyContent:'center',
                alignItems:'center',
                right:20,
            }}>
                <FontAwesomeIcon size={25} color={'#555'} icon={faRightFromBracket}/>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default NavBar;