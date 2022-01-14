<template>
  <q-dialog v-model="show">
    <q-scroll-area class="fit bg-grey-3">
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item v-ripple clickable :active="menuItem.label === 'Outbox'">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator v-if="menuItem.separator" :key="'sep' + index" />
        </template>
      </q-list>
    </q-scroll-area>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  showDialog: {
    default: false,
    type: Boolean
  }
});
const emits = defineEmits(['update:modelValue']);
const show = computed<boolean>({
  get() {
    return props.showDialog;
  },
  set(value) {
    emits('update:modelValue', value);
  }
});

const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }
];
</script>

<style scoped></style>
