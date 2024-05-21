import axios from "axios";

const BACKEND_URL =
  "https://react-native-project-a1e38-default-rtdb.europe-west1.firebasedatabase.app/";

export async function storeExpence(expenseData) {
  const responce = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = responce.data.name;
  return id;
}

export async function fetchExpenses() {
  const responce = await axios.get(BACKEND_URL + "/expenses.json");
  const expenses = [];

  for (const key in responce.data) {
    const expenseObj = {
      id: key,
      amount: responce.data[key].amount,
      date: new Date(responce.data[key].date),
      description: responce.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpence(id, expenceData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenceData);
}
export function deleteExpence(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
