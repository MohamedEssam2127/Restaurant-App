import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import HomeScreen from "../../screens/HomeScreen";
import { AntDesign } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';



export default function Page() {
  
  return (
    <View style={styles.upper}>
      {/* <Stack.Screen
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
        <FontAwesome size={28} name="home" color={color} />
        }}
        
      /> */}


<Tabs.Screen
     
     options={{
       title: 'Home',
       tabBarIcon: () =>  <FontAwesome size={28} name="home" color={'#ffb01d'} />,
       headerStyle: { backgroundColor: "#ffb01d" },
       headerTintColor: "#fff",
       headerTitleStyle: {
            fontWeight: "bold",
            fontSize:30,
          },
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome5 name="home" size={24} color="white" />
              <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#fff', marginLeft: 10 }}>
              Home
              </Text>
            </View>
          ),
          headerTitleAlign: 'center',
     }}
   />
      <HomeScreen/>
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