import { View, StyleSheet } from "react-native";
import { PlaceForm } from "../../components/Places/PlaceForm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
export default function AddPlace({ navigation }) {
  const [places, setPlaces] = useState([]);
  console.log('addplace');
  useEffect(() => {
    const getPlacesArr = async () => {
      try {
        const storedPlaces = await AsyncStorage.getItem("places");
        if (storedPlaces) {
          const parsedPlaces = JSON.parse(storedPlaces);
          setPlaces(parsedPlaces); // Set initial places if available
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPlacesArr();
  }, []);
  async function createPlaceHandler(place) {
    try {
      // Update existing places (assuming unique place objects)
      const updatedPlaces = [...places, place];
      await AsyncStorage.setItem("places", JSON.stringify(updatedPlaces));
      setPlaces(updatedPlaces); // Update state for immediate UI reflection
    } catch (error) {
      console.error("Error creating place:", error);
    }
    navigation.navigate("AllPlaces");
  }


  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

const styles = StyleSheet.create({});
