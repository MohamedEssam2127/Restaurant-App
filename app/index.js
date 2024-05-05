import { View, Text } from 'react-native'
import React from 'react'
import Item from '../components/Item'
import Category from '../components/Category'
export default function index() {
  return (
    <View style={{flex:1}}>
      <Category/>
    </View>
  )
}