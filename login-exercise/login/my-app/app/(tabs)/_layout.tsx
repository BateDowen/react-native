import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";

export default function AuthenticatedLayout (){
    console.log('second lay');
    return (
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: "white",
            contentStyle: { backgroundColor: Colors.primary100 },
          }}
        >
    
          <Stack.Screen name="WelcomeScreen" options={{ title: "Welcome" }} />
        </Stack>
      );
} 