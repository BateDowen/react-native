import { View, StyleSheet, Alert, Text } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from "../../constants/colors";
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function LocationPicker({ onPickLocation }) {
  const [locationPermissionsInfo, requestPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();
  const navigaion = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLocation.lat,
        lng: route.params.pickedLocation.lng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);
  useEffect(() => {
    onPickLocation(pickedLocation);
  }, [pickedLocation, onPickLocation]);
  async function verifyPermissions() {
    if (locationPermissionsInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (locationPermissionsInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Unsuffitient Permission",
        "You need to grant location permissions to use this app"
      );
      return false;
    }
    return true;
  }
  async function getLocatonHandler() {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log(location);
  }
  function pickOnMapHandler() {
    navigaion.navigate("Map");
  }
  let imagePreview = <Text>No location picked yet.</Text>;
  if (pickedLocation) {
    console.log(pickedLocation);
    imagePreview = (
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: pickedLocation.lat,
          longitude: pickedLocation.lng,
        }}
      >
        <Marker
          coordinate={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
          }}
        />
      </MapView>
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{imagePreview}</View>
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocatonHandler}>
          Locate user
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on map
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 160,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  mapView: { width: "100%", height: "100%", borderRadius: 4 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
