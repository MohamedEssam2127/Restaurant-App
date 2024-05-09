import { View, Text,TouchableOpacity, } from 'react-native'
import React from 'react'
import { Stack, useGlobalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import Item from '../../../components/Item'
export default function Products() {
  const { fid } = useGlobalSearchParams();
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
     <Item id={fid}/>
    </View>
  )
}