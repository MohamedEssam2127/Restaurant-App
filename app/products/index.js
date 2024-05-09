import { View, Text,TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Items from '../../components/Items'
import Category from '../../components/Category'
import { Stack, router, useGlobalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from '../../firebase/Config';
import { doc, getDoc } from 'firebase/firestore';
import AddItem from '../../components/AddItem';

export default function Products() {
  const { name } = useGlobalSearchParams();
  let x;
  const [item, setItem] = useState({});
  const getUser = async () => {
    const uid = JSON.parse(await AsyncStorage.getItem("@user")).uid;
    x = uid;
    fetItem();
  }

  const fetItem = async () => {
    const docRef = doc(db, "users", x);

    try {
      const doc = await getDoc(docRef);
      const data = doc.data();
      setItem(data);
      setFlag(true);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  }
  useEffect(() => {
    getUser();
  }, [])
  return (
    <View>
      <Stack.Screen
        options={{
          title: name,
          headerStyle: { backgroundColor: "#ffb01d" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize:30,
          },
          headerLeft: (props) => (
            <TouchableOpacity onPress={()=>router.navigate("/home")} >
        <FontAwesome name="chevron-left" size={30} color="white"style={{paddingRight:10}} />
        </TouchableOpacity>
          ),
          headerRight:()=>(
            <>
            
            {!item.isAdmin?( <View style={{right:'45%'}} >
    <AddItem Category={name}/>
            </View>):( <></>)}
          
            </>
          )
        }}
      />
      <Category name={name}/>
    </View>
  )
}