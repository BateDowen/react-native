import React, { useState } from "react";
import { Button, Image, Modal, StyleSheet, TextInput, View } from "react-native";

const GoalInput = ({addGoal}) => {
    const [enteredGoalText,setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText)
      };
    function addGoalHandler() {
        addGoal(enteredGoalText);
        setEnteredGoalText('');

    }
    return (
        <Modal animationType="slide">
            <View style={styles.inputContainer}>
            <Image source={require('../assets/images/favicon.png')} />
            <TextInput
                style={styles.textInput}
                placeholder="Your coarse goal!"
                onChangeText={goalInputHandler}
                value={enteredGoalText}
            />
            <Button title="Add goal" onPress={addGoalHandler} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#311b6b'
       },
       textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 8,
        color: 'white'
       },
})
export default GoalInput;
