/* eslint-disable no-param-reassign */
import { markRaw } from 'vue';

export default markRaw({
  name: 'hover',

  mounted(
    el: any,
    { value }: { value: { enter: Function; leave: Function; delay?: number } }
  ) {
    let delay: any;
    const ctx = {
      enterHandler(e: Event) {
        if (value.delay && value.delay > 0) {
          delay = setTimeout(() => {
            value.enter(e);
          }, value.delay);
        } else {
          value.enter(e);
        }
      },
      leaveHandler(e: Event) {
        value.leave(e);
        if (delay) {
          clearTimeout(delay);
        }
      }
    };

    el.xhover = ctx;

    el.addEventListener('mouseenter', ctx.enterHandler);
    el.addEventListener('mouseleave', ctx.leaveHandler);
  },

  beforeUnmount(el: any) {
    const ctx = el.xhover;
    el.removeEventListener('mouseenter', ctx.enterHandler);
    el.removeEventListener('mouseleave', ctx.leaveHandler);
    delete el.xhover;
  }
});
