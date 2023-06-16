interface VocabularyInter {
  en: string;
  cn: string;
  property: string;
}

interface ChapterInter {
  chapter: number;
  name: string;
  vocabularys: VocabularyInter[];
}

interface VocabularyContainerProps {
  item: VocabularyInter;
  switched: boolean;
}
