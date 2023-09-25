import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DataContext from "../context/DataContext";
import HomeStackScreen from "./ScreenStacks/HomeStackScreen";
import { Text, View } from "react-native";
import { Entypo, Feather, AntDesign } from "@expo/vector-icons";
import tw from "../config/tailwind";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RootNavigator() {
  const { isLoggedIn } = useContext(DataContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="MainHome"
        tabBar={(prop) => <MyTabBar {...prop} />}
      >
        <Tab.Screen
          name="MainHome"
          component={HomeStackScreen}
          options={{
            headerShown: false,
          }}
        />
        {/* <Tab.Screen
          name="Transactions"
          // component={TransactionStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          // component={SettingstackScreen}
          options={{ headerShown: false }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: "row" }} className="">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              tw`flex items-center justify-center`,
              {
                flex: 1,
                height: 70,
                backgroundColor: "#fff",
              },
            ]}
            key={index}
            // activeOpacity={0.95}
          >
            <View style={[tw`flex flex-col items-center justify-center `]}>
              {returnIconName(label, isFocused)}
              <Text
                style={[
                  `${isFocused ? "text-dark-100" : "text-white-400"}`,
                  {
                    fontFamily: isFocused ? "ppSB" : "ppReg",
                    fontSize: 12,
                  },
                ]}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function returnIconName(name, isFocused) {
  let icon = null;
  let routeName = name.toLowerCase();
  const size = 15;

  if (routeName === "home")
    icon = (
      <Entypo
        name="home"
        size={size}
        color={isFocused ? "#7C149B" : "#A3A3A3"}
      />
    );
  if (routeName === "transactions")
    icon = (
      <Feather
        name="employees"
        size={size}
        color={isFocused ? "#7C149B" : "#A3A3A3"}
      />
    );
  if (routeName === "profile")
    icon = (
      <AntDesign
        name="user"
        size={size}
        color={isFocused ? "#7C149B" : "#A3A3A3"}
      />
    );

  return icon;
}
