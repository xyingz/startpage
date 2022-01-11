<template>
  <div
    class="tool-box-btn-wrap relative-position"
    :class="{ 'tool-box-btn-wrap-swing': store.state.removeToolState }"
  >
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
        v-if="store.state.removeToolState"
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
import { REMOVE_TOOL, SET_REMOVE_TOOL_STATE } from '@/store/mutation-types';
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
  if (!store.state.removeToolState) {
    store.dispatch(SET_REMOVE_TOOL_STATE, true);
  }
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

.tool-box-btn-wrap-swing {
  animation: swing 0.3s ease-in-out infinite;
}

@keyframes swing {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1.5deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-1.5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
