import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { Tilte } from "../components/ui/Tilte";
import Colors from "../constants/color";
import { PrimaryButton } from "../components/ui/PrimaryButton";

export const GameOverScreen = ({roundNumber, userNumber, onStartNewGame}) => {
  return (
    <View style={style.rootCOntainer}>
      <Tilte>GAME OVER!</Tilte>
      <View style={style.imageContainer}>
        <Image
          style={style.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={{ fontSize: 24, textAlign: "center", marginBottom: 24 }}>
        Your phone needed <Text style={style.highLight}>{roundNumber}</Text> rounds to guess
        number <Text style={style.highLight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Start new game.</PrimaryButton>
    </View>
  );
};
const deviceWidth = Dimensions.get('window').width
const style = StyleSheet.create({
  rootCOntainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: deviceWidth < 380 ? 150 : 300 ,
    height: deviceWidth < 380 ? 150 : 300 ,
    borderRadius: deviceWidth < 380 ? 75 : 150 ,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highLight: {
    color: Colors.primary500,
    fontWeight: "bold",
  },
});
