import React, {useMemo, useState} from 'react';
import {Pressable, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faLock, faPlus} from "@fortawesome/free-solid-svg-icons";
import {StatusBar} from "expo-status-bar";
import Animated, {useAnimatedStyle, useSharedValue, withSpring, withTiming} from "react-native-reanimated";
import {NavigationProp} from "@react-navigation/native";
import {ActionTypes} from "../types";
import {useDispatch} from "react-redux";
interface ISetsSelection {
    navigation:NavigationProp<any>
}
const SetsSelection = ({navigation}:ISetsSelection) => {
    let dispatch = useDispatch()
    let[query,setQuery] = useState<string>('')
    let queryAnim = useSharedValue(0)
    let queryAnimStyles = useAnimatedStyle(()=>{
        return {
            transform:[{scaleX:queryAnim.value}]
        }
    })

    const[refreshing,setRefreshing] = useState(false)
    const state = useTypedSelector(state1 => state1.mainReducer)
    // let sets = state.sets
    let sets = useMemo(()=>{
        if(!query){return state.sets}
        return state.sets.filter(set=>{
            return set.name.toLowerCase().includes(query.toLowerCase())
                || set.words.some(word=>{
                return word.word.includes(query) || word.translation.includes(query)
            }) || set.words.length.toString() == query
        //
        })
    },[query,state.sets])
    return (
        <View style={{flex:1,alignItems:'center'}}>
            <View style={{
                width:'100%',
                height:130,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <Text style={{color:'#444',fontSize:20,fontFamily:'HurmeGeomBold2'}}>Library</Text>
                <TouchableOpacity style={{position:'absolute', right:40}}><FontAwesomeIcon color={"#555"} size={22} icon={faPlus}/></TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                alignItems:'center',
                gap:20,
                paddingBottom:20
            }} style={{
                // flexGrow:1,
                height:'100%',
                width:'100%',
            }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={()=>{
                setRefreshing(true)
                setTimeout(()=>{
                    setRefreshing(false)
                },2000)
            }}/>}>
                {/*j*/}
                <View style={{width:'90%',height:50,borderBottomWidth:3,borderBottomColor:'#aaa'}}>
                    <TextInput autoCapitalize={"none"} value={query} onChangeText={text => {
                        setQuery(text)
                    }} onFocus={e=>{
                        queryAnim.value = withSpring(1)
                    }} onBlur={()=>{
                        queryAnim.value = withSpring(0)
                    }} placeholder={'Look for sets'} style={{
                        width:'100%',
                        height:'100%',
                        fontFamily:'HurmeGeom',
                        paddingLeft:10,
                        fontSize:19
                    }}/>
                    <Animated.View style={[{
                        position:'absolute',
                        width:'100%',
                        height:3,
                        top:'100%',
                        backgroundColor:'#777'
                    },queryAnimStyles]}>

                    </Animated.View>
                </View>

                {sets.length ?
                    [...sets].map(set=>{
                    return (<Pressable onPress={()=>{
                        dispatch({
                            type:ActionTypes.FETCH_SET,
                            data:set
                        })
                        navigation.navigate('SET_PAGE')
                    }} style={{
                        width:'90%',
                        borderRadius:10,
                        height:100,
                        backgroundColor:'#ccc',
                        paddingTop:15,
                        paddingLeft:15,
                        gap:10
                    }}>
                        <Text style={{fontFamily:'HurmeGeomBold',color:'#555',fontSize:20}}>{set.name}</Text>
                        <View style={{alignItems:'center',flexDirection:'row',gap:10}}>
                            <Text style={{fontFamily:'HurmeGeomSemiBold'}}>
                                {set.words.length} words
                            </Text>
                            {set.visibility == 'private' && <FontAwesomeIcon color={'#555'} icon={faLock}/>}
                        </View>
                    </Pressable>)
                })
                    :<Text style={{fontFamily:'HurmeGeomBold',fontSize:20,color:'#555',}}>There isn't such sets eblan yobaniy</Text>
                }
            </ScrollView>
        </View>
    );
};

export default SetsSelection;