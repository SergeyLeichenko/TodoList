<script setup lang="ts">
import { ref } from "vue";
import BaseInput from "../base/BaseInput.vue";
import BaseButton from "../base/BaseButton.vue";

import { useTodosStore } from "@/stores/todos";

const store = useTodosStore();

// Data
const title = ref("");
const userId = ref(1);

// Methods
const addTodo = () => {
  store.createTodo({
    id: Date.now(),
    title: title.value,
    completed: false,
    userId: userId.value,
  });

  title.value = "";
};
</script>

<template>
  <div class="create">
    <BaseInput v-model="title" placeholder="Todo title" />

    <BaseInput :type="'number'" v-model="userId" />

    <BaseButton @click="addTodo" :width="'150px'" class="btn"> Add Todo </BaseButton>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/mixins" as *;

.create {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  :deep(.input-group) {
    margin-bottom: 0;
  }


  @include tablet {
    flex-wrap: wrap;
  }

  @include mobile {
    flex-direction: column;
  }
}
</style>
