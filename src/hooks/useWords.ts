import wordsData from "../data/words.json";
import type { Word } from "../types";

export function useWords(): Word[] {
  return wordsData.words as Word[];
}
