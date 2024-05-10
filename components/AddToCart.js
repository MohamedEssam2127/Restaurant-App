import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import pizza from "../assets/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg";

import AsyncStorage from "@react-native-async-storage/async-storage";
import CartItem from "./CartItem";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/Config";
export default function AddToCart() {
  const list =[1,2];
  const [Total,setTotal]= useState(1);
  const [cartItems ,setCartItems]= useState([]);
  
  // const getCartItem =async()=>{
  //   const uid = JSON.parse( await AsyncStorage.getItem("@user")).uid;
  //   const querySnapshot = await getDocs(collection(db, `/users/${uid}/addToCart`));
  //   const Data = querySnapshot.docs.map((doc) => doc.data());
  //   setCartItems(Data);
  // }
  const delete2 =  async( foodId)=>{
    const product = cartItems.find(({id})=> id === foodId);
    const newCart = cartItems.filter(u=>u.id!==foodId); 
    setCartItems(newCart);
    const uid = JSON.parse( await AsyncStorage.getItem("@user")).uid;
    await deleteDoc(doc(db, `/users/${uid}/addToCart`, foodId));

  }



  useEffect( async ()=>{
    // getCartItem();
    const uid = JSON.parse( await AsyncStorage.getItem("@user")).uid;
    const querySnapshot = await getDocs(collection(db, `/users/${uid}/addToCart`));
    const Data = querySnapshot.docs.map((doc) => doc.data());
    setCartItems(Data);
  },[])
  useEffect (() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price*item.counter, 0);
    setTotal(newTotal);
  }, [cartItems]);
  return (
    <View style={styles.container}>
      <View style={{height:'86%'}}>
      <FlatList
          data={cartItems}
          renderItem={({ item }) => {
            return (
              <View >
                <CartItem item={item} ondelete ={()=>delete2(item.id)}/>
              </View>
            );
          }}
        />
      </View>
        
        <View>
        <Text style={styles.Total}> total {Total}$</Text>
        <TouchableOpacity style={styles.Bookbtn}   >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 20,
              fontWeight:'800'
            }}
          >
           Buy
          </Text>
        </TouchableOpacity>
        </View>
 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop:100,
    //   flex:1,
  },
  item: {
    //display:'flex',
    paddingBottom: 26,
    margin: 10,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: "#ffb01d",
  },
  subcontainer: {
    paddingTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ProductName: {
    fontSize: 30,
    fontWeight: "700",
  },
  price: {
    color: "#808080",
    fontWeight: "600",
    fontSize: 24,
    paddingTop: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 6,
  },
  messagebtn: {
   margin:10,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: "#ffb01d",
    backgroundColor: "#121312",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
    gap:20,
    padding:10,
  },
  Total:{
    fontSize:30,
    fontWeight:'600',

  },
  Bookbtn: {
    padding: 15,
    marginTop:6,
    backgroundColor: "#ffb01d",
    borderWidth: 1,
    borderRadius: 99,
    borderColor: "#ffb01d",
    marginBottom: -25
  },
});
