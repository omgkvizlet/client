import React, {useState} from 'react';
import Animated, {
    Extrapolation,
    interpolate,
    interpolateColor,
    runOnJS,
    useAnimatedStyle, useSharedValue,
    withSpring
} from "react-native-reanimated";
import {Dimensions, Pressable} from "react-native";
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import {IWord} from "../types";
import {useTypedSelector} from "../hooks/useTypedSelector";
const { width } = Dimensions.get('window')
interface ICardProps {
    word:IWord,
    index:number
}
const Card = ({ word, index }:ICardProps) => {
    let [ counter, setCounter ] = useState(1)
    let state = useTypedSelector(state1 => state1.mainReducer)
    let cardTranslateY = useSharedValue(0)
    let cardTranslateX = useSharedValue(0)
    const [ctx,setCtx] = useState({
        x:0,
        y:0
    })

    let scaleX = useSharedValue(0)
    let cardAnimStyles = useAnimatedStyle(()=>{
        return {
            transform:[{
                translateY:cardTranslateY.value
            },
                {
                    translateX:cardTranslateX.value
                },
            ],
            backgroundColor:interpolateColor(cardTranslateX.value,[-100,0,100],['#ff8503','#ddd','#448f6e'])
        }
    })
    let wordAnimStyle = useAnimatedStyle(()=>{
        return {
            opacity:interpolate(cardTranslateX.value,
                [-width/3,0,width/3],
                [0,1,0],
                Extrapolation.CLAMP
            )
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
            opacity:interpolate(cardTranslateX.value,[0,width/3],[0,1])
        }
    })
    let[counters,setCounters] = useState({
        yetLearn:0,
        knowThat:0
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
            console.log(-width/2, cardTranslateX, cardTranslateY,cardTranslateX.value < -width/2)
            if(cardTranslateX.value < -width/3){
                runOnJS(setCounter)(counter + 1)
                console.log('AAAA',counter)
                runOnJS(setCounters)({...counters,yetLearn:counters.yetLearn + 1})
                cardTranslateX.value = withSpring(-500)
                scaleX.value = withSpring(scaleX.value + width)
            }
            else if(cardTranslateX.value > width/3){

                runOnJS(setCounter)(counter + 1)
                console.log('AAAA',counter)
                cardTranslateX.value = withSpring(500)
            }
            else if(cardTranslateX.value  > -width/3 || cardTranslateX.value < width/3){
                cardTranslateX.value = withSpring(0)
                cardTranslateY.value = withSpring(0)
            }

        })
    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[{
                // @ts-ignore
                zIndex:state?.currentSet?.words?.length - index,
                width:'85%',
                height:'95%',
                shadowOpacity:0,
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
                <Pressable style={{
                    width:'100%',
                    height:'100%',
                    borderRadius:15,
                    backgroundColor:'#ddd',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Animated.Text style={[{
                        fontSize:35,
                        position:'absolute',
                        fontFamily:'HurmeGeomBold',
                        color:'#ff8503',
                    },learnYetAnimStyle]}>
                        Learn yet
                    </Animated.Text>
                    <Animated.Text style={[{
                        fontSize:35,
                        position:'absolute',
                        fontFamily:'HurmeGeomBold',
                        color:'#448f6e',
                    },knowThatAnimStyle]}>
                        Know that
                    </Animated.Text>
                    <Animated.Text style={[{
                        fontFamily:'HurmeGeomBold',
                        fontSize:35,
                        color:'#555666'
                    },wordAnimStyle]}>{word.translation}{index}</Animated.Text>
                </Pressable>
            </Animated.View>
        </GestureDetector>
    );
};

export default Card;