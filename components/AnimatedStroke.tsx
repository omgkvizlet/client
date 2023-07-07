import React, {Ref, useEffect, useRef, useState} from 'react';
import Animated, {useAnimatedProps, useSharedValue, withRepeat, withTiming} from "react-native-reanimated";
import {Path} from "react-native-svg";
import {SharedValue} from "react-native-reanimated/lib/types/lib";
const AnimatedPath = Animated.createAnimatedComponent(Path)

interface IAnimatedStrokeProps {
    d:string,
    strokeDashValue:SharedValue<number>,
    stroke?:string
}
const AnimatedStroke = ({stroke,d,strokeDashValue}:IAnimatedStrokeProps) => {
    const[length,setLength] = useState<number>(0)
    let strokeDash = useSharedValue(0)

    let pathRef = useRef<React.MutableRefObject<typeof AnimatedPath>>()
    // @ts-ignore
    let animation = useAnimatedProps(()=>({
        strokeDashoffset: length - length * strokeDashValue?.value
    }))
    // @ts-ignore
    return (
        <>
            <AnimatedPath
                animatedProps={animation}
                onLayout={()=>{
                    //  @ts-ignore
                    setLength(pathRef.current.getTotalLength())
                }}
                d={d}
                fill={"none"}
                stroke={stroke}
                strokeDasharray={length}
                strokeWidth={10}
                ref={pathRef}
            />
        </>
    );
};

export default AnimatedStroke;