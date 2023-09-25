import React from "react";
import NavStack from "../Navstack";
import LoginScreen from "../NavigationScreen/Auth/Login";
import SignupScreen from "../NavigationScreen/Auth/Signup";
import Layout from "../../components/Layout";
import { Image, Text, View } from "react-native";
import tw from "../../config/tailwind";
import logo from "../../assets/images/logos/logo.png";
import { LogoSvg } from "../../components/Icon";
import Gap from "../../components/Gap";
import { TouchableOpacity } from "react-native-gesture-handler";

const AuthStackScreen = () => {
  return (
    <NavStack.Navigator initialRouteName="BaseAuth">
      <NavStack.Screen
        name="BaseAuth"
        component={BaseAuthScreen}
        options={{ headerShown: false }}
      />
      <NavStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <NavStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </NavStack.Navigator>
  );
};

export default AuthStackScreen;

function BaseAuthScreen({ navigation }) {
  const navigate = (path) => navigation.navigate(path);

  return (
    <View
      style={tw`w-screen h-screen bg-purple-100 flex flex-col items-center justify-center`}
    >
      <View
        style={tw`w-full h-auto flex flex-col items-center justify-center text-center gap-5`}
      >
        <LogoSvg />
        <Text style={[{ fontFamily: "ppSB" }, tw`text-white-100 text-[32px] `]}>
          Free Lunch
        </Text>
        <View
          style={tw`w-full flex flex-col items-center justify-center gap-5`}
        >
          <TouchableOpacity
            style={tw`w-full min-w-[280px] rounded-[10px] bg-purple-100 text-center py-4 px-4 bg-white-100`}
            onPress={() => navigate("Signup")}
          >
            <Text
              style={[
                { fontFamily: "ppSB" },
                tw`text-purple-100 text-center leading-[19px] text-[16px] `,
              ]}
            >
              Create Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`w-full min-w-[280px] rounded-[10px] bg-purple-100 text-center py-4 px-4 bg-white-100`}
            onPress={() => navigate("Login")}
          >
            <Text
              style={[
                { fontFamily: "ppSB" },
                tw`text-purple-100 text-center leading-[19px] text-[16px] `,
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
