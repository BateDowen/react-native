import { useRoute } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import { MealItem } from "../components/MealList/MealItem";
import { useEffect, useLayoutEffect } from "react";
import { MealList } from "../components/MealList/MealList";

export const MealsOverViewScreen = ({ route, navigation }) => {
  // for nested components:
  // const router = useRoute();
  // console.log(router.params.categoryId);
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
      const categoryTitle = CATEGORIES.find((category) => category.id == catId).title;
      navigation.setOptions({
        title: categoryTitle
      })
  },[catId, navigation]);

 return <MealList items={displayedMeals} /> 
};

