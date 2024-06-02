
import AuthContent from "@/Auth/AuthContent";
import { Link } from "expo-router";
import { Alert, Text, View } from "react-native";
import { StatusBar } from "react-native";

import { useContext, useState } from "react";
import { login } from "./utils/auth";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { AuthContext } from "./store/auth-context";
import { Colors } from "@/constants/Colors";

export default function Login() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authContext = useContext(AuthContext);

  async function signUpHandler({
    email,
    password,
  }: {
    email: String;
    password: String;
  }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      console.log(token);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed", "Try again.");
    }
    setIsAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in..." />;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100
      }}
    >
      <StatusBar barStyle='dark-content' />
      <Text>Login</Text>
      <AuthContent isLogin={true} onAuthenticate={signUpHandler} />
    </View>
  );
}

