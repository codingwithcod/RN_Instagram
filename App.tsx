import {StatusBar, StyleSheet, Text, View, useColorScheme} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider} from '@shopify/restyle';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import theme from './src/themes';
import {p} from './src/themes/light';

const App = () => {
  const themeMode = useColorScheme();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        backgroundColor={themeMode === 'dark' ? p.black : '#fff'}
        barStyle={themeMode === 'dark' ? 'light-content' : 'dark-content'}
      />
      <ThemeProvider theme={theme}>
        <SafeAreaProvider style={{flex: 1}}>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
