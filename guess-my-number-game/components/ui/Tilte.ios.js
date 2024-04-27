import { Platform, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/color';

export const Tilte = ({children}) => {
    console.log('ios');
    return (
    <Text style={styles.title}>
        {children}
    </Text>
);
};
const styles = StyleSheet.create({
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        // borderWidth: Platform.OS === 'android' ? 2 : 3,
        // borderWidth: Platform.select({android: 2, ios: 3}), // this dinamicly set code on diferent system
        borderWidth: 2,
        borderColor:'white',
        padding: 12
    }
})
