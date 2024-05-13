import { View,StyleSheet,Text,TextInput } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export const Input = ({label,textInputConfig,style}) => {
    const inputStyles = [styles.input];
    if (textInputConfig && textInputConfig.multiline) {
     inputStyles.push(styles.inputMultiline);
    };

    return (
    <View style={[styles.inputContainer,style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={inputStyles} {...textInputConfig}/>
    </View>
);
};

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal: 4,
        marginVertical: 14,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    inputMultiline:{
        minHeight: 100,
        textAlignVertical: 'top'
    }
})