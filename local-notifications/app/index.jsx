import { Colors } from "@/constants/Colors";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
async function requestNotificationPermissions() {
  const  {status: existingStatus} = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    return await Notifications.requestPermissionsAsync({
      ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
      },
      });
  }

  if (finalStatus !== 'granted') {
   Alert.alert('Failed to get notification permissions!');
    return;
  }
  const pushTokenData = await Notifications.getExpoPushTokenAsync();
  console.log(pushTokenData);
}
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});
export default function Index() {
  const [hasPermission, setHasPermission] = useState(false);
 
  useEffect(() => {
    requestNotificationPermissions().then(() => setHasPermission(true));
  }, []);

  function scheduleNotificationsHandler() {
    if (hasPermission) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "My first notification",
          body: "This is the body",
          data: {
            username: "Miro",
          },
        },
        trigger: {
          seconds: 3,
        },
      });
    } else {
      Alert.alert('Please grant notification permissions!');
    }
  }
  useEffect(()=>{
    const subscripton = Notifications.addNotificationResponseReceivedListener((resp)=>{
      console.log('Received');
    })
    return () =>{
      subscripton.remove()
    }
  },[])
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title="Schedule Notifications"
        onPress={scheduleNotificationsHandler}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
});
