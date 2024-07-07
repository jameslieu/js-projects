import { Item } from './types/item'
import { Ref } from 'vue';

interface HashMap {
  [index: string]: number;
}

const getCategoriesCountHashmap = (items: Ref<Item[]>) => {
  const hashmap: HashMap = {};

  items.value.forEach(item => {
    if (!!hashmap[item.category]) {
      hashmap[item.category] = hashmap[item.category] + 1;
    } else {
      hashmap[item.category] = 1;
    }
  });

  return hashmap;
}

const runSelectionAlgorithmAsync = async (items: Ref<Item[]>, isRunning: Ref<boolean>) => {
  isRunning.value = !isRunning.value;
  
  const swirlCounter = 7
  let currentswirlCounter = swirlCounter;
  let excludeCount = 0;
  const categories = new Set(items.value.map(x => x.category));
  const itemLength = items.value.length;
  
  let prevItem: Item | null = null; 
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
  const categoriesCountHashMap = getCategoriesCountHashmap(items);
  for (let i = 0; i < itemLength; i++) {
    if (excludeCount >= itemLength - categories.size){
      alert("DONE: " + items.value.filter(x => !x.exclude).map(x => x.name));
      isRunning.value = false;
      break;
    }

    if (!isRunning.value) {
      break;
    }
    
    const item = items.value[i];

    if (categoriesCountHashMap[item.category] == 1)
    {
      continue;
    }

    if (prevItem === null) {
      prevItem = item;
    }

    if (item.exclude) {
      if (i == itemLength - 1) {
        i = -1
      }
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
      categoriesCountHashMap[item.category] = categoriesCountHashMap[item.category] - 1
    } else {
      currentswirlCounter--
    }
    
    // reset loop
    if (i == itemLength - 1) {
      i = -1
    }

    await delay(100);
  }
}

export default runSelectionAlgorithmAsync;