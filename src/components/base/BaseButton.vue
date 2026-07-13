<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    loading?: boolean
    width?: string
    background?: string
  }>(),
  {
    width: "100%",
    background: "#16a34a"
  }
)
</script>

<template>
  <button :disabled="loading" :style="{ width: props.width, backgroundColor: props.background }">
    <slot />

    <span v-if="loading"> Loading... </span>
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

button {
  padding: 14px;
  border: none;
  border-radius: $radius;
  color: $white;
  cursor: pointer;
  transition: $transition;

  &:hover {
    background: $primary-hover;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
