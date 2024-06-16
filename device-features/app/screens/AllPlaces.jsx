import { View, StyleSheet, StatusBar } from "react-native";
import { PlacesList } from "../../components/Places/PlacesList";
import { Colors } from "@/constants/colors";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  console.log('allplaces');

  useEffect(() => {
    async function loadPlaces() {
      const fetchedPlaces = await AsyncStorage.getItem("places");

      setLoadedPlaces(fetchedPlaces);
    }
    if (isFocused) {
      loadPlaces();
      console.log('focus');
    }
  }, [isFocused]);
  return (
    <>
      <PlacesList places={loadedPlaces} />
    </>
  );
}

const styles = StyleSheet.create({});
