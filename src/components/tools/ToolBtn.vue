<template>
  <div class="tool-box-btn-wrap">
    <q-btn
      unelevated
      color="dark"
      :padding="$q.screen.lt.sm ? 'none' : ''"
      class="tool-box-btn"
      @click="() => clickTool(tool)"
    >
      <template v-if="tool.url">
        <q-img
          :src="`https://ico.kucat.cn/get.php?url=${tool.url}`"
          :alt="tool.comment"
          ratio="1"
          width="100%"
          height="100%"
          fit="contain"
        >
          <template #error>
            <q-icon
              name="public"
              size="2rem"
              :class="{ 'error-btn-icon': $q.screen.gt.xs }"
            />
          </template>
        </q-img>
      </template>
    </q-btn>
    <div class="tool-box-name ellipsis">{{ tool.comment }}</div>
  </div>
</template>

<script lang="ts" setup>
import { Tool } from '@/typings/tool';
import { useQuasar } from 'quasar';

defineProps<{ tool: Tool }>();

const $q = useQuasar();

function clickTool(tool: Tool) {
  if (tool.url) {
    window.open(tool.url, '_blank');
  }
}
</script>

<style lang="scss"></style>
