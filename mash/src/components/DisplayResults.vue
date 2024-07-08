<template>
  <div class="results">
    <h3 class="title">Results</h3>
    <div>
      <ul class="results-list">
        <li v-for="item in items" :key="item.id">
          {{ descriptions[item.category] }}
          <span class="name">
            {{
              item.category === "main" ? mashDescription[item.name] : item.name
            }}
          </span>
        </li>

        <hr />

        <p class="end-message">
          Thanks for playing! Hit the "Reset" or "Start" button to try again.
        </p>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Item } from "../types/item";

defineProps({
  items: {
    type: Array<Item>,
    required: true,
  },
});

interface HashMap {
  [index: string]: string;
}

const mashDescription: HashMap = {
  M: "Mansion",
  A: "Appartment",
  S: "Shack",
  H: "House",
};

const descriptions: HashMap = {
  main: "Thou shalt dwell in a humble abode, a quaint ",
  job: "Thy vocation shall be that of a ",
  car: "Thy chariot shall be none other than a sleek ",
  marriage:
    "In matters of the heart, destiny decrees that thou shalt wed the illustrious ",
  place: "Thy residence shall be in the enchanting paradise of ",
};
</script>

<style scoped>
.results {
  background-color: azure;
  border: 1px solid #ccc;
  font-size: 24px;
  font-weight: 400;
  min-height: 20vh;
  text-align: left;
}

.results-list {
  list-style-type: none;
}

.title {
  padding-left: 40px;
}

.name {
  font-weight: 600;
}

.end-message {
  font-style: italic;
  font-weight: 600;
}
</style>
