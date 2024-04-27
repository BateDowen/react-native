import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [coarseGoals,setCoarseGoals] = useState([]);
  const [modalIsVisable,setModalIsVisable] = useState(false);

  function modalHandler() {
    setModalIsVisable(true)
  }
  
  function addGoalHandler(enteredGoalText) {
    setCoarseGoals(currentCoarseGoals => 
      [...currentCoarseGoals,
         {text: enteredGoalText, id: Math.random().toString()}])
    setModalIsVisable(false)

  }
  function deleteGoalHandler(id) {
    setCoarseGoals(currentCoarseGoals => {
     return currentCoarseGoals.filter(goal => goal.id !== id)
      })
  }
  return (
    <>
    <StatusBar style='auto'/>
      <View style={styles.appContainer}>
        <Button title='Add Goal' onPress={modalHandler} />
        {modalIsVisable && <GoalInput addGoal={addGoalHandler} />}
        <View style={styles.goalsContainer}>
          <FlatList 
            data={coarseGoals} 
            renderItem={ itemData => {
              return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler}/>
            }}
            key={(item,index) => item.id}
            alwaysBounceVertical={false} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16
  },
   
   goalsContainer:{
    flex: 5,
   }
});
