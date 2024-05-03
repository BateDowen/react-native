import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export const CategoryGrid = ({ title, color, onPress }) => {
    // const navigate = useNavigation()
  return (
    <View style={style.gritItem}>
      <Pressable
        style={({ pressed }) => [
          style.button,
          pressed ? style.buttonPressed : null,
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPress}
        // onPress={() => navigate.navigate('MealsOverView')}
      >
        <View style={[style.iinerContainer, { backgroundColor: color }]}>
          <Text style={style.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};
// android_ripple is like hover effect only in android device
const style = StyleSheet.create({
  gritItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    backgroundColor: "white",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  button: {
    // this show the text inside otherwise is empty container
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  iinerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
