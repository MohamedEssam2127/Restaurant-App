
import AddToCart from '../../components/AddToCart'
import { View, Text,TouchableOpacity, } from 'react-native'
import React from 'react'
import Items from '../../components/Items'
import Category from '../../components/Category'
import { Stack, router, useGlobalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome5 } from '@expo/vector-icons';
export default function index() {
  return (
    <View>
       {/* <Stack.Screen
        options={{
          title: "Cart",
          headerStyle: { backgroundColor: "#ffb01d" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize:30,
          },
          headerLeft: (props) => (
            <TouchableOpacity onPress={()=>router.back()} >
        <FontAwesome name="chevron-left" size={30} color="white"style={{paddingRight:10}} />
        </TouchableOpacity>
          ),
        }}   
      /> */}


      <Tabs.Screen
     
     options={{
       title: 'Cart',
       tabBarIcon: () => <FontAwesome5 name="shopping-cart" size={24} color="#ffb01d" />,
       headerStyle: { backgroundColor: "#ffb01d" },
       headerTintColor: "#fff",
       headerTitleStyle: {
        fontWeight: "bold",
        fontSize:30,
      },
      headerTitle: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Entypo name="shopping-cart" size={24} color="white" />
          <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#fff', marginLeft: 10 }}>
            Cart
          </Text>
        </View>
      ),
      headerTitleAlign: 'center'
     }}
   />
      <AddToCart/>
    </View>
  )
}