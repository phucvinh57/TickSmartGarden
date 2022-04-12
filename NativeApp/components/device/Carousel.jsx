import React, { useState } from "react";
import { View, StyleSheet, Image, FlatList } from "react-native";
import SliderList from "./SliderList";
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

const Carousel = () => {
  const [data, setData] = useState(makeChunks(rawdata, 5));

  // Renderer function takes the data as an input and outputs the view, should be customized
  return (
    <SliderList
      data={data}
      dotColor="green"
      renderer={(itemList) => (
        <FlatList
          data={itemList}
          renderItem={({ item }) => (
            <View style={{ ...styles.slide, backgroundColor: item.color }}>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={{ uri: item.image }}
              />
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

export default Carousel;
