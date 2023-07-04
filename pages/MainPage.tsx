import React, { useEffect, useRef, useState } from 'react';
import {
    Animated as AnimatedRN, Dimensions,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import NavBar from "../components/NavBar";
import * as Speech from 'expo-speech'
import { useTypedSelector } from "../hooks/useTypedSelector";
import {ActionTypes, IWord, Langs, Languages} from "../types";
import Animated, {useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faToiletPaper, faXmark, faArrowRight, faVolumeUp, faSquare, faLock } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { StackNavigationConfig } from "@react-navigation/stack/lib/typescript/src/types";
const MainPage = ({ navigation }) => {
    let hren = useRef<TextInput>()
    const[spoken,setSpoken] = useState(false)
    let dispatch = useDispatch()
    const[translation,setTranslation] = useState<Partial<IWord>>({
        translation:'',
        sex:null,
        partOfLanguage:null
    })
    let {current:rotateZ} = useRef(new AnimatedRN.Value(0))
    const [text,setText] = useState<string>('')
    let translate = useRef(new AnimatedRN.ValueXY({
        x:0,
        y:0
    })).current

    let[focused,setFocused] = useState(false)
    const state = useTypedSelector(state1 => state1.mainReducer)
    useEffect(()=>{
        AnimatedRN.spring(
            rotateZ,
            {
                toValue:focused ? 1 : 0,
                bounciness:20,
                speed:5,
                useNativeDriver:true
            }
        ).start()
    },[focused])
    useEffect(()=>{
        !Speech.isSpeakingAsync() && setSpoken(false)
        console.log('hueifhdskjfhdskjfh')
    },[Speech.isSpeakingAsync()])
    const y = useSharedValue(0)
    let scrollerHandler = useAnimatedScrollHandler({
        onScroll:({contentOffset})=>{
            y.value = contentOffset.y
        }
    })
    //
    useEffect(()=>{
        // @ts-ignore
        spoken ? Speech.speak(translation.translation,{
            language:state.currentLang2
        }) : Speech.stop()
    },[spoken])
    return (
       <>
           <NavBar y={y}/>
           <Animated.ScrollView scrollEventThrottle={16} onScroll={scrollerHandler}>
               {/**/}
               <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingTop:140}}>
               <View style={{
                   width:'90%',
                   backgroundColor:'#ddd',
                   flexDirection:'row',
                   height:70,
                   borderRadius:10,
                   alignItems:'center',
                   // paddingHorizontal:15,
                   justifyContent:'space-around'
               }}>
                   <Pressable onPress={()=>{
                      navigation.navigate('FS',{id:1})
                   }} style={{

                       width:150,
                       height:'100%',
                       borderRightColor:'#ccc',
                       borderRightWidth:2,

                       flexDirection:'row',
                       alignItems:'center',
                       justifyContent:'center',
                       gap:11
                   }}>
                       <Image style={{
                           width:40,
                           height:40,
                           borderRadius:'50%'

                       }} source={{
                           // @ts-ignore
                           uri:Langs[state.currentLang1],
                       }}/>
                       <Text style={{
                           textAlign:'center',
                           fontSize:17,
                           fontFamily:'HurmeGeomSemiBold'
                       }}>{state.currentLang1}</Text>

                   </Pressable>
                   <AnimatedRN.View onTouchStart={()=>{
                       dispatch({
                           type:ActionTypes.SWITCH_LANGS,
                       })
                       setFocused(!focused)
                   }} style={{
                       justifyContent:'center',
                       alignItems:'center',
                       transform:[
                           {
                               rotateZ:rotateZ.interpolate({
                                   inputRange:[0,1],
                                   outputRange:['0deg','180deg']
                               })
                           }
                       ]
                   }}>
                       <FontAwesomeIcon size={27} color={'#666'} icon={faToiletPaper}/>
                   </AnimatedRN.View>
                   <Pressable onPress={()=>{
                       navigation.navigate('FS',{id:2})
                   }} style={{
                       borderLeftColor:'#ccc',
                       borderLeftWidth:2,
                       height:'100%',
                       width:150,
                       flexDirection:'row-reverse',
                       alignItems:'center',
                       justifyContent:'center',
                       gap:11

                   }}>
                       <Image style={{
                           width:40,
                           height:40,
                           borderRadius:'50%'
                       }} source={{
                           // @ts-ignore
                           uri:Langs[state.currentLang2],
                       }}/>
                       <Text style={{
                           fontSize:17,
                           textAlign:'center',
                           fontFamily:'HurmeGeomSemiBold'
                       }}>{state.currentLang2}</Text>
                   </Pressable>
               </View>
                   <View style={{
                       marginTop:20,
                       paddingTop:10,
                       width:'90%',

                       borderRadius:5,
                       height:200,
                       borderWidth:3,
                       borderColor:'#ccc'
                   }}>
                       <TouchableOpacity onPress={()=>{
                           console.log('dfjkghdfkjgdfhkj')
                           setText('')
                       }} style={{
                           position:'absolute',
                           right:20,
                           zIndex:1,
                           top:20
                       }}><FontAwesomeIcon size={20} color={'#aaa'} icon={faXmark}/></TouchableOpacity>
                       <TouchableOpacity onPress={()=>{
                           setTranslation({
                               translation:text,
                           })
                       }} style={{
                           position:'absolute',
                           bottom:20,
                           zIndex:1,
                           right:20
                       }}><FontAwesomeIcon size={20} color={'#aaa'} icon={faArrowRight}/></TouchableOpacity>
                       <TextInput onChangeText={text=>{
                           setText(text)
                       }} ref={hren} onBlur={()=>{
                           text.length ===0 && AnimatedRN.spring(translate,{
                               toValue:{
                                   x:0,
                                   y:0
                               },
                               useNativeDriver:true
                           }).start()
                       }} onFocus={()=>{
                           AnimatedRN.spring(translate,{
                               toValue:{
                                   x:-10,
                                   y:-30
                               },
                               useNativeDriver:true
                           }).start()
                       }} multiline={true} style={{
                           width:'100%',
                           height:'100%',
                           paddingRight:40,
                           paddingLeft:20,
                           // paddingBottom:20,
                           fontFamily:'HurmeGeom2',
                           fontSize:20
                       }}/>
                       <AnimatedRN.View style={{
                           position:'absolute',
                           zIndex:1,
                           top:20,
                           backgroundColor:'#f2f2f2',
                           transform:[{
                               translateY:translate.y,
                           },
                               {
                                   translateX:translate.x
                               },
                               {
                                   scale:translate.x.interpolate(
                                       {
                                           inputRange:[-10,0],
                                           outputRange:[0.85,1]
                                       }
                                   )
                               }
                           ],
                           left:20
                       }}>

                           <Text style={{
                               color:'#aaa',
                               fontSize:20,
                               fontFamily:'HurmeGeomSemiBold'
                           }}>Enter smth</Text>
                       </AnimatedRN.View>
                       <AnimatedRN.View style={{
                           transform:[{
                               scaleX:translate.x.interpolate({
                                   inputRange:[-10,0],
                                   outputRange:[1,0]
                               })
                           }],
                           height:10,
                           width:100,
                           position:'absolute',
                           top:-5,
                           left:10,
                           backgroundColor:'#f2f2f2'
                       }}>
                       </AnimatedRN.View>
                   </View>
                   <View style={{
                       marginTop:20,
                       width:'90%',
                       minHeight:170,
                       borderRadius:5,
                       backgroundColor:'#ccc'
                   }}>
                       <Text style={{
                           marginTop:20,
                           marginLeft:20,
                           fontSize:15,
                           textTransform:'uppercase',
                           fontFamily:'HurmeGeom3'
                       }}>{state.currentLang2}
                       </Text>
                       <View style={{
                           marginHorizontal:30,
                           marginBottom:60,
                           marginTop:15
                       }}>
                           <Text style={{
                               fontFamily:'HurmeGeomBold',
                               fontSize:19,
                               color:"#555"
                           }}>{translation.translation}</Text>
                       </View>
                       <TouchableOpacity onPress={()=>{
                           setSpoken(!spoken)
                       }} style={{position:'absolute', bottom:20,left:20}}>
                           <FontAwesomeIcon color={"#555"} size={20} icon={!spoken ? faVolumeUp : faSquare}/>
                       </TouchableOpacity>
                       <View style={{
                           position:'absolute',
                           bottom:15,
                           right:15,
                           alignItems:'center',
                           flexDirection:'row-reverse',
                           gap:7.5,
                       }}>
                      <View style={{
                          width:33,
                          height:33,
                          borderRadius:5,
                          backgroundColor:'#aaa',
                          justifyContent:'center',
                          alignItems:'center'
                      }}>
                           <Text style={{
                               fontFamily:'HurmeGeomItalicBold2',
                               fontSize:20,
                               color:"#555"
                           }}>f</Text>
                       </View>
                           <View style={{
                               backgroundColor:'#aaa',
                               borderRadius:5,
                               justifyContent:'center',
                               alignItems:'center',
                               paddingHorizontal:8,
                               paddingVertical:4,
                           }}>
                               <Text style={{
                                   color:'#555',
                                   fontFamily:'HurmeGeomItalicSemiBold2'
                               }}>noun</Text>
                           </View>
                       </View>


                   </View>
                   <View style={{
                       width:'90%',
                       height:60,
                       justifyContent:'center',
                       paddingLeft:10,
                   }}>
                       <Text style={{
                           fontSize:17,
                           color:'#555',
                           fontFamily:'HurmeGeomSemiBold'
                       }}>Last sets</Text>
                   </View>
                   <ScrollView snapToInterval={330} decelerationRate={"fast"} horizontal style={{paddingBottom:50}}>
                       <View style={{
                           height:150,
                           paddingHorizontal:20,
                           flexDirection:'row',
                           gap:10,
                       }}>
                           {/**/}
                           {state.sets.map(set=>{
                               return <Pressable onPress={()=>{
                                   navigation.navigate('SET_PAGE',{
                                       ...set
                                   })
                               }} style={{
                                   borderRadius:10,
                                   width:320,
                                   height:'100%',
                                   backgroundColor:'#bbb',
                                   borderWidth:2,
                                   borderColor:'#888',
                               }}>
                                   <Text style={{
                                       fontFamily:'HurmeGeomSemiBold',
                                       color:'#444',
                                       marginTop:20,
                                       marginLeft:20,
                                       fontSize:20
                                   }}>{set.name}</Text>
                                   <View style={{
                                       marginTop:15,
                                       marginLeft:20,
                                       flexDirection:'row',
                                       alignItems:'center',
                                       gap:10
                                   }}>
                                      <View style={{
                                          backgroundColor:'#999',
                                          borderRadius:15,
                                          paddingHorizontal:12,
                                          paddingVertical:5,
                                      }}>
                                          <Text style={{
                                              fontFamily:'HurmeGeomBold',
                                              color:"#444"
                                          }}>
                                          {set.words.length} words
                                          </Text>
                                      </View>
                                       {set.visibility==="private" && <FontAwesomeIcon color={'#444'} s icon={faLock}/> }
                                   </View>
                               </Pressable>
                           })}
                       </View>
                   </ScrollView>
               </View>
           </Animated.ScrollView>
       </>
    );
};

export default MainPage;