import { Colors } from "@/constants/colors";
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { View, StyleSheet, Button, Alert, Image,Text } from "react-native";
import OutlineButton from "../UI/OutlineButton";
export default function ImagePick({onTakeImage}) {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermitionInfo, requestPermition] = useCameraPermissions();
  async function verifyPermitions() {
    if (cameraPermitionInfo.status === PermissionStatus.UNDETERMINED) {
      const permitionResponse = await requestPermition();

      return permitionResponse.granted;
    }
    if (cameraPermitionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Unsuffitient Permition",
        "You need to grant camera permitions to use this app"
      );
      return false;
    }
    return true;
  }
  async function takeImageHandler(params) {
    const hasPermition = await verifyPermitions();
    if (!hasPermition) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri)
  }
  let imagePreview = <Text>No image taken yet.</Text>;
  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>Take Image</OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
    imagePreview:{
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: '100%',
        height: '100%'
    }
});
