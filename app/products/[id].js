import { View, Text,TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from "react";
import { Stack, useGlobalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from '../../firebase/Config';
import Category from '../../components/Category';

import Item from '../../components/Item'
import { doc, getDoc } from 'firebase/firestore';
export default function Products() {
  let x ; 
  const [item,setItem]= useState({});
  const { fid } = useGlobalSearchParams();
  const getUser = async ()=>{
 const uid = JSON.parse( await AsyncStorage.getItem("@user")).uid;
x=uid;
fetItem();
} 

const fetItem=async()=>{
  console.log("ffff",docRef);
  const docRef = doc(db, "users", x);
 
  try {
    const doc = await getDoc(docRef);
    const data = doc.data();
    setItem(data);
    console.log("done")
    console.log(item.phone)
  } catch (e) {
    console.log("Error getting cached document:", e);
  }
}
useEffect(()=>{
getUser();
},[])
if(item.isAdmin){

}
  return (
    <View style= {{flex:1}}>
       <Stack.Screen
        options={{
          title: "item 1",
          headerShown: false ,
          headerStyle: { backgroundColor: "#ffb01d" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize:30,
          },
          headerLeft: (props) => (
            <TouchableOpacity  >
         <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
        </TouchableOpacity>
          ),
        }}
      />
      {item.isAdmin ? <Category />: <Item id={fid}/> }
     
    </View>
  )
}