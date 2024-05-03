import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
export const IconButton = ({onPress, name,color}) => {
    return (
    <Pressable onPress={onPress} style={({pressed}) => pressed ? styles.pressed : null}>
        <Ionicons name={name} size={24} color={color} />
    </Pressable>
);
};
const styles = StyleSheet.create({
    pressed:{
        opacity: 0.5,
    }
})