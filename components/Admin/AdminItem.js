import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from "react-native";
import React, { useEffect, useState,useRef } from "react";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";
import pizza from "../../assets/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/Config";
import UpdateItem from '../UpdateItem'
export default function Item({ id }) {
    const [ReadMore, setReadMore] = useState(false);
    const [item, setItem] = useState({});
    const fetItem = async () => {
        const docRef = doc(db, "Foods", id);
        try {
            const doc = await getDoc(docRef);
            const data = doc.data();
            setItem(data);
        } catch (e) {
            console.log("Error getting cached document:", e);
        }
    }

    useEffect(() => {
        fetItem()
    }, [])
    
    const intervalRef = useRef(null);

    useEffect(() => {
      intervalRef.current = setInterval(fetItem, 3000); // Adjust time here
  
      // Cleanup function to stop the interval when the component unmounts
      return () => clearInterval(intervalRef.current);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={{uri:item.photo}} style={styles.image} >
                <TouchableOpacity style={styles.back} onPress={() => router.back()}>
                    <FontAwesome name="chevron-left" size={30} color="white" style={styles.backbtn} />
                </TouchableOpacity>
                <View style={styles.Container}>

                    <Text style={styles.Header}> {item.name}</Text>
                    <Text style={styles.category}> {item.category}</Text>
                    <ScrollView>
                        <Text
                            style={{
                                color: "gray",
                                lineHeight: 28,
                                fontSize: 16,
                                marginLeft: 8,
                            }}
                            numberOfLines={ReadMore ? 20 : 3}
                        >
                            {item.description}
                        </Text>
                        <Pressable onPress={() => setReadMore(!ReadMore)}>
                            <Text style={{ color: "#ffb01d", fontSize: 20, fontWeight: "500", marginLeft: 8 }}>
                                {ReadMore ? "Read Less" : " Read More"}
                            </Text>
                        </Pressable>
                    </ScrollView>
                    <Text style= {styles.price}> Price {item.price}</Text>
                    
                    <View
                        style={{ display: "flex", flexDirection: "row", gap: 5, marginRight:"44%",marginBottom:"20%" }}
                    >
                        <UpdateItem item={item} />    

                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginTop: '71%'
    },
    image: {
        flex: 1,
        width: "100%",
        height: "40%",
    },
    Header: {
        fontWeight: "bold",
        fontSize: 29,
        padding: 12,
        textAlign: "center",
    },
    category: {
        fontWeight: "700",
        fontSize: 29,
        padding: 12,
        textAlign: "center",
        color: "#ffb01d",
    },
    messagebtn: {
        padding: 15,
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 99,
        borderColor: "#ffb01d",
        flex: 1,
        backgroundColor: "#121312",
        flexDirection: 'row',
        gap: 3,
        justifyContent: 'space-between'
    },
    Bookbtn: {
        padding: 15,
        backgroundColor: "#ffb01d",
        borderWidth: 1,
        borderRadius: 99,
        borderColor: "#ffb01d",
        flex: 1,
    },
    price: {
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center'
    },
    back: {
        marginTop: '8%',
        marginLeft: '5%',
        flexDirection:'row',
        justifyContent:'space-between'

    },
    backbtn: {

    },
});