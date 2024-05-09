import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useState } from "react";
import { Stack, useGlobalSearchParams } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { db } from '../../firebase/Config';
import AdminItem from '../../components/Admin/AdminItem'

import Item from '../../components/Item'
import { doc, getDoc } from 'firebase/firestore';
export default function Products() {
  let x;
  const [item, setItem] = useState({});
  const [flag, setFlag] = useState(false);
  const { fid } = useGlobalSearchParams();
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
    <>
      {!flag ? (
        <View style={[styles.container, styles.loadingContainer]}>
          <Stack.Screen
            options={{
              title: "item 1",
              headerShown: false,
              headerStyle: { backgroundColor: "#ffb01d" },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerLeft: (props) => (
                <TouchableOpacity  >
                  <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
                </TouchableOpacity>
              ),
            }}
          />
          <ActivityIndicator size="large" color="#ffb01d" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Stack.Screen
            options={{
              title: "item 1",
              headerShown: false,
              headerStyle: { backgroundColor: "#ffb01d" },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 30,
              },
              headerLeft: (props) => (
                <TouchableOpacity  >
                  <MaterialIcons name="arrow-back-ios-new" size={24} color="white" />
                </TouchableOpacity>
              ),
            }}
          />
          {item.isAdmin ? <AdminItem id={fid} /> : <Item id={fid} />}

        </View>
      )}

    </>
  )
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
  ActivityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: '40%',
    size: 100,
  }
})