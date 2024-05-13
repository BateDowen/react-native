import { View, StyleSheet, Text } from "react-native";
import { Input } from "./Input";
import { useState } from "react";
import { Button } from "../UI/Button";

export const ExpenceForm = ({ submitButtonHandler, onSubmit, onCancel }) => {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: enteredValue, // example => amount : enteredValue
      };
    });
  }
  function submitHandler() {
    const expenceData = {
      amount: Number(inputValues.amount),
      date: new Date(inputValues.date),
      description: inputValues.description,
    };
    onSubmit(expenceData);
  };


  return (
    <View style={style.form}>
      <Text style={style.title}>Your Expense</Text>
      <View style={style.inputsRow}>
        <Input
          style={style.inputRow}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <Input
          style={style.inputRow}
          label="Date"
          textInputConfig={{
            placeholder: "DD-MM-YYYY",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          // autoCorrect: false // default is true
          // autoCapitalize: 'none'
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={style.buttons}>
        <Button style={style.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={style.button} onPress={submitHandler}>
          {submitButtonHandler}
        </Button>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  form: {
    marginTop: 30,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 15,
  },
  inputRow: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
