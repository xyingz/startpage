<template>
  <div class="tool-box-btn-wrap relative-position">
    <q-btn
      v-touch-hold.mouse="handleHold"
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

      <q-btn
        icon="close"
        color="warning"
        round
        size="0.3rem"
        class="absolute tool-box-btn-delete"
        @click.stop="() => deleteTool(tool)"
      />
    </q-btn>
    <div class="tool-box-name ellipsis text-white">{{ tool.comment }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store';
import { REMOVE_TOOL } from '@/store/mutation-types';
import { Tool } from '@/typings/tool';
import { useQuasar } from 'quasar';

defineProps<{ tool: Tool }>();

const $q = useQuasar();
const store = useStore();

function clickTool(tool: Tool) {
  if (tool.url) {
    window.open(tool.url, '_blank');
  }
}

function handleHold() {
  console.log('hold');
}

function deleteTool(tool: Tool) {
  store.dispatch(REMOVE_TOOL, tool);
}
</script>

<style scoped lang="scss">
.tool-box-btn-delete {
  right: -0.3rem;
  top: -0.3rem;
}
</style>
