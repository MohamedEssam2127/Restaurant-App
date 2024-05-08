import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import pizza from "../assets/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg";
import CartItem from "./CartItem";
export default function AddToCart() {
  const list =[1,2]
  return (
    <View style={styles.container}>
          <FlatList
          data={list}
          renderItem={({ item }) => {
            return (
              <View style={styles.container}>
                <CartItem/>
              </View>
            );
          }}
        />
    
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
});
