import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Items from "./Items";
import DATA from "./DATA/items.json";
import {
  where,
  collection,
  query,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/Config";

export default function Category({ name }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataFromFireBase();
  }, []);

  const getDataFromFireBase = async () => {
    const q = query(collection(db, "Foods"), where("category", "==", name));
    const querySnapshot = await getDocs(q);
    const Data = querySnapshot.docs.map((doc) => doc.data());
    setList(Data);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#ffb01d" style={styles.ActivityIndicator} />
        </View>
      ) : (
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
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ActivityIndicator:{
    flex:1,
    justifyContent:'center',
    alignContent:'center',
    marginTop:'40%',
    size:100,
  }
});
