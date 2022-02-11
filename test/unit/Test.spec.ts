import { shallowMount } from '@vue/test-utils';
import App from '@/App.vue';

describe('Test', () => {
  const wrapper = shallowMount(App);

  it('load compoent', () => {
    const html = wrapper.text();
    expect(html).toContain('XiaoPangYing');
  });
});
