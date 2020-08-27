import React from 'react';
import {TextInput, Text, View} from 'react-native';

export const MyInput=(props)=>{
    return(
        <View style={{display:'felx',flexDirection:'row',height:40}}>
            <Text style={{fontSize:30}}>{props.text}</Text>
            <TextInput style={{width:'80%',borderWidth:1}}></TextInput>
        </View>
    )
}