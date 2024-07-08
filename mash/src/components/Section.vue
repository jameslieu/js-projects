<template>
  <div class="section">
    <h3>{{ title.toUpperCase() }}</h3>
    <div>
      <ul class="section-list">
        <li v-for="item in items" :key="item.id" :class="getClass(item)">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Item } from "../types/item";

defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array<Item>,
    required: true,
  },
});

const getClass = (item: Item): { [key: string]: boolean } => {
  return {
    "is-current": item.current,
    "is-excluded": item.exclude,
  };
};
</script>

<style scoped>
.section {
  background-color: lightblue;
  border: 1px solid #ccc;
  font-size: 24px;
  font-weight: 600;
  min-height: 20vh;
}

.section-list {
  list-style-type: none;
  padding: 0;
}

.is-current {
  color: red;
}

.is-excluded {
  text-decoration: line-through;
  color: grey;
  font-weight: 400;
}
</style>
