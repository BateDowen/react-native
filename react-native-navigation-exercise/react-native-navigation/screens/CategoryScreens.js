import { FlatList, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import { CategoryGrid } from "../components/CategoryGrid";

export const CategoryScreens = ({navigation}) => {
    function renderCategoryItem(itemData) {
        function pressHandler() {
            navigation.navigate('MealsOverView', {
                categoryId: itemData.item.id
            });
        };

        return (
        <CategoryGrid title={itemData.item.title} color={itemData.item.color} onPress={pressHandler}/>
        );
    };

  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={2}
    />
  );
};
