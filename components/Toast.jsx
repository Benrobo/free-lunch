import { Animated, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import tw from "../config/tailwind";

export default class LunchToast {
  constructor(onPress, visibility = false) {
    this.onPress = onPress;
    this.visibility = visibility;
  }

  show(msg, title) {
    const [containerVisibility, setContainerVisibility] = React.useState(false);

    React.useEffect(() => {
      if (this.visibility) {
        setContainerVisibility(true);
      }
    }, [this.visibility, this.onPress]);

    return (
      <Container visibility={containerVisibility}>
        <ToastBox
          visibility={this.visibility}
          message={msg}
          title={title}
          onPressFunc={this.onPress}
          setContainerVisibility={setContainerVisibility}
        />
      </Container>
    );
  }
}

function ToastBox({
  message,
  onPressFunc,
  visibility,
  setContainerVisibility,
  title,
}) {
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const toastHeight = 500; // Customize the height as per your needs

  React.useEffect(() => {
    if (visibility) {
      showBox();
    } else {
      hideBox();
    }
  }, [visibility]);

  const showBox = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideBox = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setContainerVisibility(false);
    }, 1000);
  };

  return (
    <Animated.View
      style={[
        tw`w-full absolute  max-w-[330px] mx-auto h-auto px-4 py-5 rounded-[15px] bg-white-100 flex flex-col items-center justify-center text-center shadow-dark-100 shadow-2xl`,
        {
          shadowColor: "#000",
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [toastHeight, 0],
              }),
            },
          ],
        },
      ]}
    >
      <Text
        style={[
          tw`text-dark-100 text-[20px]`,
          {
            fontFamily: "ppSB",
          },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          tw`text-dark-100 mt-2 text-[14px] `,
          {
            fontFamily: "ppReg",
          },
        ]}
      >
        {message}
      </Text>
      <TouchableOpacity
        style={tw`min-w-full bg-purple-100 px-3 py-3 w-full text-center rounded-[10px] mt-2`}
        onPress={onPressFunc}
      >
        <Text
          style={[
            tw`text-white-100 text-center text-[15px]`,
            { fontFamily: "ppReg" },
          ]}
        >
          Got it
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function Container({ children, visibility }) {
  if (visibility === false) return null;
  return (
    <View
      style={[
        tw`w-full mx-auto h-full flex flex-col items-center justify-center absolute bottom-[100px] z-[10000] flex flex-col items-center justify-end `,
      ]}
    >
      {children}
    </View>
  );
}
