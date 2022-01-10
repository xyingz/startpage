<template>
  <div>
    <ButtonComponent
      :icon="`drop${drop}`"
      type="transparent"
      class="drop-btn"
      @click="changeToolBoxState"
    />
  </div>

  <transition name="scale-to-top">
    <div v-if="store.state.isShowToolBox">
      <div v-if="!tools.length">
        <div class="text-info tools-empty-tip">
          工具箱是空的，快去添加一个吧
        </div>
        <ButtonComponent
          label="添加工具"
          type="primary"
          size="small"
          @click="onCreateTool"
        />
      </div>

      <div v-else class="tool-box">
        <template v-for="tool in tools" :key="tool.id">
          <div class="tool-box-btn-wrap">
            <ButtonComponent
              :label="!tool.icon && !tool.favicon ? tool.name : ''"
              size="big"
              class="tool-box-btn shadow-hover"
              :icon="tool.icon"
              type="info"
              :radius="20"
              :style="{ '--tool-size': size }"
              @click="() => clickTool(tool)"
            >
              <template v-if="tool.favicon">
                <img :src="tool.favicon" :alt="tool.comment" />
              </template>
            </ButtonComponent>
            <div class="tool-box-name">{{ tool.comment }}</div>
          </div>
        </template>

        <ButtonComponent
          class="tool-box-btn add-tool-btn"
          type="transparent"
          icon="plus"
          size="3rem"
          :radius="20"
          :style="{ '--tool-size': size }"
          @click="onCreateTool"
        />
      </div>
    </div>
  </transition>

  <Dialog
    v-model="showDialog"
    title="添加工具栏"
    content="请输入工具栏名称"
    ok-label="添加"
    cancel-label="取消"
    @cancel="onClose"
    @ok="onConfirm"
  >
    <!-- <div>1</div>
      <div>2</div> -->
  </Dialog>
</template>

<script lang="ts">
import { Tool } from '@/typings/tool';
import { reactive, ref, watch } from 'vue';
import { useStore } from '@/store/index';
import { SET_SHOW_TOOLBOX } from '@/store/mutation-types';
import ButtonComponent from './button/Button.vue';
import Dialog from './dialog';
</script>

<script lang="ts" setup>
const store = useStore();
const tools = reactive<Array<Tool>>(store.state.tools);

const size = ref('5rem');

const drop = ref('down');

function changeToolBoxState() {
  store.commit(SET_SHOW_TOOLBOX, !store.state.isShowToolBox);
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

function onClose() {
  // console.log('onClose');
}

function onConfirm() {
  // console.log('onConfirm');
}
</script>

<style scoped lang="scss">
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
    width: var(--tool-size);
    height: var(--tool-size);
    padding: 0;
  }

  &-name {
    font-size: 0.8rem;
    font-weight: bold;
    color: var(--normal-color-text);
  }
}

.add-tool-btn {
  $border: 3px;
  border: $border dashed #666;
  width: calc(var(--tool-size) - $border * 2);
  height: calc(var(--tool-size) - $border * 2);
}

.tools-empty-tip {
  margin: 1rem 0;
}

@media screen and (max-width: 768px) {
  .tool-box {
    width: 80%;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 769px) and (max-width: 1280px) {
  .tool-box {
    width: 80%;
    grid-template-columns: repeat(6, 1fr);
  }
}
</style>
