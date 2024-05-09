import * as React from "react";
import { router } from "expo-router";
import { useState ,useEffect} from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  TextInput,Text
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc } from "firebase/firestore";
  import { logout } from "../firebase/auth";

import { db } from "../firebase/Config";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";
// import lemon from "../assets/photo.png";
// import mango from "../assets/mango.jpg";
export default function Profile() {
  const [isVisible, setVisible] = useState(false);
  const [userData, setUserData] = useState({});



  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);

  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [userName1, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [error, setError] = useState("");
  const [flag, setflag] = useState(false);


  // const vPhone = (phone) => {
  //   const v = phone.nativeEvent.text;
  //   setPhone(v);
  //   if (
  //     /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i.test(
  //       v
  //     ) &&
  //     v.length === 11
  //   ) {
  //     setValidPhone(true);
  //     setPhone(v);
  //   } else {
  //     setValidPhone(false);
  //   }
  // };

  // const vUserName = (name) => {
  //   console.log(name);
  //   const v = name.nativeEvent.text;
  //   console.log(v);
  //   setUserName(v);
  //   if (v.length > 5) {
  //     setValidUserName(true);
  //     setUserName(v);
  //   } else {
  //     setValidUserName(false);
  //   }
  // };




  const fetchData = async () => {
    const uid = JSON.parse( await AsyncStorage.getItem("@user")).uid;
    const docRef = doc(db,'users', uid);

    try {
      const docSnap = await getDoc(docRef);
      
        setUserData(docSnap.data());
        setflag(true);
     
    } catch (error) {
      console.error("Error getting document:", error);
    }
  };

  const logo = () => {
    logout();
    router.replace("/account/login");
  }


  useEffect(() => {
    fetchData();
  }, [!flag]);
  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>

        <TouchableOpacity   onPress={() => setVisible(true)} style = {{ width: '100%', alignItems: 'flex-end', paddingRight: 10, paddingTop: 10}}>
          <Icon  name="account-edit" color="white"    size={25} />
        </TouchableOpacity>

        <Image
            source={require("../assets/images/photo.png")}
            style={{
              width: 75,
              height: 75,
              borderRadius: 50,
              marginTop: 0,
              marginLeft: 0,
              color: "#ffb01d",

            }}
          />

          <Text style={{ fontSize:18,fontWeight:'bold', color:"white",marginTop:3}}>{userData.username}</Text>



      


        {/* <View style={{ flexDirection: "row", marginTop: 15,backgroundColor:'red' }}>
          <Image
            source={require("../assets/images/photo.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginTop: 20,
              marginLeft: -10,
            }}
          />

            <Title
              style={[
                styles.title,
                {
                  flexDirection: "row",
                  marginTop: 50,
                  marginBottom: 4,
                  color: "#ffb01d",
                  marginLeft: 5,
                  textAlign: "left",
                  maxWidth: "70%", backgroundColor:'blue'
                },
              ]}
            >
              {userData.username}
            </Title>
          
        </View> */}
      </View>

      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#ffb01d" size={20} />
          <Text
            style={{
              color: "#ffb01d",
              marginLeft: 20,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
              {userData.address}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#ffb01d" size={20} />
          <Text
            style={{
              color: "#ffb01d",
              marginLeft: 20,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
              {userData.phone}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#ffb01d" size={20} />
          <Text
            style={{
              color: "#ffb01d",
              marginLeft: 20,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
              {userData.email}
          </Text>
        </View>

        <View style={styles.row}>
          <Icon name="basket-check" color="#ffb01d" size={20} />
          <Text
            style={{
              color: "#ffb01d",
              marginLeft: 20,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            : 0
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.buttonS} onPress={() => logo()}>
        <Text style={styles.titleS}> Logout </Text>
      </TouchableOpacity>

      <Modal visible={isVisible}>
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
              Edit Profile
            </Text>
            <View style={styles.edit1}>
              <Icon.Button
                name="close-circle"
                size={30}
                backgroundColor="#ffb01d"
                onPress={() => {
                  setVisible(false);
                }}
              />
            </View>
          </View>

          <View style={styles.inputFields}>
            <TextInput
              placeholder="Edit Your UserName..."
              style={styles.textInput}
              value={userName1}
              onChange={(t) => vUserName(t)}
            />

            {userName1.length < 1 ? null : validUserName ? null : (
              <Text style={{ fontSize: 12 }}>
                must be at least 6 characters
              </Text>
            )}

            <TextInput
              placeholder="Edit Your Phone..."
              style={styles.textInput}
              value={phone}
              onChange={(text) => vPhone(text)}
              keyboardType="numeric"
            />

            {phone.length < 1 ? null : validPhone ? null : (
              <Text style={{ fontSize: 12 }}>your phone must be 11 number</Text>
            )}

            <TextInput
              placeholder="Edit Your Address..."
              style={styles.textInput}
              value={location}
              onChangeText={(text) => setLocation(text)}
            />
            <TouchableOpacity style={styles.submit}>
              <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                Edit your profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", //#F24675
  },
  userInfoSection: {
    flex:0.30,
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    borderBottomEndRadius:50,
    borderBottomStartRadius: 50,
    backgroundColor: "#ffb01d",
  },
  userInfo: {
    flex: 0.70,
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginTop: 50,
    // marginLeft: "10%",
    backgroundColor: "white",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleS: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffb01d",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    justifyContent:'center',
    flexDirection: "row",
    marginBottom: 15,
    maxWidth: "90%",
    //  borderRadius:20,
    //borderColor:"#CFFBFE",
    //borderWidth:10,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
  buttonS: {
    backgroundColor: "#121312",
    borderRadius: 10,
    padding: 10,
    marginLeft: 100,
    marginRight: 100,
  },
  edit: {
    right: -150,
    left: 70, 
    top: 50, 
    marginLeft: 200,
    marginRight: 50 },

  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  addHeader: {
    padding: 6,
    // borderBottomColor: "#CFFBFE",
    // borderBottomWidth: 1,
    flexDirection: "row",
    backgroundColor: "#ffb01d",
  },
  inputFields: {
    marginTop: 30,
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
    marginTop: 50,
    backgroundColor: "white",
  },
  submit: {
    backgroundColor: "#121312",
    width: "80%",
    height: 70,
    borderRadius: 15,
    borderWidth: 0.5,
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.85,
  },
  edit1: {
    backgroundColor: "#ffb01d",

    marginLeft: 110,
    marginTop: 5,
  },
});
