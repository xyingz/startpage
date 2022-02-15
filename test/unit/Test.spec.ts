import { shallowMount } from '@vue/test-utils';
import App from '@/pages/404.vue';

describe('Test', () => {
  const wrapper = shallowMount(App);

  it('load compoent', () => {
    const html = wrapper.text();
    expect(html).toContain('页面不存在');
  });
});
