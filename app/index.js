import { StyleSheet } from "react-native";
import { SafeAreaView, TouchableOpacity, Text, View } from "react-native";
import { router } from "expo-router";

export default function Page() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logCard}>
        <Text style={styles.text}>Are You Hungry?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("/account/login")}
        >
          <Text style={{ color: "#ffb01d", fontSize: 17 }}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.navigate("/account/register")}
        >
          <Text Text style={{ color: "#ffb01d", fontSize: 17 }}>
            Register
          </Text>
        </TouchableOpacity>
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121312",
    width: "70%",
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
    padding: 12,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "-5%",
    marginBottom: "20%",
  },
  link: {
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
    padding: 10,
    margin: 15,
  },
});
