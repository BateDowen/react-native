import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { Button } from "../components/UI/Button";
import { ExpensesContext } from "../store/expense-context";
import { ExpenceForm } from "../components/ManageExpence/ExpenceForm";

export const ManageExpense = ({ route, navigation }) => {
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEdditing = !!editedExpenseId; // this makes a value to boolean

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdditing]);
  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenceData) {
    if (isEdditing) {
      expenseCtx.updateExpense(editedExpenseId, expenceData);
    } else {
      expenseCtx.addExpense(expenceData);
    }
    navigation.goBack();
  }

  return (
    <View style={style.container}>
      <ExpenceForm
        submitButtonHandler={isEdditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />

      {isEdditing && (
        <View style={style.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
