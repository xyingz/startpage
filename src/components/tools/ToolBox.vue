<template>
  <q-btn
    class="drop-btn"
    flat
    rounded
    color="primary"
    :icon="`keyboard_double_arrow_${drop}`"
    @click="changeToolBoxState"
  />

  <transition name="scale-to-top">
    <div v-if="store.state.controllers.isShowToolBox">
      <div v-if="!tools.length">
        <div class="text-h5 text-bold text-info q-my-md">
          工具箱是空的，快去添加一个吧
        </div>
        <q-btn label="添加工具" color="primary" @click="onCreateTool" />
      </div>

      <div
        v-else
        class="tool-box"
        :style="`grid-gap: ${
          $q.screen.lt.sm ? 1 : $q.screen.lt.md ? 1.5 : 3
        }rem 1rem`"
      >
        <transition-group name="scale">
          <template v-for="tool in tools" :key="tool.id">
            <ToolBtn :tool="tool" />
          </template>
        </transition-group>

        <q-btn
          v-if="tools.length < 24"
          class="add-tool-btn"
          @click="onCreateTool"
        >
          <q-icon :size="`${$q.screen.lt.sm ? 1.5 : 3}rem`" name="add" />
        </q-btn>
      </div>
    </div>
  </transition>

  <AddDialog v-model="showDialog" />
</template>

<script lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { useStore } from '@/store/index';
import { CONTROLLERS } from '@/store/mutation-types';
import { useQuasar } from 'quasar';
import ToolBtn from './ToolBtn.vue';
import AddDialog from './AddDialog.vue';
</script>

<script lang="ts" setup>
const $q = useQuasar();
const store = useStore();
const tools = reactive<Array<Tool>>(store.state.settings.tools);

const size = ref('4rem');
const drop = ref('down');
const radius = computed(() => store.state.settings.userSettings.toolRadius);

function changeToolBoxState() {
  store.dispatch(
    CONTROLLERS.SET_SHOW_TOOLBOX,
    !store.state.controllers.isShowToolBox
  );
  drop.value = store.state.controllers.isShowToolBox ? 'up' : 'down';
}

onMounted(() => {
  if (
    !store.state.controllers.focusMode &&
    !store.state.controllers.isShowToolBox
  ) {
    changeToolBoxState();
  }
});

watch(
  () => store.state.controllers.focusMode,
  mode => {
    if (mode && store.state.controllers.isShowToolBox) changeToolBoxState();
  }
);

const showDialog = ref(false);
function onCreateTool() {
  showDialog.value = true;
}
</script>

<style lang="scss">
$size: v-bind(size);
$radius: calc(v-bind(radius) * 1%);
$border: 3px;

.drop-btn {
  animation: bounce 1s ease-in-out infinite alternate;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

.tool-box {
  width: 70%;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-columns: 100%;
  justify-items: center;
  margin: 0 auto;

  .tool-box-btn-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .tool-box-btn {
      width: $size;
      height: $size;
      border-radius: $radius;

      .tool-box-btn-img-wrap {
        width: 100%;
        height: 100%;
        border-radius: $radius;
        overflow: hidden;
      }
    }

    .tool-box-name {
      font-size: 0.8rem;
      font-weight: bold;
      width: $size;
    }
  }
}

.add-tool-btn {
  border: $border dashed #666;
  border-radius: $radius;
  width: calc(#{$size} - #{$border} * 2);
  height: calc(#{$size} - #{$border} * 2);
}

.error-btn-icon {
  margin-top: calc(#{$size} / 2 - 2rem / 2 - #{$border});
}

@media screen and (max-width: 600px) {
  .tool-box {
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    padding: 0 2rem;

    &-btn {
      width: calc(#{$size} / 2) !important;
      height: calc(#{$size} / 2) !important;
    }
  }

  .add-tool-btn {
    border: $border dashed #666;
    border-radius: $radius;
    width: calc(#{$size} / 2 - #{$border} * 2);
    height: calc(#{$size} / 2 - #{$border} * 2);
  }
}

@media screen and (min-width: 601px) and (max-width: 1024px) {
  .tool-box {
    width: 80%;
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
