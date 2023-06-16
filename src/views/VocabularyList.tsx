import React, {useState, FC} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

import icon_switch from '../assets/icon_switch.png';

function App({route, navigation}): JSX.Element {
  const [switched, setSwitched] = useState<boolean>(false);
  const chapter: ChapterInter = route.params.chapter;
  return (
    <View style={styles.root}>
      {chapter.vocabularys.map((item: VocabularyInter) => {
        return (
          <VocabularayContainer item={item} key={item.en} switched={switched} />
        );
      })}
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => {
          setSwitched(!switched);
        }}>
        <Image source={icon_switch} style={styles.switchIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    paddingLeft: 20,
  },
  switchButton: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    position: 'absolute',
    bottom: 30,
    right: 30,
    borderRadius: 20,
    padding: 5,
  },
  switchIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

const VocabularayContainer: FC<VocabularyContainerProps> = (
  props,
): JSX.Element => {
  const {item, switched} = props;
  const [showTrans, setShowTrans] = useState<boolean>(false);
  const [deleted, setDeleted] = useState<boolean>(false);
  const styles = StyleSheet.create({
    vocabularayContainer: {
      flexDirection: 'row',
      marginTop: 15,
      textDecorationColor: 'black',
    },
    left: {
      flex: 1,
      fontSize: 16,
      color: 'orange',
      fontWeight: '600',
    },
    right: {
      flex: 1,
      fontSize: 16,
    },
    delete: {
      textDecorationLine: 'line-through',
    },
  });
  return (
    <TouchableOpacity
      style={styles.vocabularayContainer}
      activeOpacity={0.7}
      onPress={() => {
        setShowTrans(!showTrans);
      }}
      onLongPress={() => {
        setDeleted(!deleted);
      }}>
      <Text style={[styles.left, deleted ? styles.delete : undefined]}>
        {switched ? item.cn : item.en}
      </Text>
      {showTrans ? (
        <Text style={[styles.right, deleted ? styles.delete : undefined]}>
          {switched ? item.en : item.cn}
        </Text>
      ) : undefined}
    </TouchableOpacity>
  );
};

export default App;
