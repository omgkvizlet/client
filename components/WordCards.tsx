import React, {useEffect, useRef, useState} from 'react';
import {Animated as AnimatedRN, Dimensions, PanResponder, Pressable, Text, TouchableOpacity, View} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
const { width } = Dimensions.get('window')
const WordCards = ({words,translateY}) => {

    const [ counter, setCounter ] = useState(1)
    // let cardTranslateX = useRef(new AnimatedRN.Value(0)).current
    // let cardTranslateY = useRef(new AnimatedRN.Value(0)).current
    // let cardXY = useRef(new AnimatedRN.ValueXY()).current
    let cardTranslateY = useSharedValue(0)
    let cardTranslateX = useSharedValue(0)

    const [ctx,setCtx] = useState({
        x:0,
        y:0
    })

    let scaleX = useSharedValue(0)
    const animDialogStyles = useAnimatedStyle(()=>{
        return {
            transform:[{
                translateY:translateY.value
            }]
        }
    })
    let cardAnimStyles = useAnimatedStyle(()=>{
        return {
            transform:[{
                translateY:cardTranslateY.value
            },
                {
                    translateX:cardTranslateX.value
                }
            ]
        }
    })
    const gesture = Gesture.Pan()
        .onUpdate(event => {
            cardTranslateX.value = event.translationX + ctx.x
            cardTranslateY.value = event.translationY + ctx.y
        })
        .onBegin(event => {
           runOnJS(setCtx)({
               // @ts-ignore
               x:cardTranslateX.value,
               // @ts-ignore
               y:cardTranslateY.value
           })

        })
        .onEnd(event => {
            console.log(-width/2, cardTranslateX, cardTranslateY)
            if(cardTranslateX.value  > -width/2){
                cardTranslateX.value = withTiming(0)
                cardTranslateY.value = withTiming(0)
            }
            else if(cardTranslateX.value < width/2){
                cardTranslateX.value = withTiming(0)
                cardTranslateY.value = withTiming(0)
            }
            else if(cardTranslateX.value < -width/2){
                console.log('dfgdgfdgfgfdsgcdcsgdf')
                cardTranslateX.value = withTiming(-500)
            }
        })

    const stringAnimStyles = useAnimatedStyle(()=>{
        return {
            width:scaleX.value
        }
    })
    return (
        <Animated.View style={[{
            width:'100%',
            height:'100%',
            position:'absolute',
            zIndex:2,
            top:'100%',
            backgroundColor:'#fff',
        },animDialogStyles]}>
            <View style={{justifyContent:'center',width,height:100,flexDirection:'row',alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{
                    console.log('dfkldsj')
                    translateY.value = withTiming(0)
                }} style={{position:'absolute',left:20,flexGrow:1}}>
                    <FontAwesomeIcon color={'#555'} size={25} icon={faXmark}/>
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:20,fontFamily:'HurmeGeomBold2',color:'#555'}}>{counter}/{words.length}</Text>
                </View>
                <View style={{width:'100%',height:8,backgroundColor:'#ccc',position:'absolute',bottom:0}}>
                    <Animated.View style={[{
                        height:8,
                        backgroundColor:'#999',
                    },stringAnimStyles]}>

                    </Animated.View>
                </View>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <GestureDetector gesture={gesture}>
                <Animated.View style={[{
                    width:'85%',
                    height:'90%',
                    shadowOpacity:1,
                    shadowColor:'#ccc',
                    shadowOffset:{
                        width:0,
                        height:0
                    },
                    shadowRadius:2,
                    borderRadius:20,
                    backgroundColor:'#ccc',
                    padding:5,
                 },cardAnimStyles]}>
                    <Pressable style={{
                        width:'100%',
                        height:'100%',
                        borderRadius:15,
                        backgroundColor:'#ccc',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        <Text style={{
                            fontFamily:'HurmeGeomBold',
                            fontSize:35,
                            color:'#f2f2f2'
                        }}>{words[0].word}</Text>
                    </Pressable>
                </Animated.View>
                </GestureDetector>
            </View>
            <View style={{
                width:'100%',
                height:100,
                paddingLeft:40,
                paddingBottom:20,
                flexDirection:'row',
                alignItems:'center',
            }}>
                <TouchableOpacity onPress={()=>{
                    // cardTranslateX.value = withTiming(0)
                }}>
                    <FontAwesomeIcon size={22} color={'#555'} icon={faRotateLeft}/>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default WordCards;