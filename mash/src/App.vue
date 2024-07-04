<template>
  <Header title="MASH" :items="items.filter(x => x.category === 'main')"/>
  
  <div class="items">
    <Section class="card" title="Foo" :items="items.filter(x => x.category === 'foo')" />
    <Section class="card" title="Bar" :items="items.filter(x => x.category === 'bar')" />
    <Section class="card" title="Baz" :items="items.filter(x => x.category === 'baz')" />
    <Section class="card" title="Zoo" :items="items.filter(x => x.category === 'zoo')" />
  </div>
  <button class="btn" @click=onClick()>{{ isRunning ? 'Stop' : 'Start' }}</button>
</template>

<script setup lang="ts">
import Section from './components/Section.vue'
import Header from './components/Header.vue'
import { Item } from './types/item'

import { Ref, ref } from 'vue';

let items: Ref<Item[]> = ref([
  { id: 1, name: "M", current: false, category: 'main', exclude: false },
  { id: 2, name: "A", current: false, category: 'main', exclude: false },
  { id: 3, name: "S", current: false, category: 'main', exclude: false },
  { id: 4, name: "H", current: false, category: 'main', exclude: false },
  { id: 5, name: "abc", current: false, category: 'foo', exclude: false },
  { id: 6, name: "efg", current: false, category: 'foo', exclude: false },
  { id: 7, name: "hij", current: false, category: 'foo', exclude: false },
  { id: 8, name: "klm", current: false, category: 'foo', exclude: false },
  { id: 9, name: "nop", current: false, category: 'bar', exclude: false },
  { id: 10, name: "qrs", current: false, category: 'bar', exclude: false },
  { id: 11, name: "tuv", current: false, category: 'bar', exclude: false },
  { id: 12, name: "wxy", current: false, category: 'bar', exclude: false },
  { id: 13, name: "wxy", current: false, category: 'baz', exclude: false },
  { id: 14, name: "z12", current: false, category: 'baz', exclude: false },
  { id: 15, name: "123", current: false, category: 'baz', exclude: false },
  { id: 16, name: "456", current: false, category: 'baz', exclude: false },
  { id: 17, name: "789", current: false, category: 'zoo', exclude: false },
  { id: 18, name: "0AB", current: false, category: 'zoo', exclude: false },
  { id: 19, name: "CDE", current: false, category: 'zoo', exclude: false },
  { id: 20, name: "FGH", current: false, category: 'zoo', exclude: false }
]);

let isRunning: Ref<boolean> = ref(false);

const resetItems = () => {
  items.value.forEach(item => {
    item.current = false;
    item.exclude = false;
  })
}

const onClick = async () => {
  if (!isRunning.value) {
    resetItems()
  }

  isRunning.value = !isRunning.value;
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

  let prevItem: Item | null = null; 

  
  const swirlCounter = 5
  let currentswirlCounter = swirlCounter;
  let excludeCount = 0;

  for (let i = 0; i < items.value.length; i++) {
    if (excludeCount > items.value.length - 2){
      alert("DONE");
      isRunning.value = false;
      break;
    }

    if (!isRunning.value) {
      break;
    }

    const item = items.value[i];
    if (prevItem === null) {
      prevItem = item;
    }

    if (item.exclude) {
      if (i == items.value.length - 1) {
        i = -1
      }
      continue;
    }

    prevItem.current = false;
    item.current = true;
    prevItem = item;
    
    if (currentswirlCounter === 0) {
      item.exclude = true;
      excludeCount++;
      currentswirlCounter = swirlCounter;
    } else {
      currentswirlCounter--
    }
    
    if (i == items.value.length - 1) {
      i = -1
    }

    await delay(200);
  }
}

</script>

<style>
  .items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
  }

  .btn {
    margin: 10px;
    background-color: blueviolet;
    color: white;
  }
</style>