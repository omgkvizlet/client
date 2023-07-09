import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Pressable, Text, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faClose,faGear} from '@fortawesome/free-solid-svg-icons'
import {useTypedSelector} from "../hooks/useTypedSelector";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue, withDelay,
    withSequence,
    withTiming
} from "react-native-reanimated";
import RippleBtn from "./UI/RippleBtn";
import Button from "./UI/Button";
import Ripple from 'react-native-material-ripple'
import {SharedValue} from "react-native-reanimated/lib/types/lib";
import {useDispatch} from "react-redux";
import {ActionTypes, IMatchGame} from "../types";
interface IMatchGameProps {
    translateY:SharedValue<number>,

    setIsVisible:any
}
const { width, height } = Dimensions.get('window')
const shuffleArray = (array:any[]):void => {
    for (let i = 0; i < array.length; i++) {
        const el = array[i]
        console.log('ELLL')
        const randomIndex = Math.floor(Math.random()*array.length)
        array[i] = array[randomIndex]

        array[randomIndex] = el
    }
}

const MatchGame:React.FC<IMatchGameProps> = ({translateY, setIsVisible}) => {
    const[guessingCard,setGuessingCard] = useState(null)
    let dispatch = useDispatch()

    const [ isWrong, setIsWrong ] = useState<boolean>(false)

    const mistakeTranslateY = useSharedValue(0)

    const mistakeStyles = useAnimatedStyle(()=>{
        return {
            transform:[{
                translateY:mistakeTranslateY.value
            },
                {
                    scale:interpolate(
                        mistakeTranslateY.value,
                        [0,-height/2],
                        [1,0.8]
                    )
                }
            ]
        }
    })

    useEffect(()=>{
        // mistakeTranslateY.value = withTiming(-height/2)
    },[isWrong])
    let opacity = useSharedValue(1)

    const[time,setTime] = useState<number>(0)

    const state = useTypedSelector(state1 => state1.mainReducer)

    const [wordsAndTranslations,setWordsAndtranslations] = useState<any[]>([
        // @ts-ignore
        ...state.currentSet?.words.map(word=>word.word),
        ...state.currentSet?.words.map(word=>word.translation)
    ])
    const [ idx,setIdx ] = useState<number>()

    let animStyles = useAnimatedStyle(()=>{
        return {
            opacity:opacity.value
        }
    })
    useEffect(()=>{
        setTime(0)

        setInterval(() => {
                setTime(prevState=>prevState + 0.1);
            }, 100);
    },[])

    useEffect(()=>{
        shuffleArray(wordsAndTranslations)
    },[])
    let matchGameAnimStyles = useAnimatedStyle(()=>{
        return {
            transform:[{translateY:translateY.value}]
        }
    })
    useEffect(()=>{
        // if (isWrong) {
        //     mistakeTranslateY.value = withSequence(
        //         withDelay(250,withTiming(-height/2)),
        //         withDelay(1000,withTiming(0))
        //     )
        // mistakeTranslateY.value = withTiming(-height/2)

        // }
    },[isWrong])
    // @ts-ignore
    return (
        <Animated.View style={[{
            position:'absolute',
            top:'100%',
            height:'100%',
            width:'100%',
            zIndex:1,
            backgroundColor:'#f2f2f2',
            alignItems:'center',
            justifyContent:'center'
        },matchGameAnimStyles]}>
            {/*<View style={{*/}
            {/*    width:'100%',*/}
            {/*    position:'absolute',*/}
            {/*    top:'0%',*/}
            {/*    height:'100%',*/}
            {/*    justifyContent:'center',*/}
            {/*    alignItems:'center',*/}
            {/*}}>*/}
            {/*    <View style={{gap: 25,width:'100%',alignItems:'center'}}>*/}
            {/*        <Text style={{textAlign:'center',fontFamily:'HurmeGeomBold',fontSize:30,color:'#555'}}>Lust auf ein Spiel?</Text>*/}
            {/*        <Text style={{width:'70%',textAlign:'center',fontFamily:'HurmeGeom2',fontSize:20,color:'#555'}}>*/}
            {/*            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto  Cgnam minima, mollitia, nam quo, suscipit ut vel!*/}
            {/*        </Text>*/}
            {/*        <Animated.View style={[{width:'70%',height:60},animStyles]}><Button styles={{*/}
            {/*            animView:{width:'100%',height:'100%'},*/}
            {/*            btn:{justifyContent:'center'}*/}
            {/*        }}>*/}
            {/*            <Text>Spiel beginnen</Text>*/}
            {/*        </Button>*/}
            {/*        </Animated.View>*/}
            {/*    </View>*/}
            {/*</View>*/}
            <View style={{
                width:'100%',
                height:'10%',
                backgroundColor:'#f2f2f2',
                flexDirection:'row',
                alignItems:'center',
                paddingTop:20,
                justifyContent:'space-between',
                paddingHorizontal:15,
            }}>
                {/**/}

                <TouchableOpacity
                    onPress={()=>{
                        translateY.value = withTiming(0,{duration:250})
                        setTimeout(()=>setIsVisible(false),250)
                    }}
                    style={{
                        width:50,
                        height:50,
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                    <FontAwesomeIcon size={20} color={'#555'} icon={faClose}/>
                </TouchableOpacity>
                <Text style={{
                    fontFamily:'HurmeGeomBold',
                    fontSize:22,
                    textTransform:'uppercase',
                    color:'#555'
                }}>{time.toFixed(1)} Seconds</Text>
                <TouchableOpacity style={{
                    width:50,
                    height:50,
                    justifyContent:'center',
                    alignItems:'center'
                }}><FontAwesomeIcon size={20} color={'#555'} icon={faGear}/></TouchableOpacity>
            </View>
            <View style={{
                width:'90%',
                height:'90%',
                justifyContent:'center',
                alignItems:'center',
                overflow:'hidden'
            }}>
                { isWrong &&  <Animated.Text style={[{
                    position:'absolute',
                    fontFamily:'HurmeGeomBold',
                    fontSize:110,
                    zIndex:2,

                    color:'#cc3300',
                }, mistakeStyles ]}>+1 Sek</Animated.Text> }
            <View style={{
                // justifyContent:'center',
                paddingBottom:70,
                width:'100%',
                height:'100%',
                gap:10,
                flexDirection:'row',
                flexWrap:'wrap'
            }}>

                {/**/}
                {/*@ts-ignore*/}
                {wordsAndTranslations.map((word, index)=>{
                    console.log('ARRAY',wordsAndTranslations)
                    return <RippleBtn setIsWrong={setIsWrong} index={index} onPressFn={()=>{
                        console.log(state.currentSet?.matchGame?.guessingCard1)
                        if(state.currentSet?.matchGame?.guessingCard1 && state.currentSet.matchGame.guessingCard1?.index !== index) {
                                dispatch({
                                    type:ActionTypes.SET_GUESSING_CARD2,
                                    data:{ index, word }
                                })
                                dispatch({
                                    type:ActionTypes.WRONG_MATCH,
                                })
                                dispatch({
                                    type:ActionTypes.SET_GUESSING_CARD,
                                    data:null
                                })
                            dispatch({
                                type:ActionTypes.SET_GUESSING_CARD2,
                                data:null
                            })
                                return
                        }
                            dispatch({
                                type:ActionTypes.SET_GUESSING_CARD,
                                data:{index,word}
                            })

                    }} rippleColor={'#000'} style={{
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#555',
                        height:'25%',
                        width:'31.5441%'
                    }}>
                        <Pressable
                            style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                            <Animated.Text style={{fontFamily: 'HurmeGeomSemiBold', fontSize: 20, color: '#555'}}>
                                {wordsAndTranslations[index]}
                            </Animated.Text>
                        </Pressable>
                    {/*    */}
                    </RippleBtn>
                })}

                    </View>
            </View>
        </Animated.View>
    );
};

export default MatchGame;