import React, {ReactChild, ReactChildren, useEffect} from 'react';
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import {Pressable, StyleSheet, Text} from "react-native";
interface IButtonProps {
    children:any,
    styles?:IStylesProp,
    onPressFn?:()=>void
}
interface IStylesProp {
    btn:StyleSheet,
    animView:StyleSheet
}
const Button = ({children,onPressFn,styles}:IButtonProps) => {

    let shadowOffsetHeight = useSharedValue(10)
    let loginBtnAnimStyles = useAnimatedStyle(()=>{
        return {
            shadowOffset:{
              width:0,
              height:shadowOffsetHeight.value
            },
            elevation:5,
            transform:[{translateY:interpolate(
                shadowOffsetHeight.value,
                    [10,0],
                    [0,5]
            )}]
        }
    })

    return (
        <Animated.View style={[{
            shadowOpacity:20,
            shadowRadius:0,
            shadowColor:'#bbb',
            justifyContent:'center',
            alignItems:'center',

            borderRadius:7,
            ...styles?.animView,
            backgroundColor:'#ccc'
        },loginBtnAnimStyles]}>
            <Pressable onPress={onPressFn} style={{
                width:'100%',
                height:'100%',
                flexDirection:'row',

                ...styles?.btn,
            }} onPressIn={()=>{
                shadowOffsetHeight.value = withTiming(0,{
                    duration:150
                })
            }} onPressOut={()=>{
                shadowOffsetHeight.value = withTiming(10,{
                    duration:150
                })
            }}>
                {children}
            </Pressable>
        </Animated.View>
    );
};

export default Button;