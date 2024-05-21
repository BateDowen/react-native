import { useContext, useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { Button } from "../components/UI/Button";
import { ExpensesContext } from "../store/expense-context";
import { ExpenceForm } from "../components/ManageExpence/ExpenceForm";
import { deleteExpence, storeExpence, updateExpence } from "../utils/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

export const ManageExpense = ({ route, navigation }) => {
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEdditing = !!editedExpenseId; // this makes a value to boolean
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [error, setError] = useState();

  const selectedExpence = expenseCtx.expenses.find(
    (expence) => expence.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEdditing]);
  async function deleteExpenseHandler() {
    setIsSubmiting(true);
    try {
      await deleteExpence(editedExpenseId);
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expence.");
      setIsSubmiting(false);
    }
  }

  async function confirmHandler(expenceData) {
    setIsSubmiting(true);
    try {
      if (isEdditing) {
        await updateExpence(editedExpenseId, expenceData);
        expenseCtx.updateExpense(editedExpenseId, expenceData);
      } else {
        const id = await storeExpence(expenceData);
        expenseCtx.addExpense({ ...expenceData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data!");
      setIsSubmiting(false);
    }
  }
  function errorHandler() {
    setError(null);
  }
  if (error && !isSubmiting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  function cancelHandler() {
    navigation.goBack();
  }
  if (isSubmiting) {
    return <LoadingOverlay />;
  }
  return (
    <View style={style.container}>
      <ExpenceForm
        submitButtonLabel={isEdditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpence}
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
