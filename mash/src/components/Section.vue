<template>
  <div class="section">
    <h3>{{ title }}</h3>
    <div>
      <ul class="section-list">
        <li 
          v-for="item in items"
          :key="item.id"
          :class="item.selected ? 'is-selected' : ''"
        >{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Item }  from '../types/item'

  defineProps({
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array<Item>,
      required: true
    }
  })
</script>

<style scoped>
  .section {
    background-color: lightblue;
    border: 1px solid #ccc;
    font-size: 24px;
    height: 30vh;
  }

  .section-list {
    list-style-type: none;
    padding: 0;
  }

  .is-selected {
    color: red;
  }
</style>
