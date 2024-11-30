import React from 'react';
import {View, StyleSheet, Image, Linking, Alert} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';

const AboutScreen = ({navigation}: any) => {
  const handleLinkPress = url => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Unable to open link');
    });
  };
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/me.png')} style={styles.image} />

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.heading}>
            About Me
          </Text>
          <Text variant="bodyMedium" style={styles.text}>
            Hi! I'm a Front-end Developer with 3 years of experience
            specializing in web and mobile development using React and React
            Native. I excel at creating intuitive user interfaces, optimizing
            performance, and integrating secure APIs. My expertise lies in
            delivering applications that enhance user engagement and drive
            business success, particularly in the fintech and social networking
            sectors. Passionate about innovation, I thrive on solving complex
            problems and bringing impactful ideas to life through technology.
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.linksContainer}>
        <Text style={styles.contact}>📍 Lagos, Nigeria</Text>
        <Text style={styles.contact}>📧 ibukunagbo@gmail.com</Text>
        <Text style={styles.contact}>📞 +234 806 350 3788</Text>

        <Button
          mode="outlined"
          onPress={() =>
            handleLinkPress('https://linkedin.com/in/ibukunagboola')
          }
          style={styles.linkButton}>
          LinkedIn
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleLinkPress('https://github.com/highbeek')}
          style={styles.linkButton}>
          GitHub
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleLinkPress('https://codebyibk.netlify.app/')}
          style={styles.linkButton}>
          Portfolio
        </Button>
      </View>
      <Button
        mode="contained"
        onPress={handleLogout}
        style={styles.logoutButton}>
        Log Out
      </Button>
    </View>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 8,
  },
  heading: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  text: {
    lineHeight: 20,
    textAlign: 'justify',
  },
  linksContainer: {
    marginTop: 16,
  },
  contact: {
    marginBottom: 8,
    fontSize: 14,
  },
  linkButton: {
    marginVertical: 4,
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: '#d32f2f',
  },
});
