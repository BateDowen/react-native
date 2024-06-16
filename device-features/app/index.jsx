import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import Map from "./screens/Map";
import IconsButton from "../components/UI/IconsButton";
import PlaceDetails from "./screens/PlaceDetails";
import { Colors } from "../constants/colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
export default function App() {
  console.log("index");
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    const initializeDb = async () => {
      try {
        const storedPlaces = await AsyncStorage.getItem("places");
        if (!storedPlaces) {
          await AsyncStorage.setItem("places", JSON.stringify([]));
          console.log("db is ready");
        }
      } catch (error) {
        console.error("Error initializing database:", error);
      } finally {
        setDbInitialized(true); // Mark DB initialization as complete
      }
    };
    initializeDb();
  }, []);
  if (!dbInitialized) {
    return <Text>No data base yet...</Text>;
  }
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            title: "Your favorite place",
            headerRight: ({ tintColor }) => (
              <IconsButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate("AddPlace")}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{ title: "Add a new Place" }}
        />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
          options={{ title: "Loading place..." }}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
