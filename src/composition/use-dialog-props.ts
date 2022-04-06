import { computed } from 'vue';

export default (props: any, emit: any) => {
  const show = computed({
    get: () => props.modelValue,
    set: val => emit('update:modelValue', val)
  });

  return {
    show
  };
};
