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
import Icon from '@expo/vector-icons/MaterialIcons';

const addImg = require("../assets/plus.png");
const cancel = require("../assets/cancel.png");

export default function AddItem() {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [loading, setUploading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newDesc, setNewDesc] = useState("");

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
            setUrl(await ref.getDownloadURL());
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

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={{  top: "10%", left: "85%" }}
            >
                {/* <Image source={addImg} style={styles.Img} /> */}
                <Icon name="add-circle" size={40} style={styles.Img}/>
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
                            style={{ width: 0, height: 50, marginLeft: 90,top:'2%' }}
                            onPress={() => {
                                setVisible(false);
                            }}
                        >
                            <Icon name="cancel" size={40} style={styles.Img}/>

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

                        {/* <TextInput
                            placeholder="Image Url..."
                            style={styles.textInput}
                            value={newImg}
                            onChangeText={(text) => setNewImg(text)}
                        /> */}

                        <TouchableOpacity style={styles.imgBut} onPress={() => { pickImage() }}>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                                Pick Photo From Gallery
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imgBut} onPress={() => { uploadImage() }}>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                                Upload
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity style={styles.submit}>
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                                Add Food
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        width: "80%",
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
