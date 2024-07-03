<template>
  <Header title="MASH"/>
  
  <div class="items">
    <Section class="card" title="Foo" :items=items />
  </div>
  <button @click=onClick()>Trigger</button>
</template>

<script setup lang="ts">
import Section from './components/Section.vue'
import Header from './components/Header.vue'
import { Item } from './types/item'

import { Ref, ref } from 'vue';

let items: Ref<Item[]> = ref([
  { id: 1, name: "abc", selected: false },
  { id: 2, name: "efg", selected: false },
  { id: 3, name: "hij", selected: false },
  { id: 4, name: "klm", selected: false }
]);

const onClick = async () => {
  const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

  let prevItem: Item | null = null; 
  for (const item of items.value) {
    console.log(item);
    if (prevItem === null) {
      prevItem = item;
    }

    prevItem.selected = false;
    item.selected = true;
    prevItem = item;
    await delay(500);
  }

  items.value[items.value.length-1].selected = false;
}

</script>

<style>
  .items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
  }
</style>