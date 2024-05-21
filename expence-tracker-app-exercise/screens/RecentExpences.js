import { View } from "react-native";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expense-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

export const RecentExpences = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function getExpenses() {
      // couse useEffect cannot be async func
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpense(expenses);
        
      } catch (error) {
        setError('Could not fetch expences!')
      }
      setIsFetching(false);

    }
    getExpenses();
  }, []);

  function errorHandler() {
    setError(null)
  }
  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }
  if (isFetching) {
    return <LoadingOverlay />
  }
  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallBackText="No expenses registered."
    />
  );
};
