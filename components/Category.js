import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Items from "./Items";
// import pizza from "../assets/images/Pizza-icon.png";
// import fries from "../assets/images/images.png";
export default function Category({name}) {
  const [render,setrender]= useState([]);
  const [list, setList] = useState([
    {
      title: "pizza Margarita",
      price: 100,
      type: "Go Back to where it all began with the classic cheese and tomato base",
      Category:"Pizza",
      id:1,
    },
    {
      title: " Burger 1",
      price: 50,
      Category:"Burger",
      type: "Crispy, oven baked potato wedges",
      // image: fries,
      id:2,
    },
    {
      title: "pizza Pepperoni",
      price: 140,
      Category:"Pizza",
      type: "One of our all time specialties. A meaty feast of Pepperoni, Mushroom, Black Olives, mozzarella cheese and tomato sauce",
     // image: pizza,
      id:3,
    },
  ]);
  // const filteredArray = list.filter(item => item.Category === name);
  // setrender(filteredArray);
  return (
    <>
      <FlatList
        data={list}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Items item={item} />
            </View>
          );
        }}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});
