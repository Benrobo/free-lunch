import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function RootNavigator() {
  //   const { isAppLocked, isLoggedIn } = useContext(DataContext);
  const isLoggedIn = false;
  if (isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            // component={LockScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={(prop) => <MyTabBar {...prop} />}
      >
        <Tab.Screen
          name="Home"
          //   component={HomeStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Transactions"
          // component={TransactionStackScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Settings"
          // component={SettingstackScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
