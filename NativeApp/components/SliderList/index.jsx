import React, { useState, createRef } from "react";
import { View, FlatList, StyleSheet, useWindowDimensions } from "react-native";

const SliderList = ({ data, renderer, dotColor, windowWidth }) => {

  windowWidth = windowWidth || useWindowDimensions().width;
  // Ref to the FlatList element. We use it to access its methods
  const slider = createRef(null);
  // Slider state contains active item and offset position
  const [sliderState, setSliderState] = useState({
    item: 0,
    offset: 0,
  });

  // Update slider state on change event
  const slideChanged = (e) => {
    const item = Math.round(e.nativeEvent.contentOffset.x / windowWidth);
    console.log("slideChanged");
    if (item != sliderState.item) {
      setSliderState({
        item: item,
        offset: item * windowWidth,
      });
    }
  };

  // Renders control buttons
  // const button = (direction) => (
  //   <TouchableOpacity
  //     onPress={() =>
  //       slider.current.scrollToOffset({
  //         offset:
  //           direction === "BACK"
  //             ? sliderState.offset - windowWidth
  //             : sliderState.offset + windowWidth,
  //         animated: true,
  //       })
  //     }
  //   >
  //     <Text style={{ ...styles.buttons, color: dotColor }}>{direction}</Text>
  //   </TouchableOpacity>
  // );

  // Renders pagination dots
  const dots = () => (
    <View style={styles.dotGroup}>
      {data.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            { borderColor: dotColor },
            sliderState.item === index ? { backgroundColor: dotColor } : null,
          ]}
        />
      ))}
    </View>
  );

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item: itemList }) => (
          <View style={{ width: windowWidth }}>{renderer(itemList)}</View>
        )}
        ref={slider}
        keyExtractor={(_, index) => index} // Set unique key for each element
        horizontal={true} // Transpose the slider horizontally
        pagingEnabled={true} // Snap to the side
        showsHorizontalScrollIndicator={false} // Hide scrollbar
        onScroll={slideChanged} // Fire slideChanged on scroll event
      />
      <View style={styles.controls}>
        {/* {button('BACK')} */}
        {dots()}
        {/* {button('NEXT')} */}
      </View>
    </>
  );
};

// getItemLayout={(_, index) => ({
//   length: windowWidth,
//   offset: windowWidth * index,
//   index,
// })} // Used for optimization to eliminate recurred measurement calculations

const styles = StyleSheet.create({
  controls: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dotGroup: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: "#ffffff",
  },
  dotActive: {
    backgroundColor: "#ffffff",
  },
  // buttons: {
  //   fontSize: 14,
  //   color: "#ffffff",
  //   marginHorizontal: 14,
  //   padding: 15,
  // },
});

SliderList.defaultProps = {
  dotColor: "pink",
}
export default SliderList;
