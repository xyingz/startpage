<template>
  <q-dialog
    v-model="show"
    transition-show="scale"
    transition-hide="scale"
    persistent
  >
    <q-card>
      <q-card-section class="bg-primary q-pa-none">
        <q-toolbar>
          <q-toolbar-title class="text-center text-bold">
            备份/还原
          </q-toolbar-title>
          <q-btn v-close-popup flat round dense icon="close" />
        </q-toolbar>
      </q-card-section>

      <q-card-section v-if="!isAuthenticated">
        <q-btn label="登录" color="primary" @click="login" />
      </q-card-section>

      <q-card-section v-else>
        <q-list bordered>
          <q-item tag="label" @click.prevent>
            <q-item-section>
              <q-item-label>
                当前登录账户：{{ loginState.data.displayName }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn label="登出" color="primary" @click="logout" />
            </q-item-section>
          </q-item>

          <q-item tag="label" @click.prevent>
            <q-item-section>
              <q-item-label>{{ loginState }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn flat size="sm" color="primary" label="添加" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-section>
        <q-btn label="Google" color="primary" @click="loginGoogle" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, onMounted, watch } from 'vue';
import { useStore } from '@/store';
import { CONTROLLERS } from '@/store/mutation-types';
import { useIsAuthenticated } from '@/composition/ms/useIsAuthenticated';
import { useMsal } from '@/composition/ms/useMsal';
import { graphConfig, loginRequest } from '@/config/authConfig';
import UserInfo from '@/utils/UserInfo';
import {
  InteractionRequiredAuthError,
  InteractionStatus
} from '@azure/msal-browser';
import { callMsGraph } from '@/utils/MsGraphApiCall';

const store = useStore();
const show = computed<boolean>({
  get() {
    return store.state.controllers.showBackupAndRestoreDialog;
  },
  set(value) {
    store.dispatch(CONTROLLERS.SET_BACKUP_AND_RESTORE_DIALOG_VISIBLE, value);
  }
});

const isAuthenticated = useIsAuthenticated();

const { instance, inProgress } = useMsal();
const login = () => {
  instance.loginPopup(loginRequest);
};
const logout = () => {
  instance.logoutPopup({ mainWindowRedirectUri: '/' });
};

const loginState = reactive({
  resolved: false,
  data: {} as UserInfo,
  drive: {}
});

async function getGraphData() {
  const response = await instance
    .acquireTokenSilent({
      ...loginRequest
    })
    .catch(async e => {
      if (e instanceof InteractionRequiredAuthError) {
        await instance.acquireTokenRedirect(loginRequest);
      }

      throw e;
    });

  if (inProgress.value === InteractionStatus.None) {
    const graphData = await callMsGraph(
      response.accessToken,
      graphConfig.graphMeEndpoint
    );
    loginState.data = graphData;
    loginState.resolved = true;

    const drive = await callMsGraph(
      response.accessToken,
      graphConfig.graphOneDriveEndpoint
    );

    loginState.drive = drive;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopWatcher();
  }
}

onMounted(() => {
  getGraphData();
});

const stopWatcher = watch(inProgress, () => {
  if (!loginState.resolved) {
    getGraphData();
  }
});

function loginGoogle() {
  window.gapi.auth2.authorize(
    {
      client_id:
        '641651741721-pn3b00amo790q3k6bmr3cg9nejs41tnj.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive.file'
    },
    (res: any) => {
      if (res && !res.error) {
        // console.log('...token', res.access_token);
      } else {
        // console.log('auth error', res);
      }
    }
  );
}

onMounted(() => {
  if (window.gapi) {
    window.gapi.load('auth2');
    window.gapi.load('picker');
  }
});
</script>

<style scoped></style>
