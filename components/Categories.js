import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const Categories = () => {
    const foods = [
        {
            id: "0",
            image: "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
            name: "Pizza",
        },
        {
            id: "1",
            image: "https://media.istockphoto.com/id/520410807/photo/cheeseburger.jpg?s=612x612&w=0&k=20&c=fG_OrCzR5HkJGI8RXBk76NwxxTasMb1qpTVlEM0oyg4=",
            name: "Burger",
        },
        {
            id: "2",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-ul0AshToDO4d8Upv-PRS1j0LP6WcyDAnEdEK6BVqhw&s",
            name: "Pasta",
        },
        {
            id: "3",
            image: "https://i.redd.it/yyr6vtruhzbb1.jpg",
            name: "Soft Drink",
        }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Categories</Text>
            <View style={styles.all}>
                {foods.map((item, index) => (
                    <View style={styles.search} key={index}>
                        <TouchableOpacity style={styles.image} onPress={()=>  router.push({
        pathname: "products/", 
        params: { name: item.name },
      })}>
                            <Image source={{ uri: item.image }} style={styles.imageStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    all: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    search: {
        marginBottom:'20%',
        alignItems: 'center', 
        width: '45%', 
    },
    text: {
        fontSize: 40,
        color: "#121312",
        textAlign: 'center',
        marginTop: 20,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 8,
        },
        shadowOpacity: 0.7,
        shadowRadius: 25,
        elevation: 10,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
    itemText: {
        marginTop: 8,
        textAlign: "center",
        color: "#121312",
        fontSize: 20,
    }
});
