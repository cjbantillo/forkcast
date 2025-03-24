import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Preloader: React.FC = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/animations/pacman-loader.json")} 
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCD9B8",
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default Preloader;
