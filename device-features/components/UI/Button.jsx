import { View, StyleSheet, Pressable, Text } from "react-native";
import { Colors } from "../../constants/colors";
export default function Button({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.pressed, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    margin: 4,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    borderRadius: 4
  },
  pressed: { opacity: 0.7 },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.primary50,
  },
});
