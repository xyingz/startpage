import { mount } from '@vue/test-utils';
import WelcomeComponent from '@/components/SearchBar.vue';

describe('Welcome Component Test', () => {
  const wrapper = mount(WelcomeComponent, {
    props: { msg: 'Hello Test!' }
  });

  it('load compoent', () => {
    const html = wrapper.text();
    console.log(html);
    expect(html).toContain('Hello Test!');
  });
});
