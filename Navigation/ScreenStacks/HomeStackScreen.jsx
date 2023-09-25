import React from "react";
import NavStack from "../Navstack";
import HomeScreen from "../NavigationScreen/Home";

const HomeStackScreen = () => {
  return (
    <NavStack.Navigator>
      <NavStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      {/* <NavStack.Screen name="OTP" component={OTPVerificationScreen} />
      <NavStack.Screen
        name="Withdraw"
        component={WithdrawScreen}
        options={{
          headerShown: false,
        }}
      />
      <NavStack.Screen
        name="IdentityVerification"
        component={IdentityVerificationScreen}
      />
      <NavStack.Screen name="WalletAction" component={WalletAction} /> */}
    </NavStack.Navigator>
  );
};

export default HomeStackScreen;
