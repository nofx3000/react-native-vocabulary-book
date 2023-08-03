import React, {useState, FC, useEffect, useRef} from 'react';
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import icon_switch from '../assets/icon_switch.png';
import icon_shuffle from '../assets/suiji.png';

function App({route, navigation}): JSX.Element {
  const [switched, setSwitched] = useState<boolean>(false);
  const [shuffled, setShuffled] = useState<boolean>(false);
  const firstRender = useRef(true);
  const chapter: ChapterInter = route.params.chapter;
  const [vocList, setVocList] = useState<VocabularyInter[]>(
    chapter.vocabularys,
  );

  const shuffleList = (_list: VocabularyInter[]) => {
    // 浅复制，防止修改引用数据
    const newList = [..._list];
    const len: number = newList.length;
    for (let i = len - 1; i >= 0; i--) {
      const randomIndex: number = Math.floor(Math.random() * (i + 1));
      const tmp = newList[randomIndex];
      newList[randomIndex] = newList[i];
      newList[i] = tmp;
    }
    return newList;
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (shuffled) {
      setVocList(shuffleList(vocList));
    } else {
      setVocList(chapter.vocabularys);
    }
  }, [shuffled]);

  return (
    <>
      <ScrollView style={styles.root}>
        {vocList.map((item: VocabularyInter) => {
          return (
            <VocabularayContainer
              item={item}
              key={item.en}
              switched={switched}
            />
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={styles.switchButton}
        onPress={() => {
          setSwitched(!switched);
        }}>
        <Image source={icon_switch} style={styles.switchIcon} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.switchButton, styles.shuffleButton]}
        onPress={() => {
          setShuffled(!shuffled);
        }}>
        <Image source={icon_shuffle} style={styles.switchIcon} />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: Dimensions.get('screen').height,
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
  shuffleButton: {
    bottom: 100,
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
          {item.property + '.   '}
          {switched ? item.en : item.cn}
        </Text>
      ) : undefined}
    </TouchableOpacity>
  );
};

export default App;
