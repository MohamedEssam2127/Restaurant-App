import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { db } from "../firebase/Config";
import pizza from "../assets/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg";
import { deleteDoc, doc,updateDoc } from "firebase/firestore";
export default function CartItem({item}) {
    const [counter, setcounter] = useState(item.counter);
    const [flag,setFlag]=useState(item);
    const frankDocRef = doc(db, "At_ToCart", item.id);
    const increaseCounter =  () => {
      setcounter(counter + 1);
    };
    const decreaseCounter = () => {
      if (counter >1) {
        setcounter(counter - 1);
      }else if(counter ===1){
        handleDelete();
      }
    };
    const handleDelete = async()=>{
      await deleteDoc(doc(db, "At_ToCart",item.id ));
      
    }
    useEffect(()=>{
      const x = async()=>{
        await updateDoc(frankDocRef, {
          counter:counter
      });
      }
      x();
    },[counter])
  return (
    <View style={styles.item}>
        <Image source={pizza} style={styles.image} />
        <View style={styles.subcontainer}>
          <View style={{ paddingLeft: 10,width:'50%' }}>
            <Text style={styles.ProductName}>{item.name}</Text>
            <Text style={styles.price}> price {item.price *counter}$</Text>
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
            <TouchableOpacity onPress={handleDelete}>
            <MaterialCommunityIcons name="delete" size={40} color="black"  />
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
  