import React, { useState } from "react";
import { Text, View } from "react-native";
import Layout from "../../../components/Layout";
import TopBar from "../../../components/TopBar";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Gap from "../../../components/Gap";
import tw from "../../../config/tailwind";
import { Octicons } from "@expo/vector-icons";
import LunchToast from "../../../components/Toast";

function LoginScreen({ navigation }) {
  const [showLunchToast, setShowLunchToast] = React.useState(false);
  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const navigateToSignup = () => navigation.push("Signup");

  const lunchToast = new LunchToast(
    () => setShowLunchToast(false),
    showLunchToast
  );

  return (
    <>
      <TopBar title="Sign In" onClick={() => navigation.navigate("BaseAuth")} />
      <Layout useSafeAreaView={true}>
        <ScrollView
          style={[
            tw`h-full`,
            {
              flex: 1,
              marginVertical: 6,
            },
          ]}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Gap h={30} />
          <View
            style={tw`w-full px-4 flex flex-col items-center justify-start gap-4`}
          >
            <View style={tw`w-full flex flex-col items-start justify-start`}>
              <Text style={[tw`text-white-400`, { fontFamily: "ppReg" }]}>
                Email
              </Text>
              <TextInput
                style={[
                  tw`w-full px-4 py-3 rounded-[10px] text-dark-100 border-solid border-[1px] border-white-500 text-[14px]`,
                  { fontFamily: "ppSB" },
                ]}
                selectionColor={"#777"}
              />
            </View>

            <View
              style={tw`w-full relative min-w-[160px] flex flex-col items-start justify-start gap-2`}
            >
              <View style={tw`w-full flex flex-row items-center justify-start`}>
                <Text style={[tw`text-white-400`, { fontFamily: "ppReg" }]}>
                  Password
                </Text>
                <TouchableOpacity
                  style={tw` ml-2`}
                  onPress={() => setIsPwdVisible(!isPwdVisible)}
                >
                  <Octicons
                    name={isPwdVisible ? "eye" : "eye-closed"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              <TextInput
                style={[
                  tw`w-full px-4 py-3 rounded-[10px] text-dark-100 border-solid border-[1px] border-white-500 text-[14px]`,
                  { fontFamily: "ppSB" },
                ]}
                selectionColor={"#777"}
                placeholder=""
                secureTextEntry={!isPwdVisible}
              />
            </View>
            <Gap h={200} />
            <View
              style={tw`w-full flex flex-col items-center justify-center gap-5`}
            >
              <TouchableOpacity
                style={tw`min-w-full min-h-[60px] flex items-center justify-center rounded-[10px] bg-purple-100 text-center py-4 px-5  bg-purple-100`}
                onPress={() => navigate("Login")}
              >
                <Text
                  style={[
                    { fontFamily: "ppSB" },
                    tw`text-white-100 text-center leading-[19px] text-[16px] `,
                  ]}
                >
                  Sign In
                </Text>
              </TouchableOpacity>
              <View
                style={[
                  { fontFamily: "ppSB" },
                  tw`flex flex-row items-center justify-center`,
                ]}
              >
                <Text
                  style={[
                    { fontFamily: "ppSB" },
                    tw`text-white-400 flex flex-row items-center justify-start text-center text-[13px] `,
                  ]}
                >
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text
                    style={[tw`text-orange-200 ml-2`, { fontFamily: "ppSB" }]}
                  >
                    Create one.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Gap h={200} />
        </ScrollView>

        {/* Alert message */}
        {lunchToast.show("Message", "title")}
      </Layout>
    </>
  );
}

export default LoginScreen;
