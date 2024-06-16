import { Ionicons } from '@expo/vector-icons';
import { View,StyleSheet, Pressable, Text } from 'react-native';
import { Colors } from "../../constants/colors";
export default function OutlineButton ({icon,children,onPress})  {
    return (
    <Pressable style={({pressed})=>[styles.buttton,pressed && styles.pressed]} onPress={onPress}>
        <Ionicons style={styles.icon} name={icon} size={24} color={Colors.primary500} />
        <Text style={styles.text}>{children}</Text>
    </Pressable>
);
};

const styles = StyleSheet.create({
    buttton:{
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary500,
    },
    pressed:{
        opacity: 0.7
    },
    icon:{
        marginRight: 6
    },
    text:{
        color: Colors.primary500,

    },
})