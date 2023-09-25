import React, { useCallback, useContext } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "../config/tailwind";
// import { StatusBar } from "expo-status-bar";

function Layout({ children, useSafeAreaView, statusBarColor }) {
  return (
    <View>
      <StatusBar backgroundColor={statusBarColor ?? "#7C149B"} />
      {useSafeAreaView ? (
        <SafeAreaView style={tw`w-full bg-dark2-100`}>
          <View style={tw`w-full h-screen bg-white-105`}>{children}</View>
        </SafeAreaView>
      ) : (
        <View style={tw`w-full h-screen bg-white-105`}>{children}</View>
      )}
    </View>
  );
}

export default Layout;
