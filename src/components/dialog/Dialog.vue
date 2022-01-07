<template>
  <teleport to="body">
    <transition name="fade-fast" @after-leave="remove">
      <div v-show="show" class="dialog-mask" />
    </transition>

    <transition name="dialog-scale" @after-leave="remove">
      <div v-show="show" class="dialog-frame">
        <div class="dialog-title">{{ title }}</div>
        <div class="dialog-content">
          <slot v-if="$slots['default']" />
          <template v-else>{{ content }}</template>
        </div>
        <div class="dialog-control">
          <ButtonComponent
            size="small"
            type="primary"
            :label="okLabel || '确定'"
            @click="onOk"
          />
          <ButtonComponent
            size="small"
            type="primary"
            :label="cancelLabel || '取消'"
            outline
            @click="onCancel"
          />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, isRef } from 'vue';
import ButtonComponent from '../button/Button.vue';
import props from './props';

export default defineComponent({
  components: {
    ButtonComponent
  },

  props,

  emits: ['update:modelValue', 'cancel', 'ok'],

  setup: (p, { emit }) => {
    // 组件内部用于显示的数据双向代理
    const modelValue = computed({
      get: () => p.modelValue,
      set: () => emit('update:modelValue')
    });

    // 用于显示组件，该变量可以通过 props 传入或者 v-model 绑定
    const show = isRef(p.modelValue) ? p.modelValue : modelValue;

    const onCancel = () => {
      p.reject?.();
      emit('cancel');
      show.value = false;
    };

    const onOk = () => {
      p.resolve?.();
      emit('ok');
      show.value = false;
    };

    return { show, onOk, onCancel };
  }
});
</script>

<style scoped lang="scss">
.dialog-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}
.dialog-frame {
  position: absolute;
  border-radius: var(--default-border-radius);
  background-color: #ffffff;
  z-index: 9999;
  display: grid;
  grid-template-rows: auto 1fr auto;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  .dialog-title {
    font-weight: bold;
    text-align: center;
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
  }

  .dialog-content {
    padding: 0.5rem 1rem;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }

  .dialog-control {
    padding: 0.5rem 1rem;
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
  }
}

.dialog-scale-enter-active,
.dialog-scale-leave-active {
  transition: all 0.2s ease;
}

.dialog-scale-enter-from,
.dialog-scale-leave-to {
  transform: translate(-50%, -50%) scale(0);
}

.dialog-scale-enter-to,
.dialog-scale-leave-from {
  transform: translate(-50%, -50%) scale(100%);
}
</style>
