import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expenseReduser(state, action) {
  switch (action.type) {
    case "ADD":
      return [{ ...action.payload }, ...state];
    case "SET":
      return action.payload.reverse();
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;

      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}
function ExpensesContextProvider({ children }) {
  const [expensesState, dispach] = useReducer(expenseReduser, []);

  function addExpense(expenseData) {
    dispach({ type: "ADD", payload: expenseData });
  }
  function setExpense(expense) {
    dispach({ type: "SET", payload: expense });
  }
  function deleteExpense(id) {
    dispach({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    
    dispach({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }
  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpense: setExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
export default ExpensesContextProvider;
