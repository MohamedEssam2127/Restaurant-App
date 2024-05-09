import Profile from '../../components/Profile'
import { View,Text } from 'react-native'
// import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
export default function Profile1() {
    return (
        <>
        <View style={styles.upper}t>
            <Tabs.Screen
     
        options={{
          title: 'Profile',
          tabBarIcon: () => <FontAwesome name="user" size={24} color="#ffb01d" />,
          headerStyle: { backgroundColor: "#ffb01d" },
          headerTintColor: "#fff",
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="account" size={40} color="white" />
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#fff', marginLeft: 10 }}>
                    Profile
                </Text>
            </View>
        ),
          headerTitleStyle: {
           fontWeight: "bold",
           fontSize:30,
         },
          headerTitleAlign: 'center'
        }}
      />
      </View>
<Profile/>

</>
    )
}
const styles = StyleSheet.create({
    upper:{
       textAlign:'center',
       justifyContent:'center',
       alignContent:'center',
    },

})