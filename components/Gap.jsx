import React from "react";
import { View } from "react-native";

function Gap({ h }) {
  return (
    <View
      style={{
        height: h ?? 45,
      }}
    ></View>
  );
}

export default Gap;
