import React, {SetStateAction, useEffect, useState} from 'react'
import {RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {useActions} from "../hooks/useActions";
import Button from "../components/UI/Button";
import {SharedValue} from "react-native-reanimated/lib/types/lib";
import {NavigationProp} from "@react-navigation/native";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {LoadingStatuses} from "../types";
import storage from "redux-persist/lib/storage";
import {registration} from "../store/actions";
import Svg from "react-native-svg";
import AnimatedStroke from "../components/AnimatedStroke";

export interface IFormData {
    username:string,

    password:string
}
export interface IInput{
    state:[string,React.Dispatch<SetStateAction<string>>],

    placeholder:string,

    translateX:SharedValue<number>
}
interface IFormProps{
    navigation:NavigationProp<any>
}
const setItem = async(key:string,value:string)=>{
    return await storage.setItem(key,value)
}
const getItem = async (key:string) => {
    return await storage.getItem(key)
}
const Form = ({navigation}:IFormProps) => {
    useEffect(()=>{
        setItem('root','hren').then(res=> console.log(res))
        //
        getItem('root').then(res=>console.log(res))
    },[])
    const paths = [
        'm230.38 675.35v-98.41h-102.9c-39.828 0-72.254-34.488-72.254-76.871v-221.91c0-42.395 32.41-76.895 72.254-76.895h460.14c39.828 0 72.227 34.5 72.227 76.895v221.9c0 42.383-32.398 76.871-72.227 76.871v53.953c69.562 0 126.17-58.691 126.17-130.82v-221.9c0-72.133-56.594-130.84-126.17-130.84h-460.14c-69.59 0-126.19 58.703-126.19 130.84v221.9c0 72.133 56.605 130.82 126.19 130.82h48.961v95.617c0 14.676 9.4688 27.984 23.555 33.168 4.0078 1.4766 8.125 2.207 12.168 2.207 9.8516 0 19.309-4.2461 25.98-12.121l100.43-118.86h100.23v-53.953l-125.27 0.003907z',
        'm1072.5 438.12h-311.52v53.953h311.52c39.828 0 72.254 34.5 72.254 76.895v221.87c0 42.395-32.41 76.895-72.254 76.895h-102.89v98.461l-83.172-98.438-274.09 0.003906c-39.816 0-72.227-34.5-72.227-76.895v-221.89c0-42.395 32.41-76.895 72.227-76.895v-53.953c-69.562 0-126.18 58.703-126.18 130.84v221.89c0 72.168 56.605 130.85 126.18 130.85h249.05l100.46 118.92c6.6602 7.8242 16.105 12.047 25.934 12.047 4.043 0 8.1602-0.70703 12.168-2.1836 14.113-5.1836 23.605-18.516 23.605-33.215v-95.582h48.938c69.59 0 126.19-58.691 126.19-130.85l-0.003906-221.87c0-72.145-56.602-130.85-126.19-130.85z',
        'm318.38 236.57-95.426 251.41h55.98l19.727-55.98h94.008l19.008 55.98h57.383l-94.004-251.41zm-5.2656 154.24 32.746-92.258h0.69531l31.691 92.258z',
        'm721.44 736.69c0 27.562 17.617 45.445 46.344 45.445 34.512-0.73047 68.652-22.645 79.766-32.531 11.113-9.9102 41.039-44.316 54.254-71.555 16.715 7.8945 24.637 21.121 24.637 35.762 0 31.668-30.504 50.039-79.188 55.621l23.617 32.699c76.246-9.9844 102.19-42 102.19-88.895 0-39.613-24.926-63.66-56.879-74.195 0.58984-2.9023 1.6562-5.9414 2.2578-8.8789l-43.332-7.7148c-0.28906 4.3789-1.1641 5.1836-2.0156 9.5742-15.562-0.88672-32.855 1.4531-38.426 2.6289 0-7.9219 0.28906-29.051 0.58984-36.66 36.07-1.4648 71.543-4.3789 104.39-9.3711l-3.8164-42.793c-33.719 6.7422-66.277 10.273-98.23 12.035 0.86328-8.5195 2.0625-32.605 2.0625-32.605l-45.758-3.4922c-0.60156 11.734-0.86328 25.523-1.4531 37.535-20.258 0.28906-44.27 0.28906-56.902 0l2.0508 41.352h4.9688c12.035 0 31.691-0.61328 49.309-1.1875 0 11.426 0.27734 36.059 0.57422 47.207-41.383 17.266-71.008 49.258-71.008 90.02zm137.83-66.289c-6.168 12.301-13.488 23.484-21.695 32.832-1.1992-9.6836-1.7773-19.645-2.3516-30.191 3.2148-0.57422 16.113-2.6406 24.047-2.6406zm-64.527 17.02c1.4766 16.43 3.2383 32.258 5.8672 46.621-7.6094 3.8164-14.93 6.168-21.707 6.4688-14.676 0.58984-14.676-8.7852-14.676-12.91 0.011719-15.57 12.039-29.91 30.516-40.18z'
    ]
    let { loginActionCreator } = useActions()
    let [formData, setFormData] = useState<IFormData>({
        username:'',
        password:''
    })
    let fromTranslateX = useSharedValue(0)
    let animFormStyles = useAnimatedStyle(()=>{
        return {
            transform:[{translateX:fromTranslateX.value}]
        }
    })
    let logoAnimStyles = useAnimatedStyle(()=>{
        return {
            transform:[
                {
                    translateY:interpolate(
                        fromTranslateX.value,
                        [-500,0],
                        [200,0]
                    )
                }
            ]
        }
    })
    const state = useTypedSelector(state1 => state1.authReducer)
    let strokeDash = useSharedValue(1)
    const scale = useSharedValue(0)
    let iconAnimStyles = useAnimatedStyle(()=>{
        return {
            transform:[{scale: scale.value}]
        }
    })
    useEffect(()=>{
        //
        if(state.status === LoadingStatuses.ERROR){
            fromTranslateX.value = 0
        }
        if(state.status === LoadingStatuses.LOADING){
            fromTranslateX.value = withSpring(-500)
            strokeDash.value = withRepeat(
                withTiming(0,
                    {duration:3000}),
                -1,
                true
            )
        }

    },[state.status])
    // a
    let inputs:IInput[] = [
        {
            state:useState(''),
            placeholder:'Enter username',
            translateX:useSharedValue(10)
        },
        {
            state:useState(''),
            placeholder:'Enter password',
            translateX:useSharedValue(10)
        }
    ]
    const[refreshing,setRefreshing] = useState<boolean>()
    useEffect(()=>{
        scale.value = withSpring(1)
    },[])
    return (

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{
                setRefreshing(true)
                setTimeout(()=>{
                    setRefreshing(false)
                },2000)
            }}/>} bouncesZoom={false} contentContainerStyle={{
                height:'100%',
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#f2f2f2'
            }}>
                <View style={{gap:20,width:'85%',height:'70%',alignItems:'center'}}>
                <Animated.View onTouchStart={()=>{
                    inputs[0].state[1]('andriy_hrinenko@gmail.com')
                    inputs[1].state[1]('andriy_hrin')

                }} style={[{
                    width:'90%',
                    height:150,
                    alignItems:'center',
                },iconAnimStyles,logoAnimStyles]}>
                    <Svg width="180" height="180" viewBox="0 0 1200 1200">
                        {paths.map(path=>{
                            return <AnimatedStroke fill={state.status != LoadingStatuses.LOADING ? '#555' : 'none'} strokeDashValue={strokeDash} stroke={'#555'} d={path}/>
                        })}
                    </Svg>
                    {/*<FontAwesomeIcon color={'#555'} size={160} icon={faLanguage}/>*/}
                </Animated.View>
            <Animated.View style={[{
                width:'100%',
                height:'100%',
                gap:30,
                alignItems:'center',
            },animFormStyles]}>


                <Animated.View style={{alignItems:'center',gap:15}}>
                <Text style={{fontSize:25,color:'#999',fontFamily:'HurmeGeomSemiBold'}}>Welcome back</Text>
                <Text style={{fontSize:30,color:'#555',fontFamily:'HurmeGeomSemiBold'}}>Log in</Text>
                </Animated.View>
                <Animated.View style={{width:'100%',gap:40}}>
                {inputs.map(input=>{
                    let shakeInputStyles = useAnimatedStyle(()=>{
                        return {
                            transform:[{
                                translateX:input.translateX.value
                            }]
                        }
                    })

                    let translateX = useSharedValue(0)
                    let translateY = useSharedValue(0)
                    let placeholderAnimStyles = useAnimatedStyle(()=>{
                        return {
                            transform:[
                                {
                                    translateX:translateX.value
                                },
                                {
                                    translateY:translateY.value
                                },
                                {
                                    scale:interpolate(
                                        translateY.value,
                                        [0,-30],
                                        [1,0.9]
                                    )
                                }
                            ],
                            paddingHorizontal:interpolate(
                                translateY.value,
                                [0,-30],
                                [0,7]
                            )
                        }
                    })
                    let errorTranslateY = useSharedValue(0)
                    let errorAnimStyles = useAnimatedStyle(()=>{
                        return {
                            transform:[
                                {
                                    translateY:errorTranslateY.value
                                }
                            ]
                        }
                    })
                    //
                    let[ errorMsg,setErrorMsg ] = useState('')
                    //
                    return <Animated.View style={[{
                        width:'100%',
                        height:70,
                        borderWidth:2,
                        borderColor:'#aaa',
                        borderRadius:10,
                        justifyContent:'center'
                    },shakeInputStyles]}>
                        <Animated.View style={[{
                            width:'100%',
                            height:'100%',
                            position:'absolute',
                            justifyContent:'flex-end',
                            alignItems:'center',
                            zIndex:-1,
                        },errorAnimStyles]}>
                            <Text style={{
                                color:'#aa0000',
                                fontFamily:'HurmeGeomSemiBold'
                            }}>
                                {errorMsg}
                            </Text>

                        </Animated.View>
                        <TextInput autoCapitalize={"none"}
                            onFocus={()=>{
                               translateY.value = withSpring(-34)
                               translateX.value = withSpring(-15)
                            }}
                            style={{
                                width:'100%',
                                height:'100%',
                                paddingLeft:20,
                                fontFamily:'HurmeGeom',
                                //
                                fontSize:19,
                                borderRadius:10,
                                backgroundColor:'#f2f2f2',
                            }}
                            onBlur={() => {
                                if(input.state[0].length == 0) {
                                    translateY.value = withSpring(0)
                                    translateX.value = withSpring(0)
                                }

                            }}
                            value={input.state[0]} onChangeText={text => {
                                if(input.placeholder.includes('username')) {
                                    if(/\s+/g.test(text)) {
                                        errorTranslateY.value = withTiming(20)
                                        setErrorMsg('Username can\'t contain spaces')

                                    }
                                    if(text.length > 8) {
                                        errorTranslateY.value = withTiming(20)
                                    }
                                    else {
                                        errorTranslateY.value = withTiming(0)
                                    }
                                }
                                else {

                                }

                            input.state[1](text)
                        }}/>
                       <Animated.View pointerEvents={"none"} style={[{
                           position:'absolute',
                           left:25,
                           backgroundColor:'#f2f2f2',
                       },placeholderAnimStyles]}>
                           <Text style={{
                               color:'#999',
                               fontFamily:'HurmeGeomSemiBold',
                               fontSize:19,
                           }}>{input.placeholder}</Text>
                       </Animated.View>
                    </Animated.View>
                })}
                </Animated.View>
                <Animated.View style={{paddingRight:0,width:'100%',alignItems:'flex-end'}}>
                <Text style={{color:'#555',fontFamily:'HurmeGeomSemiBold',fontSize:17,}}>
                    Reset password
                </Text>
                </Animated.View>
                <Animated.View style={{width:'100%',height:60}}><Button styles={{
                    animView:{
                        // @ts-ignore
                        width:'100%',
                        height:'100%'
                    },
                    btn:{
                        // @ts-ignore
                        justifyContent:'center',
                        alignItems:'center'
                    }
                }} onPressFn={()=>{

                    loginActionCreator({
                        username:inputs[0].state[0],
                        password:inputs[1].state[0]
                    },navigation)
                }}>
                    <Text style={{fontSize:20, fontFamily:'HurmeGeomBold', color:'#555'}}>Login</Text></Button>
                </Animated.View>
                <TouchableOpacity onPress={()=>{
                    registration({
                        username:inputs[0].state[0],
                        password:inputs[1].state[0]
                    })
                    // navigation.navigate('REGISTRATION')
                }} style={{
                    width:'100%',
                    alignItems:'flex-end',
                    height:30,
                    justifyContent:'center'
                }}>
                    <Text style={{
                        fontFamily:'HurmeGeomSemiBold',
                        fontSize:17,
                        color:'#555'
                    }}>Create a new account</Text>
                </TouchableOpacity>
                </Animated.View>

                </View>
            {/**/}
            </ScrollView>

    )
}
export default Form