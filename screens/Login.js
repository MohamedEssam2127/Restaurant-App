import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView, TouchableOpacity, Text, View } from "react-native";
import { router } from "expo-router";

import React, { useState } from "react";
import Input from "./../components/Input";
import InputPass from "./../components/PassInput";
import { FontAwesome } from "@expo/vector-icons";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUser = (user) => {
    const v = user.nativeEvent.text;
    setUsername(v);
  };

  const handlePassword = (pass) => {
    const v = pass.nativeEvent.text;
    setPassword(v);
  };

  const handleSend = () => {
    if (username.length !== 0 && password.length !== 0) {
      console.log("Success");
      setPassword("");
      setUsername("");
    } else {
      console.log("Failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logCard}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{ marginTop: -30, marginBottom: 30 }}
            onPress={() => router.back()}
          >
            <FontAwesome name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.backUser}>
            <FontAwesome
              name="user-circle"
              size={60}
              color="black"
              style={styles.userImg}
            />
          </View>
          <Input
            type={false}
            iconImg={"user"}
            text={"Enter Your Username..."}
            handleInput={handleUser}
            checkImg={undefined}
          />
          <InputPass
            text={"Enter Your Password..."}
            vPass={handlePassword}
            checkImg={undefined}
          />
          <TouchableOpacity
            style={{ margin: 4 }}
            onPress={() => console.log("OK")}
          >
            <TouchableOpacity>
              <Text style={{ color: "white" }}>Forgot password?</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleSend()}>
            <Text style={{ color: "#ffb01d", fontSize: 17 }}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.navigate("/account/register")}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Register now!
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  logCard: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: 550,
    borderRadius: 25,
    backgroundColor: "#ffb01d",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 20,
  },
  backUser: {
    width: 90,
    height: 90,
    borderRadius: 25,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 8,
    },
    shadowOpacity: 0.7,
    shadowRadius: 25,
    elevation: 10,
    margin: 18,
  },
  userImg: {
    width: 60,
    height: 60,
    margin: 15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121312",
    width: 90,
    height: 50,
    borderRadius: 50,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 10,
  },
});
