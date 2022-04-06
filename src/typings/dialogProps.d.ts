declare interface DialogProps {
  modelValue: Boolean;
}

declare interface DialogEmit {
  (event: 'update:modelValue', ...args: any[]): void;
}
