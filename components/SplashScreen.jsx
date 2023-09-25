import React from "react";
import { Image, View } from "react-native";
import tw from "../config/tailwind";
import logo from "../assets/images/logos/logo.png";
import splash from "../assets/splash.png";

function SplashScreen() {
  return (
    <View
      style={tw`w-full h-screen bg-dark-100 flex flex-col items-center justify-center text-center `}
    >
      <Image style={tw`w-screen h-screen`} source={splash} />
    </View>
  );
}

export default SplashScreen;
