import { Modal, Text, TouchableOpacity, View, StyleSheet, TextInput, ScrollView, FlatList } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import Message from "../components/MessageItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    doc,
    addDoc,
    Timestamp,
    collection,
    query,
    orderBy,
    onSnapshot,
    getDoc,
    where
  } from "firebase/firestore";
  import { db } from "../firebase/Config";


export default function Review({ visible, setVisible, mid }) {

    const[mess, setMess] = useState("");
    const[messages, setMessages] = useState([]);
    const[userDate, setUserData] = useState({});
    const [error, setError] = useState(false);


    useEffect(() => {
        const messageRef = collection(db, "reviews");
        const q = query(
            messageRef,
            where("mid", "==", mid),
          );
        let unsub = onSnapshot(q, (snapshot) => {
          let allMessages = snapshot.docs.map((doc) => {
            return doc.data();
          });
          setMessages([...allMessages]);
        });
    
        return () => {
          unsub;
        };
      }, []);

      const fetchData = async () => {
        const uid = JSON.parse( await AsyncStorage.getItem("@user")).uid;
        const docRef = doc(db,'users', uid);

        try {
          const docSnap = await getDoc(docRef);
            setUserData(docSnap.data());
         
        } catch (error) {
          console.error("Error getting document:", error);
        }
    };

    const handleSend = async () => {
        setMess(mess.trim());
        if(mess.length && mess !== " " && mess !== "  " && mess !== "   " && mess !== "    " 
            && mess !== "     " && mess !== "      " && mess !== "       " && mess !== "        " 
            && mess !== "         " && mess !== "          "){
                
            fetchData();
            const uid = JSON.parse( await AsyncStorage.getItem("@user")).uid;
            const docRef = collection(db, "reviews");
            await addDoc(docRef, {
                uid: uid,
                text: mess,
                mid: mid,
                username: userDate.username,
                createdAt: Timestamp.fromDate(new Date()),
            });
            setMess("");
            setError(false);
        }else{
            setError(true);
        }
        
    }

  return (
    <Modal visible={visible}>
      <View style={styles.Container}>
        <View style={styles.close}>
          <Text style={styles.closeButton}>Reviews</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(false)}>
            <MaterialCommunityIcons name="close-circle" size={30} color="black" />
          </TouchableOpacity>
        </View>

        {/* <ScrollView
          contentContainerStyle={{ paddingTop: 10, flex: 1, width: 350 }}
          
        >
          {messages.map((item, index) => (
            <Message key={index} item={item} />
          ))}
        </ScrollView> */}

        <FlatList
          data={messages}
          scrollToOverflowEnabled
          style={{ flex: 1, width: 350 }}
          renderItem={({ item }) => {
            return (
              <View >
                <Message item={item}/>
              </View>
            );
          }}
        />

        <View style={styles.inputField}>
          <TextInput
            placeholder={error? "Enter something to send" : "Please enter your opinion here..."}
            placeholderTextColor="#ccc"
            style={styles.textInput}
            onChangeText={setMess}
            defaultValue={mess}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => handleSend()}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
  },
  close: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: "#ffb01d",
    height: 50,
  },
  closeButton: {
    margin: 10,
    fontWeight: '900',
    fontSize: 25,
    color: "white",
  },
  inputField: {
    flexDirection: 'row',
    padding: 10,
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fafafa",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ffb01d",
  },
  sendButton: {
    justifyContent: 'center',
    backgroundColor: "#121312",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  sendButtonText: {
    color: "#ffb01d",
    fontWeight: 'bold',
  },
});
