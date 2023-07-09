import React, {FC, useEffect, useRef} from 'react';
import {StyleSheet, View} from "react-native";
import {TapGestureHandler} from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue, withDelay, withSequence,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {IMatchGame} from "../../types";

interface IRippleBtnProps {
    style?:StyleSheet,

    onPressFn:()=>void,

    rippleColor:string,

    idx:number,

    setIsWrong:any,

    index:number
}
const RippleBtn:FC<IRippleBtnProps> = ({rippleColor, children, style, onPressFn, index, setIsWrong}) => {
    const bg = useSharedValue(rippleColor)

    const cardRef = useRef<Animated.View>(null)

    const translateX = useSharedValue(0)

    const animText = useAnimatedStyle(()=>{
        return {
            transform:[{translateX:translateX.value}]
        }
    })

    const {currentSet:{matchGame}} = useTypedSelector(state1 => state1.mainReducer)

    const scale = useSharedValue(0)

    const centerX = useSharedValue(0)

    const centerY = useSharedValue(0)

    const opacity = useSharedValue(0.2)

    const cardOpacity = useSharedValue(1)

    const animOpacity = useAnimatedStyle(()=>{
        return {
            opacity:cardOpacity.value
        }
    })

    const animatedRippleStyles = useAnimatedStyle(()=>{
        let rWidth = 300

        // @ts-ignore
        return {
            width:rWidth,
            position:'absolute',
            height:rWidth,
            borderRadius:rWidth/2,
            backgroundColor: bg.value,
            opacity:opacity.value,
            left:0,
            top:0,
            transform:[
                {
                  translateX:centerX.value - rWidth/2
                },
                {
                    translateY:centerY.value - rWidth/2
                },
                {
                    scale:scale.value
                }
            ]
        }
    })
    useEffect(()=>{
        if(matchGame) {
            const {guessingCard1, guessingCard2} = matchGame as IMatchGame
            if (guessingCard2?.index == index || guessingCard1?.index == index) {
                if (guessingCard2?.word.toLowerCase() === guessingCard1.word.toLowerCase()) {
                    bg.value = withTiming('#00aa00')

                    // cardOpacity.value = withTiming(0)
                } else {
                    setIsWrong(true)
                    // translateX.value = withSequence(
                    //     withTiming(-5,{duration:50}),
                    //     withTiming(5,{duration:50}),
                    //     withTiming(-5,{duration:50}),
                    //     withTiming(0,{duration:50})
                    // )

                    bg.value = withTiming('#aa0000')
                    opacity.value = withDelay(500,withTiming(0,{duration:250}))
                    scale.value = withDelay(750,withTiming(0))
                    bg.value = withDelay(1000,withTiming('#000'))
                    setTimeout(()=>{
                        setIsWrong(false)
                    },250)

                }
            }
        }
        // opacity.value = withDelay(250,withTiming(0))
       //  scale.value = withTiming(0)

    },[matchGame?.isWrong])
    // useEffect(()=>{
    //     console.log('opacity')
    //     // if()
    //     bg.value = state.currentSet?.matchGame?.isWrong ? '#aa0000' : '#00aa00'
    // },[state.currentSet?.matchGame?.isWrong])
    const pressGestureEvent = useAnimatedGestureHandler({
        onStart:(event)=>{
            console.log('AAAAA',scale.value)
            if(scale.value > 0){
                centerX.value = event.x
                centerY.value = event.y
                scale.value = withTiming(0)
                opacity.value = withTiming(0)
                return
            }
            //
            runOnJS(onPressFn)()
            opacity.value = withTiming(0.2)
            centerX.value = event.x
            centerY.value = event.y
            scale.value = withTiming(3,{duration:750})
        },
        onFinish:()=>{
            // opacity.value = withTiming(0)
        }
    //
    })
    return (
        <TapGestureHandler onGestureEvent={pressGestureEvent}>
            <Animated.View ref={cardRef} style={[{...style,overflow:'hidden'},animOpacity]}>
            <Animated.View style={[animText]} pointerEvents={"none"}>
                {children}
            </Animated.View>
                <Animated.View style={animatedRippleStyles}></Animated.View>
            </Animated.View>
        </TapGestureHandler>
    );
};

const styles = StyleSheet.create({
    ripple:{

    }
})
export default RippleBtn;