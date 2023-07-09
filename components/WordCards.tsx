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
import {ActionTypes, IAction, IWord} from "../types";
import {useDispatch} from "react-redux";

const { width } = Dimensions.get('window')
interface IWordCardsProps {
    words:IWord[],

    translateY:SharedValue<number>

    setIsVisible:any
}
export interface ICounters {
    yetLearn:number,

    knowThat:number
}
const WordCards = ({ words, translateY, setIsVisible }:IWordCardsProps) => {
    let[counters,setCounters] = useState<ICounters>({
        yetLearn:0,
        knowThat:0
    })
    const[idx,setIndex] = useState(0)
    let translateX = useSharedValue(0)
    let dispatch = useDispatch()
    let [ counter, setCounter ] = useState(1)
    const state = useTypedSelector(state1 => state1.mainReducer)
    let scaleX = useSharedValue(0)
    const learnYetStyles = useAnimatedStyle(()=>{
        return {
            opacity:interpolate(
                translateX?.value,
                [-width/3,0],
                // #448f6e
                [1,0]
            //
            )
        }
    })
    const knowThatStyles = useAnimatedStyle(()=>{
        return {
            opacity:interpolate(
                translateX?.value,
                [0,width/3],
                [0,1]
            )
        }
    })

    const animDialogStyles = useAnimatedStyle(()=>{
        return {
            transform:[{
                translateY:translateY.value
            }]
        }
    })

    useEffect(()=>{
        console.log(idx)
    },[idx])
    const stringAnimStyles = useAnimatedStyle(()=>{
        return {
            width:scaleX.value
        }
    })
    const x = useSharedValue(0)
    const y = useSharedValue(0)
    return (
        <Animated.View style={[{
            width:'100%',
            height:'100%',
            position:'absolute',
            zIndex:2,
            top:'100%',
            backgroundColor:'#fff',
        },animDialogStyles]}>
            <Animated.View style={[{paddingTop:20,justifyContent:'center',width,height:100,flexDirection:'row',alignItems:'center'}]}>
                <TouchableOpacity onPress={()=>{
                    setTimeout(()=>setIsVisible(false),250)
                    translateY.value = withTiming(0)
                }} style={{position:'absolute',left:20,flexGrow:1}}>
                    <FontAwesomeIcon color={'#555'} size={25} icon={faXmark}/>
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:20,fontFamily:'HurmeGeomBold2',color:'#555'}}>{Object.values(counters).reduce((a,b)=>a+b)}/{words.length}</Text>
                </View>
                <View style={{width:'100%',height:5,backgroundColor:'#ccc',position:'absolute',bottom:0}}>
                    <Animated.View style={[{
                        height:'100%',
                        backgroundColor:'#999',
                    },stringAnimStyles]}>

                    </Animated.View>
                </View>
            </Animated.View>

            <View style={{
                flexDirection:'row',
                alignItems:'center',
                marginTop:12,
                justifyContent:'space-between',
            }}>
                {/*#448f6e*/}
                <View style={{
                    width:37,
                    height:33,
                    borderLeftWidth:0,
                    borderTopEndRadius:25,
                    borderBottomEndRadius:25,
                    borderColor:'#c15e24',
                    borderWidth:2,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Animated.View style={[{
                        width:'100%',
                        height:'100%',
                        borderTopEndRadius:25,
                        borderBottomEndRadius:25,
                        opacity:1,
                        backgroundColor:'#c15e24',
                        justifyContent:'center',
                        alignItems:'center'
                    },learnYetStyles]}>
                        <Text style={{fontSize:15, color:'#ccc',fontFamily:'HurmeGeomBold',}}>+1</Text>
                    </Animated.View>
                    <Text style={{zIndex:-1,position:'absolute',fontSize:15, color:'#c15e24',fontFamily:'HurmeGeomBold'}}>{counters.yetLearn}</Text>
                </View>
                <View style={{
                    width:37,
                    height:33,

                    borderTopStartRadius:25,
                    borderBottomStartRadius:25,
                    borderColor:'#448f6e',
                    borderWidth:2,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Animated.View style={[{
                        width:'100%',
                        height:'100%',
                        borderTopStartRadius:25,
                        borderBottomStartRadius:25,
                        opacity:1,
                        backgroundColor:'#448f6e',
                        justifyContent:'center',
                        alignItems:'center'
                    },knowThatStyles]}>
                        <Text style={{fontSize:15, color:'#ccc',fontFamily:'HurmeGeomBold',}}>+1</Text>
                    </Animated.View>
                    <Text style={{zIndex:-1,position:'absolute',fontSize:15, color:'#448f6e',fontFamily:'HurmeGeomBold'}}>{counters.knowThat}</Text>
                </View>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                {words.map(( el,index )=>{
                    return <Card scaleX={scaleX} counters={counters} setCounters={setCounters} translateX={translateX} setIdx={setIndex} idx={idx} index={index} word={el} />
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

                    if(idx>0){
                        setIndex(idx-1)
                        scaleX.value = withTiming(scaleX.value - width/state.currentSet?.words.length)
                    }
                    dispatch({
                        type: ActionTypes.RETURN_CARD,
                    })
                    if(Object.values(counters).every(counter=>counter>=0)) {
                        state.currentSet?.flashCardsGame?.learned
                            ? setCounters({...counters, knowThat: counters.knowThat - 1})
                            : setCounters({...counters, yetLearn: counters.yetLearn - 1})
                    }
                }}>
                    <FontAwesomeIcon size={22} color={'#555'} icon={faRotateLeft}/>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
};

export default WordCards;