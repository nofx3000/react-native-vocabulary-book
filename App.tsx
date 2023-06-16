import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import chapters from './src/vocabularys/index';
import VocabularyList from './src/views/VocabularyList';

const Drawer = createDrawerNavigator();
console.log(chapters);

function App(): JSX.Element {
  const renderDirectory = () => {
    const directory = [];
    for (let chapter in chapters) {
      directory.push(
        <Drawer.Screen
          name={chapter + ': ' + chapters[chapter].name}
          component={VocabularyList}
          initialParams={{chapter: chapters[chapter]}}
        />,
      );
    }
    return directory;
  };

  return (
    <SafeAreaProvider style={styles.root}>
      <StatusBar />
      <NavigationContainer>
        <Drawer.Navigator>{renderDirectory()}</Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});

export default App;
