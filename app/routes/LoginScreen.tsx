import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Image} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {s} from 'react-native-size-matters';
import {openDatabase} from 'react-native-sqlite-storage';
import {useToast} from 'react-native-toast-notifications';

const db = openDatabase({name: 'UserDB.db'});

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  useEffect(() => {
    db.transaction((tx: {executeSql: (arg0: string) => void}) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)',
      );
    });
  }, []);

  const handleLogin = () => {
    if (!username || !password) {
      toast.show('Please fill in all fields', {
        type: 'danger',
        animationDuration: 150,
        data: {title: 'Validation error'},
      });
      return;
    }

    db.transaction((tx: any) => {
      tx.executeSql(
        'SELECT * FROM Users WHERE username = ? AND password = ?',
        [username, password],
        (_: any, {rows: {length}}: any) => {
          if (length > 0) {
            navigation.replace('Tabs');
          } else {
            toast.show('Invalid credentials, please try again', {
              type: 'danger',
              animationDuration: 150,
              data: {title: 'Login error'},
            });
          }
        },
        (error: any) => {
          console.error('Error executing SQL:', error.message);
          toast.show(error.message, {
            type: 'danger',
            animationDuration: 150,
            data: {title: 'Login error'},
          });
          Alert.alert('An error occurred. Please try again.');
        },
      );
    });
  };

  const handleRegister = () => {
    if (!username || !password) {
      toast.show('Please fill in all fields', {
        type: 'danger',
        animationDuration: 150,
        data: {title: 'Validation error'},
      });
      return;
    }

    db.transaction((tx: any) => {
      tx.executeSql(
        'INSERT INTO Users (username, password) VALUES (?, ?)',
        [username, password],
        () => {
          toast.show('Registration successful', {
            type: 'success',
            animationDuration: 150,
            data: {title: 'Registration Success'},
          });
          navigation.replace('Tabs');
        },
        (error: any) => {
          console.error('Error executing SQL:', error.message);
          toast.show('An error occurred during registration', {
            type: 'danger',
            animationDuration: 150,
            data: {title: 'Registration Error'},
          });
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../assets/logo.png')} style={styles.img} />
      </View>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        disabled={!username || !password}>
        Login
      </Button>

      <Button
        mode="outlined"
        onPress={handleRegister}
        style={styles.button}
        disabled={!username || !password}>
        Register
      </Button>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 8,
  },
  img: {
    width: s(200),
    height: s(200),
    resizeMode: 'contain',
  },
  imgContainer: {
    alignItems: 'center',
  },
});
