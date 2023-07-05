import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import chapters from './src/vocabularys/index';
import VocabularyList from './src/views/VocabularyList';
import {
  checkUpdate,
  downloadUpdate,
  switchVersionLater,
  isFirstTime,
  markSuccess,
  isRolledBack,
} from 'react-native-update';
import _updateConfig from './update.json';

const {appKey} = _updateConfig[Platform.OS];
const Drawer = createDrawerNavigator();
console.log(chapters);

function App(): JSX.Element {
  useEffect(() => {
    ToastAndroid.show('热更新版本', ToastAndroid.LONG);
    checkPatch();
    if (isFirstTime) {
      markSuccess();
      console.log('更新成功了');
      ToastAndroid.show('更新成功了', ToastAndroid.LONG);
    } else if (isRolledBack) {
      ToastAndroid.show('更新失败，已回滚', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('无操作', ToastAndroid.LONG);
    }
  }, []);

  const checkPatch = async () => {
    const info: any = await checkUpdate(appKey);
    const {update, upToDate} = info;
    if (update) {
      ToastAndroid.show('应用可更新', ToastAndroid.LONG);
      const hash = await downloadUpdate(
        info,
        // 下载回调为可选参数，从v5.8.3版本开始加入
        {
          onDownloadProgress: ({received, total}) => {
            // 已下载的字节数, 总字节数
            console.log(received, total);
          },
        },
      );
      if (!hash) {
        return;
      }
      switchVersionLater(hash);
    } else if (upToDate) {
      ToastAndroid.show('已是最新版本', ToastAndroid.LONG);
    } else {
      ToastAndroid.show('不可更新', ToastAndroid.LONG);
    }
  };

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
