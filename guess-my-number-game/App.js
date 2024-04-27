import { ImageBackground, SafeAreaView, StyleSheet, } from "react-native";
import { StartGameScreen } from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { GameScreen } from "./screens/GameScreen";
import Colors from "./constants/color";
import { GameOverScreen } from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);

  const pickedNumberHandler =(pickedNumber) =>{
    setUserNumber(pickedNumber);
    setGameIsOver(false);

  };
  const gameOverHandler =(numberOfRounds) =>{
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);


  };
  const  startNewGameHandler =() =>{
    setUserNumber(null);
    setGuessRounds(0);

  };


  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  };
  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundNumber={guessRounds} onStartNewGame={startNewGameHandler} />
  }
         
  return (
    <LinearGradient colors={[Colors.primary600, Colors.accent500]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView> 
        {/* // this allow the content to be bellow the statusbar */}
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1, // this helps the container to get as much space as available aka the whole screene
  },
  backgroundImage:{
    opacity: 0.15
  }
});
