import { View, Text,TouchableOpacity, } from 'react-native'
import React from 'react'
import Items from '../../../components/Items'
import Category from '../../../components/Category'
import { Stack } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
export default function Products() {
  return (
    <View>
       <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "Category",
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
            <TouchableOpacity  >
         <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
        </TouchableOpacity>
          ),
        }}
      />
     <Category/>
    </View>
  )
}