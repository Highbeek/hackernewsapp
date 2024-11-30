import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RootStackNavigator from './app/routes';
import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import {ToastProvider} from 'react-native-toast-notifications';
import CustomToast from './app/components/CustomToast';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './app/store/index';

const App = () => {
  return (
    <NavigationContainer onReady={() => BootSplash.hide({fade: true})}>
      {/* <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent
      /> */}
      <PaperProvider>
        <ReduxProvider store={store}>
          <ToastProvider
            placement="top"
            duration={5000}
            offset={50}
            animationType="slide-in"
            animationDuration={250}
            successColor="#3CD599"
            dangerColor="#D83030"
            warningColor="#e69b00"
            normalColor="gray"
            textStyle={{color: 'white'}}
            style={{elevation: 10, minHeight: 50}}
            renderType={{
              custom_toast: toast => <CustomToast toast={toast} />,
              custom_error_toast: toast => (
                <CustomToast toast={toast} variant="error" />
              ),
              custom_success_toast: toast => (
                <CustomToast toast={toast} variant="success" />
              ),
              custom_attention_toast: toast => (
                <CustomToast toast={toast} variant="warning" />
              ),
            }}
            swipeEnabled={true}>
            <RootStackNavigator />
          </ToastProvider>
        </ReduxProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
