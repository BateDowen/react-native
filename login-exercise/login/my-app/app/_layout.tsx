// import { Stack } from "expo-router";
// import { Colors } from "@/constants/Colors";
// import AuthContextProvider, { AuthContext } from "../app/store/auth-context.js";
// import { useContext } from "react";
import { Text } from "react-native";
import App from "./index";

// function AuthStack() {
//   return (
//     <Stack
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary500 },
//         headerTintColor: "white",
//         contentStyle: { backgroundColor: Colors.primary100 },
//       }}
//     >
//       {/* <Stack.Screen name="login" options={{title: 'Login'}} /> */}
//       <Stack.Screen name="SignupScreen" options={{ title: "Signup" }} />
//     </Stack>
//   );
// }
// function AuthenticatedStack() {
//   return (
//     <Stack
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary500 },
//         headerTintColor: "white",
//         contentStyle: { backgroundColor: Colors.primary100 },
//       }}
//     >

//       <Stack.Screen name="(tabs)" options={{ title: "Welcome" }} />
//     </Stack>
//   );
// }
// function Navigation() {
//   const authContext = useContext(AuthContext);

//   return (
//     <>
//     {!authContext.isAuthenticated && <AuthStack />}
//     {authContext.isAuthenticated && <AuthenticatedStack />}
//     </>
//   )
// }
export default function RootLayout() {
  return (
    <App />
      // <Text>kjlkjlk</Text>
    // <AuthContextProvider>
    //   <App />
    //   {/* <AuthStack /> */}
    //   {/* <Navigation /> */}
    //   {/* <Stack
    //     screenOptions={{
    //       headerStyle: { backgroundColor: Colors.primary500 },
    //       headerTintColor: "white",
    //       contentStyle: { backgroundColor: Colors.primary100 },
    //     }}
    //   > */}
      
    //      {/* <Stack.Screen name="(tabs)"  options={{ headerShown: false }}/> */}
    //     {/* <Stack.Screen name="SignupScreen" options={{ title: "Signup" }} /> */}
    //    {/* </Stack> */}
    // </AuthContextProvider>
  );


}
