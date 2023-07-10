import React, {useEffect, useState} from 'react';
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {Dimensions, Pressable} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {ActionTypes, IWord} from "../types";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {SharedValue} from "react-native-reanimated/lib/types/lib";
import {ICounters} from "./WordCards";
import {useDispatch} from "react-redux";

const { width } = Dimensions.get('window')
interface ICardProps {
    word:IWord,
    
    index:number,
    
    setIdx:any,
    
    idx:number,
    
    translateX:SharedValue<number>

    counters:ICounters,

    setCounters:any,

    scaleX:SharedValue<number>
}
const Card = ({ setCounters, counters, scaleX, word, index, idx, setIdx, translateX }:ICardProps) => {
    const dispatch = useDispatch()
    const[flipped,setFlipped] = useState<boolean>(false)

    let [ beyond, setCounter ] = useState(1)

    let state = useTypedSelector(state1 => state1.mainReducer)

    let cardTranslateY = useSharedValue(0)

    let cardTranslateX = useSharedValue(0)

    const [ctx,setCtx] = useState({
        x:0,
        y:0
    })

    const rotateY = useSharedValue(0)
    useEffect(()=>{
        if(index===idx) {
            cardTranslateX.value = withSpring(0)
            cardTranslateY.value = withSpring(0)
        }
    },[state.currentSet?.flashCardsGame?.isReturned])
    let cardAnimStyles = useAnimatedStyle(()=>{
        // @ts-ignore
        return {


            transform:[

                {
                translateY:cardTranslateY.value
            },
                {
                    translateX:cardTranslateX.value,

                },
                {
                    "rotateY":rotateY.value.toString() + 'deg'
                },
                {
                    rotateZ:interpolate(
                        cardTranslateX.value,
                        [-width,0,width],
                        // @ts-ignore
                        [-35,0,35],
                        Extrapolation.CLAMP
                    ) + 'deg'
                },


            ],
            backgroundColor:interpolateColor(cardTranslateX.value,[-100,0,100],['#ff8503','#ddd','#448f6e']),


        }
    })
    let wordAnimStyle = useAnimatedStyle(()=>{
        return {
            opacity:interpolate(cardTranslateX.value,
                [-width/3,0,width/3],
                [0,1,0],
                Extrapolation.CLAMP
            ),
            // transform:[{
            //     rotateY:rotateY.value + 'deg'
            // }]
        }
    })
    let learnYetAnimStyle = useAnimatedStyle(()=>{
        return {
            opacity:interpolate(cardTranslateX.value,
                [0,-width/3],
                [0,1],
                Extrapolation.CLAMP
            )
        }
    })
    let knowThatAnimStyle = useAnimatedStyle(()=>{
        return {
            opacity:interpolate(cardTranslateX.value,[-width/3,0,width/3],[1,0,1])
        }
    })
    useEffect(()=>{
        flipped ? rotateY.value = withTiming(180) : rotateY.value = withTiming(0)
    },[flipped])
    const gesture = Gesture.Pan()
        .onUpdate(event => {
            cardTranslateX.value = event.translationX + ctx.x
            cardTranslateY.value = event.translationY + ctx.y
            translateX.value = cardTranslateX.value
        })
        .onBegin(event => {
            runOnJS(setCtx)({
                // @ts-ignore
                x:cardTranslateX.value,
                // @ts-ignore
                y:cardTranslateY.value
            })

        })
        .onStart(event=>{
            runOnJS(setIdx)(index)
        })
        .onEnd(event => {
            if(cardTranslateX.value < -width/3){
                runOnJS(setIdx)(index+1)
               runOnJS(dispatch)(({
                    type:ActionTypes.LEARN_WORD,
                    data:false
                }))
                runOnJS(setCounters)({...counters,yetLearn:counters.yetLearn + 1})
                cardTranslateX.value = withSpring(-600)
                console.log(state.currentSet?.words.length)
                scaleX.value = withTiming(scaleX.value + width/state?.currentSet?.words?.length)
                translateX.value = withSequence(withTiming(-600),withTiming(0))

            }
            else if(cardTranslateX.value > width/3){
                runOnJS(dispatch)(({
                    type:ActionTypes.LEARN_WORD,
                    data:true
                }))
                runOnJS(setIdx)(index+1)
                // runOnJS(setIdx)(index)
                runOnJS(setCounters)({...counters,knowThat:counters.knowThat + 1})
                scaleX.value = withTiming(scaleX.value + width/state?.currentSet?.words?.length)
                cardTranslateX.value = withSpring(600)
                translateX.value = withSequence(withTiming(600),withTiming(0))

            }
            else if(cardTranslateX.value  > -width/3 || cardTranslateX.value < width/3){
                if(index != 0){
                    runOnJS(setIdx)(index-1)
                }
                cardTranslateX.value = withSpring(0)
                cardTranslateY.value = withSpring(0)
                translateX.value = withTiming(0)
            }

        })
    useEffect(()=>{
        rotateY.value = 0
    },[])

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View  style={[{
                // @ts-ignore
                zIndex:state?.currentSet?.words?.length - index,
                width:'85%',
                height:'90%',
                shadowOpacity:1,
                elevation:4,
                position:'absolute',
                shadowColor:'#ccc',
                shadowOffset:{
                    width:0,
                    height:0
                },
                shadowRadius:2,
                borderRadius:20,
                // backgroundColor:'#ccc',
                padding:5,
            },cardAnimStyles]}>
                <Pressable onPress={()=>{
                    setFlipped(!flipped)
                }} style={{
                    width:'100%',
                    height:'100%',
                    borderRadius:15,
                    position:'relative',
                    backgroundColor:'#ddd',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    {/*<Animated.Text style={[{*/}
                    {/*    fontSize:35,*/}
                    {/*    position:'absolute',*/}
                    {/*    fontFamily:'HurmeGeomBold',*/}
                    {/*    color:'#ff8503',*/}
                    {/*},learnYetAnimStyle]}>*/}
                    {/*    Learn yet*/}
                    {/*</Animated.Text>*/}
                    <Animated.Text style={[{
                        fontSize:35,
                        position:'absolute',
                        fontFamily:'HurmeGeomBold',
                        color:'#448f6e',
                    },knowThatAnimStyle]}>
                        {cardTranslateX.value > 0 ? 'Know that' : 'Learn yet'}
                    </Animated.Text>
                    <Animated.Text style={[{
                        fontFamily:'HurmeGeomBold',
                        fontSize:35,
                        // backfaceVisibility:'hidden',
                        position:'absolute',
                        color:'#555666'
                    },wordAnimStyle]}>HUY</Animated.Text>
                    <Animated.Text style={[{
                        fontFamily:'HurmeGeomBold',
                        fontSize:35,
                        backfaceVisibility:'hidden',
                        position:'absolute',
                        transform:[{translateY: 100},{rotateY:180+'deg'}],
                        color:'#555666'
                    },wordAnimStyle]}>hren</Animated.Text>
                {/*    */}
                </Pressable>
            </Animated.View>
        </GestureDetector>
    );
};

export default Card;