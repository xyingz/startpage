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
    <div v-if="store.state.isShowToolBox">
      <div v-if="!tools.length">
        <div class="text-h5 text-bold q-my-md">
          工具箱是空的，快去添加一个吧
        </div>
        <q-btn label="添加工具" color="primary" @click="onCreateTool" />
      </div>

      <div v-else class="tool-box">
        <template v-for="tool in tools" :key="tool.id">
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

        <q-btn class="add-tool-btn" @click="onCreateTool">
          <q-icon size="3em" name="add" />
        </q-btn>
      </div>
    </div>
  </transition>

  <!-- <q-dialog
    v-model="showDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-teal text-white">
      <q-card-section>
        <div class="text-h6">Persistent</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Click/Tap on the backdrop.
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat color="primary" label="添加" @click="onConfirm" />
        <q-btn v-close-popup flat label="取消" />
      </q-card-actions>
    </q-card>
  </q-dialog> -->

  <AddDialog v-model="showDialog" />
</template>

<script lang="ts">
import { Tool } from '@/typings/tool';
import { reactive, ref, watch } from 'vue';
import { useStore } from '@/store/index';
import { SET_SHOW_TOOLBOX } from '@/store/mutation-types';
import { useQuasar } from 'quasar';
import AddDialog from './AddDialog.vue';
</script>

<script lang="ts" setup>
const $q = useQuasar();
const store = useStore();
const tools = reactive<Array<Tool>>(store.state.tools);

const size = ref('4rem');
const raidus = ref('10');
const drop = ref('down');

function changeToolBoxState() {
  store.dispatch(SET_SHOW_TOOLBOX, !store.state.isShowToolBox);
  drop.value = store.state.isShowToolBox ? 'up' : 'down';
}

watch(
  () => store.state.focusMode,
  mode => {
    if (mode && store.state.isShowToolBox) changeToolBoxState();
  }
);

function clickTool(tool: Tool) {
  if (tool.url) {
    window.open(tool.url, '_blank');
  }
}

const showDialog = ref(false);
function onCreateTool() {
  // createDialog({
  //   title: '添加工具'
  // });

  showDialog.value = true;
}
</script>

<style scoped lang="scss">
$size: v-bind(size);
$raidus: calc(v-bind(raidus) * 1%);
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
  grid-gap: 2rem 1rem;
  grid-auto-columns: 100%;
  justify-items: center;
  margin: 0 auto;

  &-btn-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &-btn {
    width: $size;
    height: $size;
    border-radius: $raidus;
  }

  &-name {
    font-size: 0.8rem;
    font-weight: bold;
    color: var(--normal-color-text);
  }
}

.add-tool-btn {
  border: $border dashed #666;
  border-radius: $raidus;
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
    grid-gap: 0.5rem 0.25rem;
    padding: 0 2rem;

    &-btn {
      width: calc(#{$size} / 2);
      height: calc(#{$size} / 2);
    }
  }
}

@media screen and (min-width: 601px) and (max-width: 1024px) {
  .tool-box {
    width: 80%;
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
