import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import tw from "../config/tailwind";
import { TouchableOpacity } from "react-native-gesture-handler";

function TopBar({ onClick, title }) {
  return (
    <View
      style={tw`w-full relative top-0 left-0 px-5 py-3 flex flex-row items-center justify-between`}
    >
      <TouchableOpacity onPress={onClick}>
        <MaterialIcons
          name="keyboard-arrow-left"
          size={24}
          color="black"
          style={tw`text-[25px] text-dark-100 `}
        />
      </TouchableOpacity>
      <Text
        style={[
          { fontFamily: "ppSB" },
          tw`text-purple-100 text-center text-[18px] `,
        ]}
      >
        {title ?? "Title"}
      </Text>
      <View></View>
    </View>
  );
}

export default TopBar;
