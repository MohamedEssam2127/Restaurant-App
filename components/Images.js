import { StyleSheet,Text,View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Image=()=>{
const Images=[
"https://www.southernliving.com/thmb/3x3cJaiOvQ8-3YxtMQX0vvh1hQw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/2652401_QFSSL_SupremePizza_00072-d910a935ba7d448e8c7545a963ed7101.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqV5vcdDCRO2a02j1QAMmlxxYitEfL7gZX-PuxZ98DRA&s",
"https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg",
"https://www.spoton.com/blog/content/images/size/w1200/2023/08/Mocktail--zero-proof-cocktails--and-different-non-alcoholic-drinks.jpeg",
];
    return(
    <View>
    <SliderBox
     images={Images}
     autoPlay
     circleLoop
     dotColor="#13274F"
     inactiveDotColor="#90A4AE"
     ImageComponentStyle={{
         borderRadius:1,
         width:"100%",
         
     }}
   />
    </View>
)

}

export default Image;
const styles=StyleSheet.create({

})