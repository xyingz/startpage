<template>
  <q-dialog v-model="show">
    <q-card class="x-dialog-bg">
      <slot />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);

const show = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
});
</script>
