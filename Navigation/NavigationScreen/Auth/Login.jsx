import React, { useContext, useEffect, useState } from "react";
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
import { LoaderScreen, Spinner } from "../../../components/Loader";
import { useMutation } from "react-query";
import { isEmpty, sleep } from "../../../utils";
import CustomToast from "../../../components/Notification/Toast";
import DataContext from "../../../context/DataContext";
import { HandleLoginResponse } from "../../../utils/response";
import { login } from "../../../http";

const lunchNotif = new CustomToast(150, 3);

function LoginScreen({ navigation }) {
  const { setIsLoggedIn } = useContext(DataContext);
  const [showLunchToast, setShowLunchToast] = React.useState(false);
  const [toastInfo, setToastInfo] = useState({
    msg: "",
    title: "",
  });
  const [successFulLogin, setSuccessFulLogin] = useState(false);
  const [isPwdVisible, setIsPwdVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const loginMutation = useMutation(async (data) => await login(data));

  const navigateToSignup = () => navigation.push("Signup");
  const handleInputChange = (type, val) =>
    setDetails((prev) => ({ ...prev, [type]: val }));

  const lunchToast = new LunchToast(
    () => setShowLunchToast(false),
    showLunchToast
  );

  const clearMutationState = () => {
    loginMutation.reset();
  };

  useEffect(() => {
    const { data, error } = loginMutation;
    console.log({ error, data });
    if (typeof data !== "undefined" || error !== null) {
      const response = data;
      HandleLoginResponse(response, clearMutationState, () =>
        setSuccessFulLogin(true)
      );
    }
  }, [loginMutation.data, loginMutation.error]);

  useEffect(() => {
    if (successFulLogin) {
      setIsLoggedIn(true);
    }
  }, [successFulLogin]);

  async function handleLogin() {
    if (isEmpty(details.email)) {
      lunchNotif.error("Email is required");
      return;
    }
    if (isEmpty(details.password)) {
      lunchNotif.error("Password is required");
      return;
    }
    loginMutation.mutate(details);
  }

  return (
    <>
      <TopBar title="Sign In" onClick={() => navigation.navigate("BaseAuth")} />

      {/* loader */}
      {loading && <LoaderScreen />}

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
                onChangeText={(txt) => handleInputChange("email", txt)}
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
                onChangeText={(txt) => handleInputChange("password", txt)}
              />
            </View>
            <Gap h={200} />
            <View
              style={tw`w-full flex flex-col items-center justify-center gap-5`}
            >
              <TouchableOpacity
                style={tw`min-w-full min-h-[60px] flex items-center justify-center rounded-[10px] bg-purple-100 text-center py-4 px-5  bg-purple-100`}
                onPress={handleLogin}
                disabled={loginMutation.isLoading}
              >
                {!loginMutation.isLoading ? (
                  <Text
                    style={[
                      { fontFamily: "ppSB" },
                      tw`text-white-100 text-center leading-[19px] text-[16px] `,
                    ]}
                  >
                    Sign In
                  </Text>
                ) : (
                  <Spinner color={"#fff"} size="small" />
                )}
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
        {lunchToast.show(toastInfo.msg, toastInfo.title)}
      </Layout>
    </>
  );
}

export default LoginScreen;
