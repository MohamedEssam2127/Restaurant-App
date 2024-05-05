import { View, Text,TouchableOpacity, } from 'react-native'
import React from 'react'
import Items from '../../../components/Items'
import Category from '../../../components/Category'
import { Stack, router, useGlobalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
export default function Products() {
  const { name } = useGlobalSearchParams();
  console.log("xxxxxxx",name);
  return (
    <View>
       <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: name,
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "#ffb01d" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize:30,
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          // headerTitle: props => <LogoTitle {...props} />,
          headerLeft: (props) => (
            <TouchableOpacity onPress={()=>router.back()} >
        <FontAwesome name="chevron-left" size={30} color="white"style={{paddingRight:10}} />
        </TouchableOpacity>
          ),
        }}
      />
     <Category/>
    </View>
  )
}