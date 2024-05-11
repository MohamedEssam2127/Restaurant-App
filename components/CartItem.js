import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../firebase/Config";
import pizza from "../assets/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
export default function CartItem({ item ,ondelete}) {
  console.log("heeeeeeeeeeeeeeeeeeeeereeeeeeeeeeeeeeee",item);
  const [counter, setcounter] = useState(item.counter);
  const [flag, setFlag] = useState(item);
  
  const increaseCounter = () => {
    setcounter(counter + 1);
  };
  const decreaseCounter = () => {
    if (counter > 1) {
      setcounter(counter - 1);
    } else if (counter === 1) {
      handleDelete();
    }
  };
  const handleDelete = async () => {
    const uid = JSON.parse( await AsyncStorage.getItem("@user")).uid;
    await deleteDoc(doc(db, `/users/${uid}/addToCart`, item.id));
  }
  useEffect(() => {
    const x = async () => {
      const uid = JSON.parse( await AsyncStorage.getItem("@user")).uid;
      const frankDocRef = doc(db, `/users/${uid}/addToCart`, item.id);
      await updateDoc(frankDocRef, {
        counter: counter
      });
    }
    x();
  }, [counter])
  return (
    <View style={styles.item}>
      <Image source={{uri:item.photo}} style={styles.image} />
      <View style={styles.subcontainer}>
        <View style={{ paddingLeft: 10, width: '50%' }}>
          <Text style={styles.ProductName}>{item.name}</Text>
          <Text style={styles.price}> price {item.price * counter}$</Text>
        </View>
        <View style={styles.messagebtn}>
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
        </View>
        <View style = {{marginLeft:"-3%", marginTop: "6%"}}>
          <TouchableOpacity onPress={ondelete}>
            <MaterialCommunityIcons name="delete" size={40} color="black" />
          </TouchableOpacity>

        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  item: {
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
    fontSize: 20,
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
    margin: 10,
    borderWidth: 1,
    borderRadius: 99,
    borderColor: "#ffb01d",
    backgroundColor: "#121312",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    gap: 20,
    padding: 10,
  },
});
