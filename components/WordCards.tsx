import React, {useEffect, useState} from 'react';
import {Dimensions, Pressable, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faRotateLeft, faXmark} from "@fortawesome/free-solid-svg-icons";
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Card from "./Card";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {SharedValue} from "react-native-reanimated/lib/types/lib";
import {IWord} from "../types";

const { width } = Dimensions.get('window')
interface IWordCardsProps {
    words:IWord[],
    translateY:SharedValue<number>
}
const WordCards = ({words,translateY}:IWordCardsProps) => {

    let [ counter, setCounter ] = useState(1)
    const state = useTypedSelector(state1 => state1.mainReducer)
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
    // let cardAnimStyles = useAnimatedStyle(()=>{
    //     return {
    //         transform:[{
    //             translateY:cardTranslateY.value
    //         },
    //             {
    //                 translateX:cardTranslateX.value
    //             }
    //         ],
    //         backgroundColor:interpolateColor(cardTranslateX.value,[-100,0,100],['#c15e24','#ddd','#448f6e'])
    //     }
    // })
    // let wordAnimStyle = useAnimatedStyle(()=>{
    //     return {
    //         opacity:interpolate(cardTranslateX.value,
    //             [-width/3,0,width/3],
    //             [0,1,0],
    //             Extrapolation.CLAMP
    //         )
    //     }
    // })
    // let learnYetAnimStyle = useAnimatedStyle(()=>{
    //     return {
    //         opacity:interpolate(cardTranslateX.value,
    //             [0,-width/3],
    //             [0,1],
    //             Extrapolation.CLAMP
    //         )
    //     }
    // })
    // let knowThatAnimStyle = useAnimatedStyle(()=>{
    //     return {
    //         opacity:interpolate(cardTranslateX.value,[0,width/3],[0,1])
    //     }
    // })
    // let[counters,setCounters] = useState({
    //     yetLearn:0,
    //     knowThat:0
    // })

    // const gesture = Gesture.Pan()
    //     .onUpdate(event => {
    //         cardTranslateX.value = event.translationX + ctx.x
    //         cardTranslateY.value = event.translationY + ctx.y
    //     })
    //     .onBegin(event => {
    //        runOnJS(setCtx)({
    //            // @ts-ignore
    //            x:cardTranslateX.value,
    //            // @ts-ignore
    //            y:cardTranslateY.value
    //        })
    //
    //     })
    //     .onEnd(event => {
    //         console.log(-width/2, cardTranslateX, cardTranslateY,cardTranslateX.value < -width/2)
    //         if(cardTranslateX.value < -width/3){
    //             runOnJS(setCounter)(counter + 1)
    //             console.log('AAAA',counter)
    //             runOnJS(setCounters)({...counters,yetLearn:counters.yetLearn + 1})
    //             cardTranslateX.value = withSpring(-500)
    //             scaleX.value = withSpring(scaleX.value + width/words.length)
    //         }
    //         else if(cardTranslateX.value > width/3){
    //
    //             runOnJS(setCounter)(counter + 1)
    //             console.log('AAAA',counter)
    //             cardTranslateX.value = withSpring(500)
    //         }
    //         else if(cardTranslateX.value  > -width/3 || cardTranslateX.value < width/3){
    //             cardTranslateX.value = withSpring(0)
    //             cardTranslateY.value = withSpring(0)
    //         }
    //
    //     })
    useEffect(()=>{
        console.log('AAAAA',state.currentSet?.words)
    //
    },[])
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
                <View style={{width:'100%',height:5,backgroundColor:'#ccc',position:'absolute',bottom:0}}>
                    <Animated.View style={[{
                        height:'100%',
                        backgroundColor:'#999',
                    },stringAnimStyles]}>

                    </Animated.View>
                </View>
            </View>
            {/*<View style={{*/}
            {/*    flexDirection:'row',*/}
            {/*    alignItems:'center',*/}
            {/*    marginTop:12,*/}
            {/*    justifyContent:'space-between',*/}
            {/*}}>*/}
            {/*    /!*#448f6e*!/*/}
            {/*    <View style={{*/}
            {/*        width:37,*/}
            {/*        height:33,*/}
            {/*        borderLeftWidth:0,*/}
            {/*        borderTopEndRadius:25,*/}
            {/*        borderBottomEndRadius:25,*/}
            {/*        borderColor:'#c15e24',*/}
            {/*        borderWidth:2,*/}
            {/*        justifyContent:'center',*/}
            {/*        alignItems:'center'*/}
            {/*    }}>*/}
            {/*        <Animated.View style={[{*/}
            {/*            width:'100%',*/}
            {/*            height:'100%',*/}
            {/*            borderTopEndRadius:25,*/}
            {/*            borderBottomEndRadius:25,*/}
            {/*            opacity:0,*/}
            {/*            backgroundColor:'#c15e24',*/}
            {/*            justifyContent:'center',*/}
            {/*            alignItems:'center'*/}
            {/*        },learnYetAnimStyle]}>*/}
            {/*            <Text style={{fontSize:15, color:'#ccc',fontFamily:'HurmeGeomBold',}}>+1</Text>*/}
            {/*        </Animated.View>*/}
            {/*        <Text style={{zIndex:-1,position:'absolute',fontSize:15, color:'#c15e24',fontFamily:'HurmeGeomBold'}}>{counters.yetLearn}</Text>*/}
            {/*    </View>*/}
            {/*    <View style={{*/}
            {/*        width:37,*/}
            {/*        height:33,*/}

            {/*        borderTopStartRadius:25,*/}
            {/*        borderBottomStartRadius:25,*/}
            {/*        borderColor:'#448f6e',*/}
            {/*        borderWidth:2,*/}
            {/*        justifyContent:'center',*/}
            {/*        alignItems:'center'*/}
            {/*    }}>*/}
            {/*        <Animated.View style={[{*/}
            {/*            width:'100%',*/}
            {/*            height:'100%',*/}
            {/*            borderTopStartRadius:25,*/}
            {/*            borderBottomStartRadius:25,*/}
            {/*            opacity:0,*/}
            {/*            backgroundColor:'#448f6e',*/}
            {/*            justifyContent:'center',*/}
            {/*            alignItems:'center'*/}
            {/*        },knowThatAnimStyle]}>*/}
            {/*            <Text style={{fontSize:15, color:'#ccc',fontFamily:'HurmeGeomBold',}}>+1</Text>*/}
            {/*        </Animated.View>*/}
            {/*        <Text style={{zIndex:-1,position:'absolute',fontSize:15, color:'#448f6e',fontFamily:'HurmeGeomBold'}}>{counters.knowThat}</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                {words.map(( el,index )=>{
                    return <Card index={index} word={el}/>
                //

                })}
                {/*<GestureDetector gesture={gesture}>*/}
                {/*<Animated.View style={[{*/}
                {/*    width:'85%',*/}
                {/*    height:'95%',*/}
                {/*    shadowOpacity:0,*/}
                {/*    shadowColor:'#ccc',*/}
                {/*    shadowOffset:{*/}
                {/*        width:0,*/}
                {/*        height:0*/}
                {/*    },*/}
                {/*    shadowRadius:2,*/}
                {/*    borderRadius:20,*/}
                {/*    // backgroundColor:'#ccc',*/}
                {/*    padding:5,*/}
                {/* },cardAnimStyles]}>*/}
                {/*    <Pressable style={{*/}
                {/*        width:'100%',*/}
                {/*        height:'100%',*/}
                {/*        borderRadius:15,*/}
                {/*        backgroundColor:'#ddd',*/}
                {/*        justifyContent:'center',*/}
                {/*        alignItems:'center'*/}
                {/*    }}>*/}
                {/*        <Animated.Text style={[{*/}
                {/*            fontSize:35,*/}
                {/*            position:'absolute',*/}
                {/*            fontFamily:'HurmeGeomBold',*/}
                {/*            color:'#ff8503',*/}
                {/*        },learnYetAnimStyle]}>*/}
                {/*            Learn yet*/}
                {/*        </Animated.Text>*/}
                {/*        <Animated.Text style={[{*/}
                {/*            fontSize:35,*/}
                {/*            position:'absolute',*/}
                {/*            fontFamily:'HurmeGeomBold',*/}
                {/*            color:'#448f6e',*/}
                {/*        },knowThatAnimStyle]}>*/}
                {/*            Know that*/}
                {/*        </Animated.Text>*/}
                {/*        <Animated.Text style={[{*/}
                {/*            fontFamily:'HurmeGeomBold',*/}
                {/*            fontSize:35,*/}
                {/*            color:'#555666'*/}
                {/*        },wordAnimStyle]}>{words[0].word}</Animated.Text>*/}
                {/*    </Pressable>*/}
                {/*</Animated.View>*/}
                {/*</GestureDetector>*/}
                {/*@ts-ignore*/}

            </View>
            <View style={{
                width:'100%',
                height:80,
                paddingLeft:40,
                paddingBottom:20,
                flexDirection:'row',
                alignItems:'center',
            }}>
                <TouchableOpacity onPress={()=>{
                    if(counter!=1) {
                        setCounter(counter - 1)
                        cardTranslateX.value = withSpring(0)
                        cardTranslateY.value = withSpring(0)
                        scaleX.value = withTiming(scaleX.value - width / words.length)
                    }

                }}>
                    <FontAwesomeIcon size={22} color={'#555'} icon={faRotateLeft}/>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default WordCards;