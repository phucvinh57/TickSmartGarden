import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList, TouchableOpacity, Pressable, useWindowDimensions } from "react-native";
import SliderList from ".";
import { makeChunks } from "./util";

// Data will be used to compose our slides
const rawdata = [
  {
    color: "#44b5a1",
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/roller-skating.png",
  },
  {
    color: "#fa458c",
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/zombieing.png",
  },
  {
    color: "#2ecc71",
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/ice-cream.png",
  },
  {
    color: "#44b5a1",
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/petting.png",
  },
  {
    color: "#fa458c",
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/sitting-reading.png",
  },
  {
    color: "#2ecc71",
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/selfie.png",
  },
  {
    color: "#44b5a1",
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/coffee.png",
  },
  {
    color: "#fa458c",
    image: "https://opendoodles.s3-us-west-1.amazonaws.com/plant.png",
  },
];

export default function Carousel({ navigation }) {
  const [data, setData] = useState(makeChunks(rawdata, 5));
  // Renderer function takes the data as an input and outputs the view, should be customized
  return (
    <SliderList
      data={data}
      renderer={(itemList) => (
        <FlatList
          data={itemList}
          renderItem={({ item }) => (
            <View style={{ ...styles.slide, backgroundColor: item.color }}>
              <TouchableOpacity onPress={() => navigation.navigate('Root/MainApp/ViewEngine')}>
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  source={{ uri: item.image }}
                />
              </TouchableOpacity>
            </View>
          )}
          numColumns={2}
          keyExtractor={(_, index) => index} // Set unique key for each element
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  slide: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    backgroundColor: "wheat",
    borderRadius: 40,
  },
});
