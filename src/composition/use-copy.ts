import { copyToClipboard, useQuasar } from 'quasar';

export default () => {
  const $q = useQuasar();

  return {
    onCopy: (content: string) => {
      copyToClipboard(content).then(() => {
        $q.notify({
          message: '已复制到剪贴板',
          position: 'center',
          timeout: 2000
        });
      });
    }
  };
};
