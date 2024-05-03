import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import { MealDetails } from "../components/MealDetails";
import { useContext, useLayoutEffect } from "react";
import { IconButton } from "../components/IconButton";
import { FavoiritesContext } from "../store/context/favoirites-context";

export const MealDetailScreen = ({ route, navigation }) => {
    const favoiriteMealCtx = useContext(FavoiritesContext);

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  const mealIsFav = favoiriteMealCtx.ids.includes(mealId);
  
  const changeFavoiriteSatusHandler = () =>{
    if (mealIsFav) {
        favoiriteMealCtx.removeFavoirite(mealId);
    } else {
        favoiriteMealCtx.addFavoirite(mealId);
    }
  }
  useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => {
            return <IconButton onPress={changeFavoiriteSatusHandler} name={mealIsFav ? 'star' : 'star-outline'} color={'white'}/>
        }
    })
  },[navigation,changeFavoiriteSatusHandler])
  return (
    <ScrollView>
      {/* if the image is from uri, you have to set width and height to display it  */}
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listContainer}>
        <Text style={styles.subTitle}>Ingredients</Text>
        {selectedMeal.ingredients.map(
          (
            ingredient // it's not with Flatlist couse the list is not to long
          ) => (
            <Text key={ingredient} style={styles.list}>
              {ingredient}
            </Text>
          )
        )}
        <Text style={styles.subTitle}>Steps</Text>
        {selectedMeal.steps.map((step) => (
          <Text key={step} style={styles.list}>
            {step}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "#351401",
  },
  detailText: {
    color: "#351401",
  },
  subTitle: {
    color: "#351401",
    fontSize: 18,
    fontWeight: "bold",
    margin: 6,
    textAlign: "center",
  },
  list: {
    marginHorizontal: 20,
    paddingVertical: 3,
    color: "#351401",
  },
  listContainer:{
    marginVertical: 25
  }
});
