import { Colors } from "@/constants/Colors";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "./SignupScreen";
import { useContext, useEffect } from "react";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import WelcomeScreen from "./WelcomeScreen";
import { StatusBar } from "react-native";
import Login from "./login";
import { NavigationContainer } from "@react-navigation/native";
import IconButton from "@/components/UI/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        
      }}
    >
      
      <Stack.Screen name="login" component={Login}  />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authContext = useContext(AuthContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        
      }}
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}  options={{
        headerRight: ({tintColor}) => 
          <IconButton icon='exit-outline' color={`${tintColor}`} size={24} onPress={authContext.logout} />
        
      }}/>
    </Stack.Navigator>
  );
}

function Navigation() {
  const authContext = useContext(AuthContext);
  console.log(authContext);
  return (
    <>
     {/* <NavigationContainer> */}
      {!authContext.isAuthenticated && <AuthStack />}
      {authContext.isAuthenticated && <AuthenticatedStack />}
    {/* </NavigationContainer> */}
    </>
  );
}
function Root() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authContext.authenticate(storedToken)
      }
    }
    fetchToken();
  }, []);
  return <Navigation />
}
export default function App() {
  return (
    <>
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

// import AuthContent from "@/Auth/AuthContent";
// import { Link } from "expo-router";
// import { Alert, Text, View } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { useContext, useState } from "react";
// import { login } from "./utils/auth";
// import LoadingOverlay from "@/components/UI/LoadingOverlay";
// import { AuthContext } from "./store/auth-context";

// export default function Login() {
//   const [isAuthenticating, setIsAuthenticating] = useState(false);
//   const authContext = useContext(AuthContext);
// console.log('index');

//   async function signUpHandler({
//     email,
//     password,
//   }: {
//     email: String;
//     password: String;
//   }) {
//     setIsAuthenticating(true);
//     try {
//       const token = await login(email, password);
//       authContext.authenticate(token);
//     } catch (error) {
//       Alert.alert("Authentication failed", "Try again.");
//     }
//     setIsAuthenticating(false);
//   }
//   if (isAuthenticating) {
//     return <LoadingOverlay message="Logging in..." />;
//   }
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <AuthContent isLogin={true} onAuthenticate={signUpHandler} />
//       <StatusBar style="light" />
//     </View>
//   );
// }
