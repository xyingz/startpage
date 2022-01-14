<template>
  <q-dialog v-model="show">
    <q-card class="fit">
      <q-card-section class="bg-primary q-pa-none">
        <q-toolbar>
          <q-toolbar-title class="text-center text-bold">设置</q-toolbar-title>
          <q-btn v-close-popup flat round dense icon="close" />
        </q-toolbar>
      </q-card-section>

      <q-card-section class="scroll" style="height: calc(100% - 50px)">
        <q-list bordered padding>
          <q-item-label header>User Controls</q-item-label>

          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label>Content filtering</q-item-label>
              <q-item-label caption>
                Set the content filtering level to restrict apps that can be
                downloaded
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple clickable>
            <q-item-section>
              <q-item-label>Password</q-item-label>
              <q-item-label caption>
                Require password for purchase or use password to restrict
                purchase
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>General</q-item-label>

          <q-item v-ripple tag="label">
            <q-item-section side top>
              <q-checkbox v-model="check1" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Notifications</q-item-label>
              <q-item-label caption>
                Notify me about updates to apps or games that I downloaded
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple tag="label">
            <q-item-section side top>
              <q-checkbox v-model="check2" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Sound</q-item-label>
              <q-item-label caption>
                Auto-update apps at anytime. Data charges may apply
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item v-ripple tag="label">
            <q-item-section side top>
              <q-checkbox v-model="check3" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Auto-add widgets</q-item-label>
              <q-item-label caption>
                Automatically add home screen widgets
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>Notifications</q-item-label>

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>Battery too low</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="notif1" color="blue" val="battery" />
            </q-item-section>
          </q-item>

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>Friend request</q-item-label>
              <q-item-label caption>Allow notification</q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-toggle v-model="notif2" color="green" val="friend" />
            </q-item-section>
          </q-item>

          <q-item v-ripple tag="label">
            <q-item-section>
              <q-item-label>Picture uploaded</q-item-label>
              <q-item-label caption
                >Allow notification when uploading images</q-item-label
              >
            </q-item-section>
            <q-item-section side top>
              <q-toggle v-model="notif3" color="red" val="picture" />
            </q-item-section>
          </q-item>

          <q-separator spaced />
          <q-item-label header>Other settings</q-item-label>

          <q-item>
            <q-item-section side>
              <q-icon color="teal" name="volume_down" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="volume"
                :min="0"
                :max="10"
                label
                color="teal"
              />
            </q-item-section>
            <q-item-section side>
              <q-icon color="teal" name="volume_up" />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="deep-orange" name="brightness_medium" />
            </q-item-section>
            <q-item-section>
              <q-slider
                v-model="brightness"
                :min="0"
                :max="10"
                label
                color="deep-orange"
              />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section side>
              <q-icon color="primary" name="mic" />
            </q-item-section>
            <q-item-section>
              <q-slider v-model="mic" :min="0" :max="50" label />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

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

const check1 = ref(true);
const check2 = ref(false);
const check3 = ref(false);

const notif1 = ref(true);
const notif2 = ref(true);
const notif3 = ref(false);

const volume = ref(6);
const brightness = ref(3);
const mic = ref(8);
</script>

<style scoped></style>
