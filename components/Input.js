import { TextInput, View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Input({ iconImg, checkImg, text, handleInput, type }) {
  return (
    <View style={[styles.input, { flexDirection: "row" }]}>
      <FontAwesome name={iconImg} size={20} color="#121312" />
      <TextInput
        style={[styles.text]}
        keyboardType={type ? "phone-pad" : "default"}
        placeholder={text}
        onChange={(t) => handleInput(t)}
      ></TextInput>
      <FontAwesome
        name={checkImg}
        style={{ width: 18, height: 18 }}
        size={18}
      />
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
    padding: 3,
    borderRadius: 10,
  },
  text: {
    height: "100%",
    width: "80%",
    padding: 3,
  },
});
