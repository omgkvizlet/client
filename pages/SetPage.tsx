import React, {useEffect, useRef, useState} from 'react';
import {
    Animated as AnimatedRN,
    Dimensions,
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from "react-native";
import {ISet, IWord} from "../types";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons'
import {useSharedValue, withTiming} from "react-native-reanimated";
import WordCards from "../components/WordCards";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const SetPage = ({navigation,route}) => {
    const translateY = useSharedValue(0)
    const { words, name }:ISet = route.params
    let rotateX = useRef(new AnimatedRN.Value(0))
    const [flipped,setFlipped] = useState(false)
    useEffect(()=>{
        AnimatedRN.timing(rotateX.current,{
            toValue:flipped ? 1 : 0,
            duration:500,
            useNativeDriver:true
        }).start()
    },[flipped])
    return (
        <>
            <WordCards words={words} translateY={translateY}/>
            <View style={{width:'100%',height:90,justifyContent:'center',paddingLeft:30,backgroundColor:'#fff'}}>
                <TouchableOpacity onPress={()=>navigation.goBack()}><FontAwesomeIcon size={23} color={"#888"} icon={faArrowLeft}/></TouchableOpacity>
            </View>
        <ScrollView>
            <View style={{flex:1,alignItems:'center',paddingBottom:60,paddingTop:30}}>

            <ScrollView style={{marginBottom:20}} showsHorizontalScrollIndicator={false} snapToInterval={Dimensions.get('window').width} decelerationRate={"fast"} horizontal={true}>
                <View style={{flexDirection:'row'}}>
            {words.map((el:IWord)=>{
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
                    }}>{name}</Text>
                    <Text style={{
                        fontFamily:'HurmeGeomSemiBold',
                        fontSize:18,
                        marginTop:15,
                        marginLeft:5
                    }}>
                        {words.length} words
                    </Text>
                </View>
                <View style={{width:'90%',gap:10,marginTop:10}}>
                    <Pressable onPress={()=>{
                        console.log('dfkjdsl')
                        translateY.value = withTiming(-Dimensions.get('window').height)
                    }} style={styles.exercise}>
                        <FontAwesomeIcon size={25}  color={'#555'} icon={fa.faSimCard}/>
                        <View style={{
                            width:300
                        }}>
                            <Text style={{fontFamily:'HurmeGeomBold'}}>Cards</Text>
                            <Text style={{fontFamily:'HurmeGeom2'}} numberOfLines={1}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, repellat!</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.exercise}>
                        <FontAwesomeIcon size={25}  color={'#555'} icon={fa.faBarsProgress}/>
                        <View  style={{width:300}}>
                            <Text style={{fontFamily:'HurmeGeomBold'}}>Learn</Text>
                            <Text style={{fontFamily:'HurmeGeom2'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, repellat!</Text>
                        </View>
                    </Pressable>
                    <Pressable style={styles.exercise}>
                        <FontAwesomeIcon size={25} color={'#555'} icon={fa.faListCheck}/>
                        <View  style={{width:300}}>
                            <Text style={{fontFamily:'HurmeGeomBold'}}>Test</Text>
                            <Text style={{fontFamily:'HurmeGeom2'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, repellat!</Text>
                        </View >
                    </Pressable>
                    <Pressable style={styles.exercise}>
                        <FontAwesomeIcon size={25} color={'#555'} icon={fa.faObjectUngroup}/>
                        <View style={{width:300}}>
                            <Text style={{fontFamily:'HurmeGeomBold'}}>Order</Text>
                            <Text style={{fontFamily:'HurmeGeom2'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore, repellat!</Text>
                        </View>
                    </Pressable>
                </View>
                <View style={{width:'90%',height:80,justifyContent:'center',paddingLeft:20,paddingTop:10}}>
                    <Text style={{fontFamily:'HurmeGeomSemiBold',fontSize:20}}>Words</Text>
                </View>
                <View style={{width:'90%',gap:17}}>
                    {words.map(word=>{
                        return (
                            <Pressable style={styles.word} >
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
                            </Pressable>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
            </>
    );
};
const styles = StyleSheet.create({
    exercise:{
        width:'100%',
        height:80,
        backgroundColor:'#ccc',
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        gap:20
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