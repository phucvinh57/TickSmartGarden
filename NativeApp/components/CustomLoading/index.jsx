import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import AppContainer from "../AppContainer";

export default function CustomLoading({title}) {
  return (
    <AppContainer
      title={
        <View style={{ width: "100%" }}>
          <Text style={styles.textHeader}>{title}</Text>
        </View>
      }
    >
      <View>
        <ActivityIndicator
          size="large"
          color="red"
          style={styles.loadingIcon}
        />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  loadingIcon: {
    flex: 1,
  },
  textHeader: {
    fontSize: 24,
    lineHeight: 28,
    color: "#de7067",
    fontWeight: "500",
  },
});
