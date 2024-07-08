<template>
  <Header title="MASH" :items="items.filter((x) => x.category === 'main')" />

  <div class="items">
    <Section
      class="card"
      title="job"
      :items="items.filter((x) => x.category === 'job')"
    />
    <Section
      class="card"
      title="car"
      :items="items.filter((x) => x.category === 'car')"
    />
    <Section
      class="card"
      title="marriage"
      :items="items.filter((x) => x.category === 'marriage')"
    />
    <Section
      class="card"
      title="place"
      :items="items.filter((x) => x.category === 'place')"
    />
  </div>
  <DisplayResults v-if="isComplete" :items="items.filter((x) => !x.exclude)" />

  <span class="select-title">Rotations:</span>
  <select v-model="rotationCount">
    <option>3</option>
    <option>4</option>
    <option>5</option>
    <option>6</option>
    <option>7</option>
    <option>8</option>
    <option>9</option>
    <option>10</option>
  </select>

  <button class="btn btn-main" @click="onClick()">
    {{ isRunning ? "Stop" : "Start" }}
  </button>
  <button class="btn btn-default" @click="onResetClick()">Reset</button>
</template>

<script setup lang="ts">
import Section from "./components/Section.vue";
import Header from "./components/Header.vue";
import { Item, ItemList } from "./types/item";
import runSelectionAlgorithmAsync from "./SelectionAlgorithm";

import { Ref, ref } from "vue";
import DisplayResults from "./components/DisplayResults.vue";

let isRunning: Ref<boolean> = ref(false);
let isComplete: Ref<boolean> = ref(false);
let rotationCount = ref(3);

const items: Ref<Item[]> = ref(ItemList);
const resetItems = () => {
  items.value.forEach((item) => {
    item.current = false;
    item.exclude = false;
  });
};

const onResetClick = () => {
  resetItems();
  isRunning.value = false;
  isComplete.value = false;
};

const onClick = async () => {
  if (!isRunning.value) {
    resetItems();
    isComplete.value = false;
  }

  runSelectionAlgorithmAsync(items, rotationCount, isRunning, isComplete);
};
</script>

<style>
.items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  margin-bottom: 10px;
}

.btn {
  margin: 10px;
  color: white;
}

.btn-main {
  background-color: blueviolet;
}

.btn-default {
  background-color: grey;
}

.select-title {
  font-weight: 600;
  font-size: 24px;
}

select {
  padding: 0.7em 1em;
  font-size: 16px;
  margin: 10px;
}
</style>
