import { StyleSheet, Text, View } from 'react-native';
import { MealList } from '../components/MealList/MealList';
import { useContext } from 'react';
import { FavoiritesContext } from '../store/context/favoirites-context';
import { MEALS } from '../data/dummy-data';

export const FavoiritesScreen = () => {

    const favoriteMealsCtx = useContext(FavoiritesContext);

    const favoriteMeals = MEALS.filter(meal => favoriteMealsCtx.ids.includes(meal.id));

    if (favoriteMeals.length === 0) {
        return <View style={style.rootContainer}>
            <Text style={style.text}>You have no favorite meals yet!</Text>
        </View>
    }
    return (
    <MealList items={favoriteMeals} />
);
};
const style = StyleSheet.create({
    rootContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#351401'
    }
})