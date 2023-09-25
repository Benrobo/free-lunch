import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import DataContext from "../context/DataContext";
import HomeStackScreen from "./ScreenStacks/HomeStackScreen";
import { Text, View } from "react-native";
import {
  Entypo,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import tw from "../config/tailwind";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function RootNavigator() {
  const { isLoggedIn } = useContext(DataContext);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home1"
        activeColor="#7C149B"
        barStyle={{ backgroundColor: "#fff" }}
      >
        <Tab.Screen
          name="Home1"
          component={HomeStackScreen}
          options={({ route }) => ({
            tabBarLabel: ({ focused }) => (
              <Text style={console.log({ route, focused })}>Home</Text>
            ),
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          })}
        />
        <Tab.Screen
          name="Employees1"
          component={HomeStackScreen}
          options={{
            tabBarLabel: (
              <Text style={([tw``], { fontFamily: "ppSB", fontSize: 15 })}>
                Employees
              </Text>
            ),
            fontFamily: "ppSB",
            tabBarIcon: ({ color }) => (
              <Feather name="users" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile1"
          component={HomeStackScreen}
          options={{
            tabBarLabel: (
              <Text style={([tw``], { fontFamily: "ppSB", fontSize: 15 })}>
                Profile
              </Text>
            ),
            fontFamily: "ppSB",
            tabBarIcon: ({ color }) => (
              <AntDesign name="user" color={color} size={26} />
            ),
          }}
        />
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

        console.log({ label });

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

  if (routeName === "Home1")
    icon = (
      <Entypo
        name="home"
        size={size}
        color={isFocused ? "#7C149B" : "#A3A3A3"}
      />
    );
  if (routeName === "Employees")
    icon = (
      <Feather
        name="users"
        size={size}
        color={isFocused ? "#7C149B" : "#A3A3A3"}
      />
    );
  if (routeName === "Profile1")
    icon = (
      <AntDesign
        name="user"
        size={size}
        color={isFocused ? "#7C149B" : "#A3A3A3"}
      />
    );

  return icon;
}
