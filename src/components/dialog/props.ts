import { PropType } from 'vue';

export const modalProps = {
  modelValue: Boolean,
  remove: Function as PropType<(el: Element) => void>,
  resolve: Function,
  reject: Function
};

export const dialogProps = {
  title: String,
  content: String,
  okLabel: String,
  cancelLabel: String
};

export default {
  ...modalProps,
  ...dialogProps
};
