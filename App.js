import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useBatteryLevel} from 'react-native-device-info';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import BackgroundTimer from 'react-native-background-timer';
import Sound from 'react-native-sound';

const App = () => {
  const [batteryLimit, setBatteryLimit] = React.useState(30);
  const batteryLevel = useBatteryLevel(); // 0.759999

  React.useEffect(() => {
    // playSound();
    return () => {};
  }, []);

  const playSound = () => {
    Sound.setCategory('Playback');
    try {
      const sound = new Sound(
        'security-breach-alarm.mp3',
        Sound.MAIN_BUNDLE,
        error => {
          if (error) {
            console.log('failed to load the sound', error);
            return;
          }
          sound.play(() => sound.release());
        },
      );
      sound.play();
    } catch (error) {
      console.log(error.message);
    }
  };

  BackgroundTimer.setInterval(() => {
    if (batteryLevel !== null && batteryLevel === 0.4) {
      console.log(batteryLevel);
    }
  }, 3000);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Set alarm for battery level: </Text>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setBatteryLimit}
          value={batteryLimit.toString()}
          placeholder="Enter battery level"
          keyboardType="numeric"
          onSubmitEditing={() => {
            console.log(batteryLimit);
          }}
        />
        <Button title="Test" onPress={playSound} />
      </SafeAreaView>
      <Text style={styles.h1}>
        Your current battery level: {`${Math.floor(batteryLevel * 100)}%`}
      </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  h1: {
    fontSize: 30,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    width: 60,
    borderRadius: 4,
  },
});
