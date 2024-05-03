import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { CategoryScreens } from "./screens/CategoryScreens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MealsOverViewScreen } from "./screens/MealsOverViewScreen";
import { MealDetailScreen } from "./screens/MealDetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FavoiritesScreen } from "./screens/FavoiritesScreen";
import { Ionicons } from "@expo/vector-icons";
import { FavoiritesContextProvider } from "./store/context/favoirites-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#ccc" },
        drawerContentStyle: { backgroundColor: "#3f2f25" },
        drawerInactiveTintColor: "white",
        drawerActiveTintColor: "#351401",
        drawerActiveBackgroundColor: "#e8af8e",
        
      }}
    >
      <Drawer.Screen
        name="MealsCategories"
        component={CategoryScreens}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favoirites"
        component={FavoiritesScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavoiritesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#351401" }, // this will apply to all screens
            headerTintColor: "white", // this will apply to all screens
            contentStyle: { backgroundColor: "#ccc" }, // this will apply to all screens
          }}
        >
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            options={{
               title: "All Categories",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MealsOverView"
            component={MealsOverViewScreen}
            // options={({route, navigation}) => {       // this is one way to set dinamic options
            //   const categoryId = route.params.categoryId;
            //   return {
            //     title: categoryId,
            //   }
            // }}
          />
          <Stack.Screen name="DetailScreen" component={MealDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </FavoiritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
