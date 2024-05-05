import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import { Stack, router } from "expo-router";


export default function Page() {
  
  return (
    <View>
      <Stack.Screen
        options={{
          title : "Home",
          // headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Text>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
});