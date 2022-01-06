<template>
  <div
    v-bind="$attrs"
    class="button"
    :class="`btn-${type}`"
    :style="{ borderRadius }"
  >
    <template v-if="label">{{ label }}</template>
    <template v-else-if="icon">
      <i :class="`icon icon-${icon}`" :style="iconStyle" />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: 'normal'
  },
  type: {
    type: String,
    default: 'normal'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  radius: {
    type: [Boolean, Number, String],
    default: true
  }
});

const borderRadius = computed(() => {
  const { radius } = props;
  if (radius === false) {
    return '';
  }

  if (typeof radius === 'string') {
    return radius;
  }

  if (radius === true) {
    return 'var(--default-border-radius)';
  }
  return `${radius}px`;
});

// 支持内容，也支持自定义尺寸
const iconStyle = computed(() => {
  const { size } = props;
  switch (size) {
    case 'small':
      return { fontSize: '0.5rem' };
    case 'large':
      return { fontSize: '1.5rem' };
    case 'big':
      return { fontSize: '2rem' };
    case 'normal':
      return { fontSize: '1rem' };
    default:
      return { fontSize: size };
  }
});
</script>

<style scoped lang="scss">
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  @each $type in 'primary', 'normal', 'secondary', 'success', 'danger',
    'warning', 'info', 'light', 'dark', 'transparent'
  {
    @if ($type != 'transparent') {
      &.btn-#{$type} {
        background-color: var(--#{$type}-color);
        color: var(--#{$type}-color-text);

        &:hover {
          background-color: var(--#{$type}-color-hover);
        }

        &:active {
          background-color: var(--#{$type}-color-active);
        }
      }
    }
  }
}
</style>
