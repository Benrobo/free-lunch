import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import tw from "./config/tailwind";
import SplashScreen from "./components/SplashScreen";
import { useDeviceContext } from "twrnc";
import { useCallback, useEffect, useState } from "react";
import { sleep } from "./utils";
import RootNavigator from "./Navigation/RootNavigator";
import AuthNavigator from "./Navigation/AuthNavigator";
import Layout from "./components/Layout";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import "react-native-gesture-handler";

export default function App() {
  useDeviceContext(tw);
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded, fontError] = useFonts({
    ppReg: Poppins_400Regular,
    ppB: Poppins_700Bold,
    ppEB: Poppins_800ExtraBold,
    ppSB: Poppins_600SemiBold,
  });

  useEffect(() => {
    async function prepare() {
      await sleep(1);
      setAppIsReady(true);
    }

    prepare();
  }, []);

  if (!appIsReady && !fontsLoaded) {
    return <SplashScreen />;
  }
  return (
    <Layout>
      <MainComponent />
    </Layout>
  );
}

const MainComponent = () => {
  const [splashLoading, setSplashLoading] = useState(true);
  // const { isLoggedIn } = useContext(DataContext);
  const isLoggedIn = false;

  useEffect(() => {
    async function prepare() {
      await sleep(1);
      setSplashLoading(false);
    }
    prepare();
  }, []);

  if (splashLoading) {
    return <SplashScreen />;
  }

  if (isLoggedIn) {
    return <RootNavigator />;
  } else return <AuthNavigator />;
};
