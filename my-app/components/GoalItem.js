import { Pressable, StyleSheet, Text, View } from "react-native";

const GoalItem = ({text,id, onDeleteItem}) => {
  return (
    <Pressable onPress={onDeleteItem.bind(this, id)} style={({pressed}) => pressed && styles.pressedItem}>
        <View style={styles.goalItem}>
        <Text style={styles.goalText}>{text}</Text>
        </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc',
      },
      goalText: {
        color: 'white'
      },
      pressedItem: {
        opacity: 0.5,
        
      }
})
export default GoalItem;
