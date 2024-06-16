import { View, StyleSheet, FlatList, Text } from "react-native";
import { PlaceItem } from "./PlaceItem";
import { Colors } from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";

export const PlacesList = ({ places }) => {
  const navigate = useNavigation();
  function selectPlaceHandler(id) {
    navigate.navigate("PlaceDetails", {
      placeId: id
    });
  }
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>No places yet- add some.</Text>
      </View>
    );
  }
  return (
    <FlatList
      style={{ margin: 24 }}
      data={JSON.parse(places)}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlaceHandler} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
