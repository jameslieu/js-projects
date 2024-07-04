<template>
  <h1>
    <span
      v-for="item in items"
      :key="item.id"
      :class="getClass(item)"
    >{{ item.name }}</span>
  </h1>
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

  const getClass = (item: Item): { [key: string]: boolean } => {
    return {
      'is-current': item.current,
      'is-excluded': item.exclude
    };
  }
</script>

<style scoped>
  .is-current {
    color: red;
  }

  .is-excluded {
    text-decoration: line-through;
  }
</style>
