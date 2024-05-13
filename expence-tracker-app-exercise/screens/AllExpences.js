import { View } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expense-context";

export const AllExpences = () => {
  const expenseCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensesPeriod="Total"
      fallBackText="No registered expenses found."
    />
  );
};
