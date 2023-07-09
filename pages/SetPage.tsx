import React, {useEffect, useRef, useState} from 'react';
import {
    Animated as AnimatedRN,
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from "react-native";
import {ActionTypes, ICurrentCard, ISet, IWord} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import * as Haptics from 'expo-haptics'
import * as fa from '@fortawesome/free-solid-svg-icons'
import Animated, {
    Easing, runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDecay,
    withSpring,
    withTiming
} from "react-native-reanimated";
import WordCards from "../components/WordCards";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {Gesture, GestureDetector, PanGestureHandler} from "react-native-gesture-handler";
import Button from "../components/UI/Button";
import {NavigationProp, RouteProp} from "@react-navigation/native";
import MatchGame from "../components/MatchGame";
let { width } = Dimensions.get('window')
interface ISetPageProps {
    navigation:NavigationProp<any>,
    route:RouteProp<any>
}
const SetPage = ({navigation,route}:ISetPageProps) => {
    let dispatch = useDispatch()
    const [isVisible, setIsVisible ] = useState<boolean>(false)
    let matchGameTranslateY = useSharedValue(0)
    const translateY = useSharedValue(0)
    const state = useTypedSelector(state1 => state1.mainReducer)
    // const { words, name }:ISet = route.params
    let rotateX = useRef(new AnimatedRN.Value(0))
    const [flipped,setFlipped] = useState(false)
    let swipeGesture = Gesture.Pan()
        .onUpdate(e=>{
        })
    useEffect(()=>{
        dispatch({
            type:ActionTypes.SET_CURRENT_CARD,
            data: {
                word:state.currentSet?.words[0],
                x:0,
                y:0
            } as ICurrentCard
        })
    //
    },[])
    useEffect(()=>{
        AnimatedRN.timing(rotateX.current,{
            toValue:flipped ? 1 : 0,
            duration:500,
            useNativeDriver:true
        }).start()
    },[flipped])
    return (
        <>
        {isVisible && <MatchGame setIsVisible={setIsVisible} translateY={matchGameTranslateY}/>}
        {isVisible && <WordCards setIsVisible={setIsVisible} words={state.currentSet?.words} translateY={translateY}/>}
            <View style={{width:'100%',height:90,justifyContent:'center',paddingLeft:30,backgroundColor:'#fff'}}>
                <TouchableOpacity style={{
                    width:50,
                    height:50,
                    justifyContent:'center',
                    alignItems:'center'
                }} onPress={()=>navigation.goBack()}>
                    <FontAwesomeIcon size={23} color={"#888"} icon={faArrowLeft}/>
                </TouchableOpacity>
            </View>
        <ScrollView>
            <View style={{flex:1,alignItems:'center',paddingBottom:60,paddingTop:30}}>

            <ScrollView style={{marginBottom:20}} showsHorizontalScrollIndicator={false} snapToInterval={Dimensions.get('window').width} decelerationRate={"fast"} horizontal={true}>
                <View style={{flexDirection:'row'}}>
            {state.currentSet?.words.map((el:IWord)=>{
                return (
                    <View style={{
                        width:Dimensions.get('window').width,
                        alignItems:'center'
                    }}>
                    <AnimatedRN.View style={{
                        width:'90%',
                        height:260,
                        transform:[{
                            rotateX:rotateX.current.interpolate({
                                inputRange:[0,1],
                                outputRange:['0deg','180deg']
                            })
                        }]

                    }}>
                        <Pressable onPress={()=>{
                            setFlipped(!flipped)
                        }} style={{
                            borderRadius:10,
                            width:'100%',
                            height:'100%',
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'#ccc'
                        }}>
                            <AnimatedRN.Text style={{
                                fontFamily:"HurmeGeomBold",
                                fontSize:30,
                                color:"#666",
                                transform:[{rotateX:rotateX.current.interpolate({
                                        inputRange:[0,1],
                                        outputRange:['0deg','-180deg']
                                    })}]
                            }}>{flipped ? el.translation : el.word}</AnimatedRN.Text>
                        </Pressable>
                    </AnimatedRN.View>
                    </View>
                    )})}
                </View>
            </ScrollView>
                <View style={{width: '90%',marginTop:40}}>
                    <Text style={{
                        fontFamily:'HurmeGeomBold',
                        fontSize:35,
                        color:'#555'
                    }}>{state.currentSet?.name}</Text>
                    <Text style={{
                        fontFamily:'HurmeGeomSemiBold',
                        fontSize:18,
                        marginTop:15,
                        marginLeft:5
                    }}>
                        {state.currentSet?.words.length} words
                    </Text>
                </View>
                <View style={{width:'90%',gap:20,marginTop:10}}>
                    <Button styles={{
                        btn:{
                            gap:25,
                            alignItems:'center',
                            paddingHorizontal:15,
                        },
                        animView:{
                            width:styles.exercise.width,
                            height:styles.exercise.height
                        }
                    }} onPressFn={()=>{
                        setIsVisible(true)
                        translateY.value = withSpring(-Dimensions.get('window').height,{
                            stiffness:300,
                            velocity:4
                        })
                    }}>
                        <FontAwesomeIcon size={25}  color={'#555'} icon={fa.faSimCard}/>
                        <View style={{
                            width:'70%'
                        }}>
                            <Text style={{fontSize:20,color:'#555',fontFamily:'HurmeGeomBold'}}>Cards</Text>
                            {/*<Text style={{fontFamily:'HurmeGeom2'}} numberOfLines={1}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, repellat!</Text>*/}
                        </View>
                    </Button>
                    <Button styles={{
                        btn:{
                            gap:25,
                            alignItems:'center',
                            paddingHorizontal:15,
                        },
                        animView:{
                            width:styles.exercise.width,
                            height:styles.exercise.height
                        }
                    }}>
                        <FontAwesomeIcon size={25}  color={'#555'} icon={fa.faBarsProgress}/>
                        <View  style={{width:'70%'}}>
                            <Text style={{color:'#555',fontSize:20,fontFamily:'HurmeGeomBold'}}>Learn</Text>
                            {/*<Text style={{fontFamily:'HurmeGeom2'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, repellat!</Text>*/}
                        </View>
                    </Button>
                    <Button styles={{
                        btn:{
                            gap:25,
                            alignItems:'center',
                            paddingHorizontal:15,
                        },
                        animView:{
                            width:styles.exercise.width,
                            height:styles.exercise.height
                        }
                    }}>
                        <FontAwesomeIcon size={25} color={'#555'} icon={fa.faListCheck}/>
                        <View  style={{width:'70%'}}>
                            <Text style={{color:'#555',fontSize:20,fontFamily:'HurmeGeomBold'}}>Test</Text>
                            {/*<Text style={{fontFamily:'HurmeGeom2'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, repellat!</Text>*/}
                        </View >
                    </Button>
                    <Button onPressFn={()=>{
                        setIsVisible(true)
                        console.log('dlkfdjl')
                        matchGameTranslateY.value = withSpring(-Dimensions.get('window').height)
                    }} styles={{
                        btn:{
                            gap:25,
                            alignItems:'center',
                            paddingHorizontal:15,
                        },
                        animView:{
                            width:styles.exercise.width,
                            height:styles.exercise.height
                        }
                    }}>
                        <FontAwesomeIcon size={25} color={'#555'} icon={fa.faObjectUngroup}/>
                        <View style={{width:'70%'}}>
                            <Text style={{color:'#555',fontSize:20,fontFamily:'HurmeGeomBold'}}>Order</Text>
                            {/*<Text style={{fontFamily:'HurmeGeom2'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, repellat!</Text>*/}
                        </View>
                    </Button>
                </View>
                <View style={{width:'90%',height:80,justifyContent:'center',paddingLeft:20,paddingTop:10}}>
                    <Text style={{fontFamily:'HurmeGeomSemiBold',fontSize:20}}>Words</Text>
                </View>
                <View style={{width:'90%',gap:17}}>
                    {state.currentSet?.words.map(( word, index)=>{
                        //
                        let swipeX = useSharedValue(0)
                        let [ctx,setCtx] = useState(0)
                        let wordStyles = useAnimatedStyle(()=>{
                            return {
                                transform:[{translateX:swipeX.value}]
                            }
                        })
                        let gesture = Gesture.Pan()
                            .onBegin(e=> {
                                runOnJS(setCtx)(swipeX.value)
                            })
                            .onUpdate(e=>{
                                swipeX.value = ctx + e.translationX
                            })
                            .onEnd(e=>{
                                if(swipeX.value > -width/2){
                                    swipeX.value = withTiming(0)
                                }
                                else {
                                    swipeX.value = withTiming(-500)
                                    runOnJS(dispatch)({
                                        type:ActionTypes.REMOVE_WORD,
                                        data:word.word
                                    })

                                }
                            })
                        return (
                            // <GestureDetector gesture={gesture}>
                            <Animated.View style={[styles.word]} >
                                <Text style={{
                                    fontFamily:'HurmeGeomSemiBold',
                                    fontSize:18,
                                    color:'#333444'
                                }}>{word.word}</Text>
                                <Text style={{
                                    fontFamily:'HurmeGeomSemiBold',
                                    fontSize:18,
                                    color:'#333444'
                                }}>{word.translation}</Text>
                                {/*<Animated.View style={[{zIndex:-1,top:0,left:0,width:'100%',height:'100%',backgroundColor:'#ccc',position:'absolute'},wordStyles]}></Animated.View>*/}
                            </Animated.View>
                            // </GestureDetector>
                        )
                    })}
                </View>
            </View>
        {/*    */}
        </ScrollView>
            </>
    );
};
const styles = StyleSheet.create({
    exercise:{
        width:'100%',
        height:70,
        backgroundColor:'#ccc',
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        gap:20,
    },
    word:{
        width:'100%',
        height:90,
        backgroundColor:'#ccc',
        borderRadius:10,
        justifyContent:'space-evenly',
        paddingLeft:20,
        paddingVertical:10
    }
})
export default SetPage;