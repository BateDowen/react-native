import { Alert, FlatList, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Tilte } from "../components/ui/Tilte";
import { useEffect, useState } from "react";
import { NumberContainer } from "../components/game/NumberContainer";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { GuessLogItem } from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
let minBoundary = 1;
let maxBoundary = 100;

export const GameScreen = ({ userNumber, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCureentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const {width,height} = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", "You know this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndnum = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCureentGuess(newRndnum);
    setGuessRounds((prevRounds) => [newRndnum, ...prevRounds]);
  };

  const guessRoundListLenght = guessRounds.length;

  let content = 
  <>
  <Tilte>Opponent's guess</Tilte>
  <NumberContainer>{currentGuess}</NumberContainer>
  <View>
    <Text>Higher or lower?</Text>
    <View>
      <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
        <Ionicons name="remove-outline" size={24} color="white" />
      </PrimaryButton>
      <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
        <Ionicons name="add-outline" size={24} color="white" />
      </PrimaryButton>
    </View>
  </View>
  </>
  if (width > 500) {
    content = 
    <>
    <Tilte>Opponent's guess</Tilte>
    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
        <Ionicons name="remove-outline" size={24} color="white" />
      </PrimaryButton>
      <NumberContainer>{currentGuess}</NumberContainer>
      <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
        <Ionicons name="add-outline" size={24} color="white" />
      </PrimaryButton>
    </View>
    </>
  }
  return (
    <View style={styles.screen}>
      {content}
      <View style={styles.listItem}>
        {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
        <FlatList
          data={guessRounds}
          renderItem={({ item, index }) => (
            <GuessLogItem
              roundNumber={guessRoundListLenght - index}
              guess={item}
            />
          )}
          key={(round) => round}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ddb52f",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#ddb52f",
    padding: 12,
  },
  listItem :{
    flex: 1,
    padding: 12
  }
});
