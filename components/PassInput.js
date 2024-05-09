import { TextInput, View, TouchableOpacity, StyleSheet } from "react-native";

import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function Input({ vPass, checkImg, text }) {
  const [lock, setLock] = useState(true);

  const handleLock = () => {
    if (lock) {
      setLock(false);
    } else {
      setLock(true);
    }
  };

  return (
    <View style={[styles.input, { flexDirection: "row" }]}>
      <TouchableOpacity
        style={{ width: 18, height: 18 }}
        onPress={() => handleLock()}
      >
        <FontAwesome
          name={lock ? "lock" : "unlock"}
          color="#121312"
          size={20}
        />
      </TouchableOpacity>
      <TextInput
        style={[styles.text]}
        placeholder={text}
        secureTextEntry={lock}
        onChange={(t) => vPass(t)}
      ></TextInput>
      <FontAwesome name={checkImg} size={20} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "75%",
    height: 40,
    margin: 2,
    borderRadius: 10,
    padding: 3,
  },
  text: {
    height: "100%",
    width: "80%",
  },
});
