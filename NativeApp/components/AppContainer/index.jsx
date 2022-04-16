import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

export default function AppContainer({ children, title }) {
  return (
    <View style={styles.background}>
      <View style={{ flex: 1 }} />
      <View style={styles.container}>
        {title && <View style={styles.title}>{title}</View>}
        <View style={styles.body}>
          {children}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#28554e",
    flex: 1,
  },
  container: {
    flex: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 7,
    alignItems: "center",
    // backgroundColor: "pink",
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
    // backgroundColor: "orange",
  },
});
