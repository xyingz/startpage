<template>
  <div>
    <div v-if="!tools.length">
      <div class="text-info tools-empty-tip">工具箱是空的，快去添加一个吧</div>
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

    <Dialog
      v-model="showDialog"
      title="添加工具栏"
      content="请输入工具栏名称"
      ok-label="添加"
      cancel-label="取消"
      @cancel="onClose"
      @ok="onConfirm"
    >
      <div>1</div>
      <div>2</div>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Tool } from '@/typings/tool';
import { reactive, ref } from 'vue';
import { useStore } from '@/store/index';
import ButtonComponent from './button/Button.vue';
import Dialog from './dialog';
</script>

<script lang="ts" setup>
const store = useStore();
const tools = reactive<Array<Tool>>(store.state.tools);

const size = ref('5rem');

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
  console.log('onClose');
}

function onConfirm() {
  console.log('onConfirm');
}
</script>

<style scoped lang="scss">
.tool-box {
  width: 70%;
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 0.5rem;
  grid-auto-columns: 100%;
  justify-content: center;
  margin: 0 auto;

  &-btn-wrap {
    display: flex;
    flex-direction: column;
  }

  &-btn {
    width: var(--tool-size);
    height: var(--tool-size);
    padding: 0;
  }

  &-name {
    font-size: 0.8rem;
    text-align: center;
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
</style>
