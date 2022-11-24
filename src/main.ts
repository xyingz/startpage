import { createApp } from 'vue';
import { Quasar, Notify, Dialog } from 'quasar';
import quasarLang from 'quasar/lang/zh-CN';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router/index';
import store, { key } from './store/index';
import './styles/index.scss';

import { msalPlugin } from './plugins/msalPlugin';
import { msalInstance } from './config/authConfig';
import setMsAccount from './utils/setMsAccount';

// 设置微软账户
setMsAccount();

const app = createApp(App);

app
  .use(Quasar, {
    plugins: {
      Notify,
      Dialog
    }, // import Quasar plugins and add here
    lang: quasarLang,
    config: {
      // notify
    }
    /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
  })
  .use(router)
  .use(store, key)
  .use(msalPlugin, msalInstance)
  .mount('#app');
