import { ScrollView, StyleSheet } from "react-native";
import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useState } from "react";
import Input from "./../components/Input";
import InputPass from "./../components/PassInput";
import { FontAwesome } from "@expo/vector-icons";
import { login, changePass } from "../firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleEmail = (email) => {
    const v = email.nativeEvent.text.trim();
    setEmail(v);
    setIsError(false);
  };

  const handlePassword = (pass) => {
    const v = pass.nativeEvent.text.trim();
    setPassword(v);
    setIsError(false);
  };

  const handleLogin = async () => {
    if (email.length !== 0 && password.length !== 0) {
      try {
        setLoading(false);
        const credentials = await login(email, password);
        await AsyncStorage.setItem("@user", JSON.stringify(credentials.user));
        setSent(true);
        setLoading(true);
        setPassword("");
        setEmail("");
        router.replace(`/home`);
      } catch (error) {
        console.log("error", JSON.stringify(error));
        setError("Invalid email or password");
        setLoading(true);
        setIsError(true);
      }
    } else {
      setError("Invalid field(s). Please check your input.");
      setIsError(true);
    }
  };

  const handleChangePass = async () => {
    try {
      await changePass(email);
      setIsError(false);
      setMessage("Check your email box!");
      setSent(true);
    } catch (error) {
      console.log("error", JSON.stringify(error));
      setError("invalid email");
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
            text={"Enter Your Email..."}
            handleInput={handleEmail}
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
            {sent ? (
              <TouchableOpacity onPress={() => handleChangePass()}>
                <Text style={{ color: "white" }}>
                  {message} here to resend email
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => handleChangePass()}>
                <Text style={{ color: "white" }}>Forgot password?</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          {isError ? (
            <Text style={{ fontSize: 12, color: "red" }}> {error} </Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
            {!loading ? (
              <ActivityIndicator size={"small"} color={"#ffb01d"} />
            ) : (
              <Text style={{ color: "#ffb01d", fontSize: 17 }}>LogIn</Text>
            )}
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
