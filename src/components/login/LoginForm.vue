<script setup lang="ts">
import { ref, computed } from "vue";
import BaseInput from "../base/BaseInput.vue";
import BaseButton from "../base/BaseButton.vue";

const emit = defineEmits<{
  (e: "login", data: { username: string; phone: string }): void;
}>();

// Data
const username = ref("");
const phone = ref("");

// Computed
const usernameError = computed(() => {
  if (!username.value) return 'Username is required'
  return ''
})

const phoneError = computed(() => {
  if (!phone.value) return 'Phone is required'
  return ''
})

// Methods
const submit = () => {
  if (usernameError.value || phoneError.value) return

  emit('login', {
    username: username.value,
    phone: phone.value
  })
}
</script>

<template>
  <form @submit.prevent="submit">
    <BaseInput v-model="username" :error="usernameError" :placeholder="'User name'" :only-letters="true" />

    <BaseInput v-model="phone" :error="phoneError" :placeholder="'Phone number'" :phone="true" />

    <BaseButton> Login </BaseButton>
  </form>
</template>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;

form {
  width: 420px;
  margin: 80px auto;
  background: $background-form;
  padding: 30px;
  border-radius: $radius;
  box-shadow: $shadow;

  @include tablet {
    width: 100%;
  }

  @include mobile {
    padding: 20px;
    margin: 30px auto;
  }
}
</style>
