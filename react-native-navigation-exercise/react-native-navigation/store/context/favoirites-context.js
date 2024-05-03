import { createContext, useState } from "react";

export const FavoiritesContext = createContext({
  ids: [],
  addFavoirite: (id) => {},
  removeFavoirite: (id) => {},
});

export const FavoiritesContextProvider = ({ children }) => {
  const [favMealIds, setFavMealIds] = useState([]);

  const addFavoirite = (id) => {
    setFavMealIds((currentId) => [...currentId, id]);
  };
  const removeFavoirite = (id) => {
    setFavMealIds((currentId) => currentId.filter((mealId) => mealId !== id));
  };
  const value = {
    ids: favMealIds,
    addFavoirite: addFavoirite,
    removeFavoirite: removeFavoirite
  }
  return <FavoiritesContext.Provider value={value}>{children}</FavoiritesContext.Provider>;
};
