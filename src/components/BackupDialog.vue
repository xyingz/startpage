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

      <q-card-section>
        <q-btn label="登录" color="primary" @click="login" />
      </q-card-section>

      <q-card-section>
        <q-list bordered>
          <q-item tag="label" @click.prevent>
            <q-item-section>
              <q-item-label>123</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn flat size="sm" color="primary" label="添加" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store';
import { CONTROLLERS } from '@/store/mutation-types';
import { loginConfig } from '@/config/loginConfig';

const store = useStore();
const show = computed<boolean>({
  get() {
    return store.state.controllers.showBackupAndRestoreDialog;
  },
  set(value) {
    store.dispatch(CONTROLLERS.SET_BACKUP_AND_RESTORE_DIALOG_VISIBLE, value);
  }
});

async function login() {
  window.location.href = `https://login.microsoftonline.com/${loginConfig.Microsoft.TenantId}/oauth2/v2.0/authorize?client_id=${loginConfig.Microsoft.ClientId}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_mode=query&scope=offline_access%20user.read%20mail.read&state=microsoft`;
}
</script>

<style scoped></style>
