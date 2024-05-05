import * as React from 'react';
import { useState } from "react";
import { View, SafeAreaView, StyleSheet, Image, Pressable, Modal, TouchableOpacity, TextInput } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import lemon from "../assets/photo.png"
import mango from "../assets/mango.jpg"
export default function Profile() {
  const [isVisible, setVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);

  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [userName, setUserName] = useState("");
  const [validUserName, setValidUserName] = useState(false);
  const [error, setError] = useState("");

  const vPhone = (phone) => {
    const v = phone.nativeEvent.text;
    setPhone(v);
    if (
      /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i.test(
        v
      ) &&
      v.length === 11
    ) {
      setValidPhone(true);
      setPhone(v);
    } else {
      setValidPhone(false);
    }
  };


  const vUserName = (name) => {
    console.log(name);
    const v = name.nativeEvent.text;
    console.log(v);
    setUserName(v);
    if (v.length > 5) {
      setValidUserName(true);
      setUserName(v);
    } else {
      setValidUserName(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={styles.edit}>
          <Icon.Button name="account-edit" size={25} color="#ffb01d" backgroundColor='white' onPress={() => setVisible(true)} />

        </View>

        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Image source={require('../assets/photo.png')} style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20, marginLeft: -10 }} />

          <View style={{ marginLeft: 20 }}>
            <Title style={[styles.title, {
              flexDirection: 'row',
              marginTop: 50,
              marginBottom: 4, color: "#ffb01d",
              marginLeft: -13, textAlign: 'left', justifyContent: 'flex-start', maxWidth: '99%'
            }]}>Abdelsalam Ebrahim</Title>


          </View>
        </View>
      </View>

      <View style={styles.userInfo}>

        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#ffb01d" size={20} />
          <Text style={{ color: "#ffb01d", marginLeft: 20, fontSize: 20, fontWeight: '700' }}>Maadi, Cairo</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#ffb01d" size={20} />
          <Text style={{ color: "#ffb01d", marginLeft: 20, fontSize: 20, fontWeight: '700' }}>01142950235</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#ffb01d" size={20} />
          <Text style={{ color: "#ffb01d", marginLeft: 20, fontSize: 20, fontWeight: '700' }}>Abdo14@email.com</Text>
        </View>

        <View style={styles.row}>
          <Icon name="basket-check" color="#ffb01d" size={20} />
          <Text style={{ color: "#ffb01d", marginLeft: 20, fontSize: 20, fontWeight: '700' }}>: 0</Text>
        </View>

      </View>
      <Pressable style={styles.buttonS} >
        <Text style={styles.titleS}> Logout </Text>
      </Pressable>

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
<Icon.Button name="close-circle" size={30}   backgroundColor='#ffb01d' onPress={() => {
              setVisible(false);
            }} />

</View>
       

          </View>

          <View style={styles.inputFields}>
            <TextInput
              placeholder="Edit Your UserName..."
              style={styles.textInput}
              value={userName}
              onChange={(t) => vUserName(t)}
            />



{userName.length < 1 ? null : validUserName ? null : (
            <Text style={{ fontSize: 12 }}>must be at least 6 characters</Text>
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
    backgroundColor: "white" //#F24675
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,

  },
  userInfo: {
    flex: 0.75,
    paddingHorizontal: 0,
    marginBottom: 25, marginLeft: '10%', borderRadius: 20,
    backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '80%'

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',


  },
  titleS: {
    textAlign: 'center', fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    //  borderRadius:20,
    //borderColor:"#CFFBFE",
    //borderWidth:10,
    padding: 15, borderBottomWidth: 1, borderBottomColor: 'black'

  },
  buttonS: {
    backgroundColor: "#121312", borderRadius: 10,
    padding: 10, marginLeft: 100, marginRight: 100
  },
  edit: { right: -150, left: 70, top: 120, marginLeft: 200, marginRight: 50 }, 
  
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
  },

  addHeader: {
    padding: 6,
    // borderBottomColor: "#CFFBFE",
    // borderBottomWidth: 1,
    flexDirection: "row",
    backgroundColor:"#ffb01d"
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
  edit1:{
    backgroundColor:"#ffb01d",
  
    marginLeft:110,
    marginTop:5
  }
});