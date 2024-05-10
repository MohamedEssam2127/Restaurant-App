import React, { useState,useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, TextInput } from "react-native";
import { router } from "expo-router";
import pizza from '../assets/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg';
import Pasta from '../assets/images/images.jpg';
import { FontAwesome6 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/Config";
export default function Items({ item ,Dl2}) {
  const [isHovered, setIsHovered] = useState(false);
  const [addCardHovered, setaddCardHovered] = useState(false);
  let x;
  const [user, setUser] = useState({});
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
      setUser(data);
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
  }

  
  useEffect(() => {
    getUser();
  }, [])

  const searchItems = (searchFor) => {
    console.log('searchFor', searchFor);
    setItems(DATA.filter((item) => item.text.includes(searchFor)));
  };

  const handleDeleting = async ()=>{
    try {
      await deleteDoc(doc(db, "Foods", item.id));
      Alert.alert("Food Deleted",item.id)
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }


  return (
    <>

      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `products/${item.id}`,
            params: { fid: item.id },
          })
        }
        style={[styles.card, isHovered && styles.hovered]}
        onPressIn={() => setIsHovered(true)}
        onPressOut={() => setIsHovered(false)}
      >
        <View style={styles.Container}>
          <Image source={{ uri: item.photo }} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={{ fontWeight: '700', fontSize: 16 }}> {item.name}</Text>
            <View style={styles.titleContainer}>
              <Text style={{ fontSize: 20, marginRight: 10, marginTop: 3 }}> {item.price}</Text>
              <TouchableOpacity style={styles.addCart} onPress={() => router.push('home/cart')}>
                <FontAwesome6 name="cart-shopping" size={18} color="white" />
              </TouchableOpacity>

            </View>

          </View>
          <View style={styles.about}>
            <Text style={{ color: 'gray', marginBottom: 30 }}>fast food {item.category}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>20% Off</Text>
            {!user.isAdmin ? <TouchableOpacity style={styles.deleteIcon} onPress={Dl2}>
              <FontAwesome6 name="trash-alt" size={24} color="#ffb01d" />
            </TouchableOpacity> : null}
        
          </View>
          </View>
        </View>

      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "95%",
    paddingBottom: 15,
    // paddingHorizontal:90,
    margin: 5,
    borderRadius: 12,
    borderColor: "#ffb01d",
    borderWidth: 3,
    shadowColor: "#000",
    backgroundColor: 'white',
    shadowOffset: {
      width: 3,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 5,
  },
  hovered: {
    backgroundColor: "#67e8f9",
  },
  hoveredText: {
    color: "#7257fa",
    textDecorationLine: "underline",
  },
  image: {
    flex: 1,
    width: '100%',
    height: 150,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    //gap:10,
    justifyContent: 'space-between',
    // flex:1,
    paddingRight: 6,
    paddingLeft: 14,
    paddingTop: 3,

  },
  Container: {
    //borderRadius:20,
    flex: 1,
    flexDirection: 'column',
  },
  about: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10,
  },
  addCart: {
    backgroundColor: '#ffb01d',
    padding: 8,
    borderRadius: 12,
  }
});
