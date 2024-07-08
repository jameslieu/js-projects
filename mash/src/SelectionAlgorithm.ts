import { Item } from "./types/item";
import { Ref } from "vue";

interface HashMap {
  [index: string]: number;
}

const getCategoriesCountHashmap = (items: Ref<Item[]>) => {
  const hashmap: HashMap = {};

  items.value.forEach((item) => {
    if (!!hashmap[item.category]) {
      hashmap[item.category] = hashmap[item.category] + 1;
    } else {
      hashmap[item.category] = 1;
    }
  });

  return hashmap;
};

const runSelectionAlgorithmAsync = async (
  items: Ref<Item[]>,
  rotationCount: Ref<number>,
  isRunning: Ref<boolean>,
  isComplete: Ref<boolean>,
) => {
  isRunning.value = !isRunning.value;

  // arrays are indexed at 0, so we'll subtract 1 from the rotation count
  const swirlCounter: number = rotationCount.value - 1;
  let currentswirlCounter: number = swirlCounter;
  let excludeCount: number = 0;
  const itemLength: number = items.value.length;

  const categories = new Set(items.value.map((x) => x.category));
  let prevItem: Item | null = null;
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const delayInMs: number = 150;
  const categoriesCountHashMap: HashMap = getCategoriesCountHashmap(items);

  const getIndexValue = (index: number) => {
    if (index == itemLength - 1) {
      index = -1;
    }

    return index;
  };

  for (let i = 0; i < itemLength; i++) {
    if (excludeCount >= itemLength - categories.size) {
      isRunning.value = false;
      isComplete.value = true;
      break;
    }

    if (!isRunning.value) {
      break;
    }

    const item = items.value[i];
    if (categoriesCountHashMap[item.category] == 1) {
      i = getIndexValue(i);
      continue;
    }

    if (prevItem === null) {
      prevItem = item;
    }

    // skip excluded
    if (item.exclude) {
      i = getIndexValue(i);
      continue;
    }

    // track previous
    prevItem.current = false;
    item.current = true;
    prevItem = item;

    // apply exclusion to item
    if (currentswirlCounter === 0) {
      item.exclude = true;
      excludeCount++;
      currentswirlCounter = swirlCounter;
      categoriesCountHashMap[item.category] =
        categoriesCountHashMap[item.category] - 1;
    } else {
      currentswirlCounter--;
    }

    i = getIndexValue(i);
    await delay(delayInMs);
  }
};

export default runSelectionAlgorithmAsync;
