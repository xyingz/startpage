<template>
  <q-dialog v-model="show">
    <q-card class="x-dialog-bg">
      <slot />
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

// import useDialogProps from '@/composition/use-dialog-props';

// TODO 这些个 props、emit、show 都放在一个 use 中，这样就不用每个组件都写一遍了
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

// const props = defineProps<DialogProps>();
// const emit = defineEmits<DialogEmit>();
// const { show } = useDialogProps(props, emit);
</script>
