import { StyleSheet,Text,View,SafeAreaView,TextInput,ScrollView,Pressable,} from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons';
import Categories from "../components/Categories";
import Image from "../components/Images";
const HomeScreen =() =>{
    return(
        <SafeAreaView>
        <Image/>
       <Categories/>
        </SafeAreaView>
   
      
    )
}

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0e7490',
    },
    insearch:{
      fontSize:15,
    },
  });