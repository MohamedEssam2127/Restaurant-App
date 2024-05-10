import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    Modal,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { firebase } from '../firebase/Config';
import "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Icon from '@expo/vector-icons/FontAwesome6';
import Cancel from '@expo/vector-icons/MaterialIcons';

import { setDoc, addDoc, collection,doc ,updateDoc} from "firebase/firestore";
import { db } from "../firebase/Config";


export default function AddItem({ Category }) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [loading, setUploading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [newName, setNewName] = useState(null);
    const [newPrice, setNewPrice] = useState(null);
    const [newDesc, setNewDesc] = useState(null);
    const [iserr, setIsError] = useState(false);




    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All, // Images and videos
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error Picking Image:", error);
        }
    };


    const uploadImage = async () => {
        setUploading(true);
        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await fetch(uri).then((response) => response.blob());
            const filename = uri.substring(uri.lastIndexOf("/") + 1);
            const ref = firebase.storage().ref().child(filename);
            await ref.put(blob);
            setUrl( await ref.getDownloadURL());
            console.log("Download URL:", url);
            Alert.alert("Upload Completed");
            // setImage(null);
        } catch (error) {
            console.error("Upload failed:", error);
            Alert.alert("Upload Failed");
        } finally {
            setUploading(false);
        }
    };

    const handleAdding = async () => {
        if (newName === null || newPrice === null || newDesc === null||image===null) {
            setIsError(true);
        }
        else {
            const food = {
                category: Category,
                name: newName,
                price: newPrice,
                description: newDesc,
                photo: url
            }
            try {
                const xf = await addDoc(collection(db, 'Foods'), food);
                const setID = doc(db, `Foods`, xf.id);
                const updateData = {
                id: xf.id,
                };

                try {
                await updateDoc(setID, updateData, { merge: true });
                console.log("Completed updated successfully!");
                } catch (error) {
                console.error("Error updating completed:", error);
                }

                console.log("Document updated with its own ID");
                Alert.alert("Added!")
              } catch (error) {
                console.error("Error adding or updating document:", error);
              }
            setIsError(false);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={{ top: "10%", left: "93%" }}
            >
                <Icon name="circle-plus" size={40} style={styles.Img} />
            </TouchableOpacity>

            <Modal visible={isVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.addHeader}>
                        <Text
                            style={{
                                fontSize: 35,
                                fontWeight: "700",
                                color: "white",
                                marginTop: 3,
                                marginLeft: 10,
                            }}
                        >
                            Add New Food
                        </Text>
                        <TouchableOpacity
                            style={{ width: 0, height: 50, marginLeft: 90, top: '2%' }}
                            onPress={() => {
                                setVisible(false);
                            }}
                        >
                            <Cancel name="cancel" size={40} style={styles.Img} />

                            {/* <Image source={cancel} style={styles.Img} /> */}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputFields}>
                        <TextInput
                            placeholder="Food name..."
                            style={styles.textInput}
                            value={newName}
                            onChangeText={(text) => setNewName(text)}
                        />

                        <TextInput
                            placeholder="Description..."
                            style={styles.textInput}
                            value={newDesc}
                            onChangeText={(text) => setNewDesc(text)}
                        />

                        <TextInput
                            placeholder="Price..."
                            style={styles.textInput}
                            value={newPrice}
                            onChangeText={(text) => setNewPrice(text)}
                            keyboardType="numeric"
                        />
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.imgBut} onPress={() => { pickImage() }}>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                                Pick Photo
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imgBut} onPress={() => { uploadImage() }}>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                            upload Photo
                            </Text>
                        </TouchableOpacity>
                    </View>


                        <TouchableOpacity style={styles.submit} onPress={() =>  handleAdding() }>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                                Add Food
                            </Text>
                        </TouchableOpacity>
                        {iserr ? <Text style={{marginTop:2,color:'red'}}>Fill all Fields!</Text> : null}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    Img: {
        width: 50,
        height: 50,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    addHeader: {
        padding: 6,
        borderBottomColor: "#FF015B",
        borderBottomWidth: 1,
        borderRadius: 7,
        flexDirection: "row",
        backgroundColor: "#ffb01d"
    },
    inputFields: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    textInput: {
        width: "80%",
        height: 70,
        borderRadius: 15,
        borderWidth: 0.5,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 40,
        backgroundColor: "#fff",
    },
    submit: {
        backgroundColor: "#ffb01d",
        width: "80%",
        height: 70,
        borderRadius: 15,
        borderWidth: 0.5,
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.85,
    },
    imgBut: {
        backgroundColor: "#121312",
        width: "39%",
        marginRight:5,
        height: 70,
        borderRadius: 15,
        borderWidth: 0.5,
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.85,

    },
    imageStyle: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center'
    }
});
