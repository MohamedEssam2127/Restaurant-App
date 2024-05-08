import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import pizza from "../assets/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg";
export default function CartItem() {

    const [counter, setcounter] = useState(1);
    const increaseCounter = () => {
      setcounter(counter + 1);
    };
    const decreaseCounter = () => {
      if (counter > 1) {
        setcounter(counter - 1);
      }
    };
  return (
    <View style={styles.item}>
        <Image source={pizza} style={styles.image} />
        <View style={styles.subcontainer}>
          <View style={{ paddingLeft: 10 }}>
            <Text style={styles.ProductName}>Product 1</Text>
            <Text style={styles.price}> price 100$</Text>
          </View>
          <View style={styles.messagebtn}>
            <TouchableOpacity onPress={increaseCounter}>
              <Entypo name="circle-with-plus" size={24} color="#ffb01d" />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: "center",
                color: "#ffb01d",
                fontSize: 18,
                fontWeight: "800",
              }}
            >
              {counter}
            </Text>
            <TouchableOpacity onPress={decreaseCounter}>
              <AntDesign name="minuscircle" size={24} color="#ffb01d" />
            </TouchableOpacity>
          </View>
          <View style={{marginTop:50}}>
          <MaterialCommunityIcons name="delete" size={40} color="black"  />
        </View>
          </View>
         
      </View>
  )
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
  