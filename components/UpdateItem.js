import { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Image,
    Modal,
    TextInput,
    TouchableOpacity,
    Alert
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Icon from '@expo/vector-icons/FontAwesome6';
import * as FileSystem from 'expo-file-system';
import { firebase } from '../firebase/Config';
import "firebase/storage";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { updateDoc,doc } from "firebase/firestore";
import { db } from "../firebase/Config";


export default function UpdateItem({item}) {
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [loading, setUploading] = useState(false);
    const [isVisible, setVisible] = useState(false);
    const [newName, setNewName] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [iserr, setIsError] = useState(false);


    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All, 
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

        } catch (error) {
            console.error("Upload failed:", error);
            Alert.alert("Upload Failed");
        } finally {
            setUploading(false);
        }
    };
    const defualtValues = () => {
        setNewDesc(item.description);
        setNewName(item.name);
        setNewPrice(String(item.price));
        setUrl(item.photo);
    }

    useEffect(() => {
        defualtValues();
    },[!isVisible])

    const handleUpdating = async () =>{
        if((newName===item.name&&newDesc===item.description&&newPrice===item.price&&item.photo===url)){
            setIsError(true);
        }
        else if (newName.length=!0&&newPrice!=0&&newDesc!=0){
            setIsError(false);
            const docRef=doc(db,'Foods',item.id);
            const newFood = {
                name:newName,price:newPrice,description:newDesc,photo:url
            }
            try {
                await updateDoc (docRef,newFood,{merge:true});
                Alert.alert("Done!");
            }
            catch(error){
                console.error("Error updating " , error)
            }


        }
        
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={{ width: 0, height: 50, top: "1%", left: "85%" }}
            >
                {/* <Image source={editImg} style={styles.Img} /> */}
                <Icon name="edit" size={40} style={styles.Img}/>
                
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
                            Update This Food
                        </Text>
                        <TouchableOpacity
                            style={{ width: 0, height: 50, marginLeft: 45,top:'2%' }}
                            onPress={() => {
                                setVisible(false);
                            }}
                        >
                            <MaterialIcons name="cancel" size={40} style={styles.Img}/>

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
                            multiline
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

                        <TouchableOpacity style={styles.submit} onPress={()=>{handleUpdating()}} >
                            <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                                Update food
                            </Text>
                        </TouchableOpacity>
                        {iserr? <Text>Invalid</Text> : null}

                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    Img: {
        width: 50,
        height: 50,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    addHeader: {
        padding: 6,
        borderBottomColor: "#ffb01d",
        borderBottomWidth: 1,
        flexDirection: "row",
        borderRadius:7,
        backgroundColor:"#ffb01d"
        
    },
    inputFields: {
        marginTop: 15,
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
    },
});