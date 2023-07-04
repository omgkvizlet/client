import React from 'react';
import {Image, Text, View} from "react-native";
import * as Device from "expo-device";
import Animated, {Extrapolation, interpolate, useAnimatedStyle} from "react-native-reanimated";

const NavBar = ({y}) => {
    let animNavBarStyles = useAnimatedStyle(()=>{
        return {
            height:interpolate(
                y.value,
                [0,150],
                [130,100],
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
    let imgAnimStyles = useAnimatedStyle(()=>{
        return {
            transform:[
                {
                    translateY:interpolate(
                        y.value,
                        [0,20],
                        [Number(Device.modelName?.replace(/\D+/g,'')) ? 10 : 0,10]
                    )
                }
            ]
        }
    })
    // @ts-ignore
    return (
        <Animated.View style={[{
            backgroundColor:'#e6e6e6',
            width:'100%',
            alignItems:'center',
            position:'absolute',
            zIndex:1,
            paddingTop:Number(Device.modelName?.replace(/\D+/g,'')) >= 10 ? 20 : 0,
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
                color:'#999',
                fontSize:16
            },welcomeAnimStyles]}>Welcome back</Animated.Text>
            <Text style={{
                fontFamily:'HurmeGeomBold',
                fontSize:22
            }}>Eblan</Text>
            </View>
            {/**/}
            <Animated.Image source={{
                uri:'https://wallpapers.com/images/hd/eric-clapton-guitar-while-smoking-dun523q2t0xqrulu.jpg'
            }} style={[{
                width:50, height:50,
                //
                borderRadius:'12%',
                position:'absolute',
                right:20,
            },]}/>
        </Animated.View>
    );
};

export default NavBar;