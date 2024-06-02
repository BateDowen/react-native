import { Colors } from "@/constants/Colors";
import axios from "axios";
import { Stack } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "./store/auth-context";

function WelcomeScreen() {
  const [fetchMessage, setFetchedMessage] = useState();
  const authcontext = useContext(AuthContext);
  const token = authcontext.token;
  useEffect(() => {
    axios
      .get(
        "https://react-native-project-a1e38-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=" +
          token
      )
      .then((response) => setFetchedMessage(response.data));
  }, [token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.primary100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
