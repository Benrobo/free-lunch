import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import tw from "./config/tailwind";
import SplashScreen from "./components/SplashScreen";
import { useDeviceContext } from "twrnc";
import { useCallback, useContext, useEffect, useState } from "react";
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
import DataContext, { DataContextProvider } from "./context/DataContext";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { NotifierWrapper } from "react-native-notifier";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <DataContextProvider>
            <NotifierWrapper>
              <MainComponent />
            </NotifierWrapper>
          </DataContextProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </Layout>
  );
}

const MainComponent = () => {
  const [splashLoading, setSplashLoading] = useState(true);
  const { isLoggedIn } = useContext(DataContext);

  console.log({ isLoggedIn });

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

  if (true) {
    return <RootNavigator />;
  } else return <AuthNavigator />;
};
