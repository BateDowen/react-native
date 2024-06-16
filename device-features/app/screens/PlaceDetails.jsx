import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import OutlineButton from "../../components/UI/OutlineButton";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function PlaceDetails({ route, navigation }) {
  const selectedPlaceId = route.params.placeId;
  const [fetchedPlace, setFetchedPlace] = useState();
  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }
  useEffect(() => {
    async function loadPlaceData() {
      const fetchePlaces = await AsyncStorage.getItem("places");
      const selectedPlace = JSON.parse(fetchePlaces).find(
        (place) => place.id === selectedPlaceId
      );
      setFetchedPlace(selectedPlace);
      navigation.setOptions({
        title: selectedPlace.title,
      });
    }
    loadPlaceData();
  }, [selectedPlaceId]);
  if (!fetchedPlace) {
    return (
      <View style={styles.fallBackText}>
        <Text>Loading Place Data...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>
            {fetchedPlace.title}: {fetchedPlace.location.lat}
          </Text>
        </View>
        <OutlineButton icon="map" onPress={showOnMapHandler}>
          View on map
        </OutlineButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallBackText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
