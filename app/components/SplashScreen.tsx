import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const SplashScreen = ({navigation}: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Hacker News</Text>
      <Text variant="bodyLarge">Your daily tech news digest</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff6600',
  },
});

export default SplashScreen;
