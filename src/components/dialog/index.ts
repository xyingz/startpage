import { Component, render, h, ExtractPropTypes, ref } from 'vue';
import { dialogProps } from './props';
import Dialog from './Dialog.vue';

const createInstance = (constructor: Component, props: Record<string, any>) => {
  const container = document.createElement('div');

  // 添加移除当前实例方法
  // eslint-disable-next-line no-param-reassign
  props.remove = () => {
    render(null, container);
  };

  // 创建虚拟节点，并挂载到 body
  render(h(constructor as any, props), container);
  document.body.appendChild(container.firstElementChild as any);
};

type Props = ExtractPropTypes<typeof dialogProps>;
type Result = { path: string }[];

export const createDialog = (props: Props) => {
  return new Promise<Result>((resolve, reject) => {
    createInstance(Dialog, {
      modelValue: ref(true),
      ...props,
      resolve,
      reject
    });
  });
};

export default Dialog;
