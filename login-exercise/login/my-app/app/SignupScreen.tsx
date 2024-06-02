import { Stack } from "expo-router";
import AuthContent from "../Auth/AuthContent";
import { Alert, StatusBar, View } from "react-native";
import { createUser } from "./utils/auth";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "./store/auth-context";
import { Colors } from "@/constants/Colors";
function SignupScreen() {
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
      const token = await createUser(email, password);
      authContext.authenticate(token);
    } catch (error) {
      Alert.alert("Authentication failed", "Try again.");
    }
    setIsAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return (
    <View style={{backgroundColor: Colors.primary100, flex: 1}}>
      <AuthContent isLogin={false} onAuthenticate={signUpHandler} />

      <StatusBar barStyle='light-content' />

    </View>
  );
}

export default SignupScreen;
