import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import HomeScreen from "../../screens/HomeScreen";
import { AntDesign } from '@expo/vector-icons';

export default function Page() {
  
  return (
    <View style={styles.upper}>
      <Stack.Screen
        options={{
          title : "Home",
          headerStyle: { backgroundColor: "#ffb01d" },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize:30,
          },
          headerRight: () => (
            <View style={styles.search}>
                 <TextInput placeholder='Search food food' />
                 <AntDesign name="search1" size={24} color="black" />
            </View>
       
          // <AntDesign name="search1" size={24} color="black" />
        )
        
        }}
        
      />



      <HomeScreen/>
      <TouchableOpacity onPress={() => router.navigate('/home/profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
  search:{
   marginRight:-70,
    flex:1,
    maxWidth:"85%",
    flexDirection:"row",
   display:"flex",
    justifyContent:"space-between",
    borderWidth:1,
    padding:10,
    borderColor:"white",
    borderRadius:25,
  },
});