<script setup lang="ts">
interface Props {
  modelValue: string | number;
  placeholder?: string;
  error?: string;
  type?: string;
  onlyLetters?: boolean;
  phone?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();

const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value

  if (props.onlyLetters) {
    // Only letters
    value = value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ]/g, "");
  }

  if (props.phone) {
    // Only number and sumbol
    value = value.replace(/[^0-9+\-()\sx]/gi, "");
  }

  input.value = value

  emit("update:modelValue", value);
};
</script>

<template>
  <div class="input-group">
    <input
      :type="type || 'text'"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />

    <span v-if="error">{{ error }}</span>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  input {
    padding: 12px;
    border: 1px solid $border;
    border-radius: $radius;
    transition: $transition;

    &:focus {
      outline: none;
      border-color: $primary;
    }
  }

  span {
    margin-top: 5px;
    color: $error;
    font-size: 13px;
  }
}
</style>
