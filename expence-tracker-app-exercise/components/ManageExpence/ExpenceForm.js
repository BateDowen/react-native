import { View, StyleSheet, Text, Alert, TextInputBase } from "react-native";
import { Input } from "./Input";
import { useState } from "react";
import { Button } from "../UI/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constants/styles";

export const ExpenceForm = ({
  submitButtonLabel,
  defaultValues,
  onSubmit,
  onCancel,
}) => {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true }, // example => amount : enteredValue
      };
    });
  }
  function submitHandler() {
    const expenceData = {
      amount: Number(inputValues.amount.value),
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };
    const amountIsvalid = !isNaN(expenceData.amount) && expenceData.amount > 0;
    const dateIsValid = expenceData.date !== "Ivalid Date";
    const descriptionIsValid = expenceData.description.trim().length > 0;
    if (!amountIsvalid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Ivalid input!", "Check your input values");
      setInputValues((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: amountIsvalid },
          date: { value: currInputs.date.value, isValid: dateIsValid },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }
    onSubmit(expenceData);
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={style.form}>
      <Text style={style.title}>Your Expense</Text>
      <View style={style.inputsRow}>
        <Input
          style={style.inputRow}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={style.inputRow}
          label="Date"
          invalid={!inputValues.date.isValid}
          textInputConfig={{
            placeholder: "DD-MM-YYYY",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputValues.description.isValid}
        textInputConfig={{
          multiline: true,
          // autoCorrect: false // default is true
          // autoCapitalize: 'none'
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={style.errorText}>
          Invalid input - please check your entered data!
        </Text>
      )}
      <View style={style.buttons}>
        <Button style={style.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={style.button} onPress={submitHandler}>
          {submitButtonLabel}
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
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
