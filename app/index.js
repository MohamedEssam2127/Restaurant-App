
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Page() {

  return (
    <View>
      <Link href={"/home"}>Go to home press here</Link>
    </View>
  );
}
