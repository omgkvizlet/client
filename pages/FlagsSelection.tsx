import React from 'react';
import {ScrollView,Animated, Image, Pressable, Text, View} from "react-native";
import {ActionTypes, Langs} from "../types";
import {useFonts} from 'expo-font'
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {NavigationProp, RouteProp} from "@react-navigation/native";

interface IFlasgSelectionProps {
    navigation:NavigationProp<any>,

    route: RouteProp<any>
}

const FlagsSelection = ({navigation,route}) => {
    let dispatch = useDispatch()
    let state = useTypedSelector(state1 => state1.mainReducer)
    return (
        // <View style={{
        //     width:'100%',
        //     height:'100%',
        //     gap:10,
        //     alignItems:'center',
        //     marginTop:50
        // }}>
        <ScrollView style={{backgroundColor:'#fff',paddingTop:50}}>
            <View style={{width:'100%',alignItems:'center',gap:10}}>
            {(Object.keys(Langs).filter(lang=>{
                return lang != (route.params.id == 1 ? state.currentLang2 : state.currentLang1)
            }).map(el=>{
                return (
                    <Pressable onPress={()=>{
                        dispatch({
                            // @ts-ignore
                            type:ActionTypes["CHANGE_LANG" + route.params.id],
                            data:el
                        })
                        navigation.goBack()
                    }} style={{
                        flexDirection:'row',
                        alignItems:'center',
                        width:'90%',
                        height:70,
                        backgroundColor:'#ddd',
                        borderColor:'#ccc',
                        borderWidth:1,
                        borderRadius:10,
                        gap:30,
                        paddingLeft:20
                    }}>
                        {/*@ts-ignore*/}
                        <Image source={{uri:Langs[el]}}
                               style={{
                                   width:40,
                                   height:40,
                                   borderRadius:20
                        }}
                        />
                        <Text style={{
                            fontSize:19,
                            color:'#555',
                            //
                            fontFamily:'HurmeGeomSemiBold',
                        }}>{el}</Text>
                    </Pressable>
                )
            }))}
            </View>
        </ScrollView>
        // </View>
    );
};

export default FlagsSelection;