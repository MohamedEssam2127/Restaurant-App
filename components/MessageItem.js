import { Text, View, StyleSheet } from "react-native"

export default function MessageItem({item}){


    return(
        <View style = {styles.container}>
            <Text style = {{fontSize: 18, fontWeight: '500', margin: 10,}}>{item.username}</Text>
            <Text style = {{textAlign: 'left', fontSize: 15, margin: 10}}>{item.text}</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        alignContent: 'flex-start',
        backgroundColor: '#CECECD',
        margin: 5,
        borderRadius: 20,
    }
})

