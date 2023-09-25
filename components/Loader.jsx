import { Modal, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import tw from "../config/tailwind";

export function LoaderScreen({ size, color, bgColor, text }) {
  return (
    <Modal
      presentationStyle="overFullScreen"
      animationType="none"
      transparent={true}
      visible={true}
      style={tw`bg-purple-200`}
    >
      <View
        style={[
          tw`w-full h-screen bg-dark-800 flex flex-col items-center justify-center`,
        ]}
      >
        <Spinner size={size} color={color} bgColor={bgColor} />
        <Text
          style={[tw`text-white-100 text-[13px] py-5 `, { fontFamily: "ppSB" }]}
        >
          {text}
        </Text>
      </View>
    </Modal>
  );
}

export function LoaderScreenComp({ color, full, size, bgColor, text }) {
  return (
    <View
      style={tw`w-full ${
        full ? "h-screen" : "h-auto"
      } flex flex-col items-center justify-center`}
    >
      <Spinner color={color} size={size} />
      {text && (
        <Text style={tw`text-white-100 ppSB text-[13px] pb-5 `}>{text}</Text>
      )}
    </View>
  );
}

export function Spinner({ size = "large", color, bgColor }) {
  return (
    <ActivityIndicator
      size={size ?? "large"}
      color={color ?? "#fff"}
      style={{
        padding: 12,
        backgroundColor: bgColor,
        borderRadius: 12,
      }}
    />
  );
}
