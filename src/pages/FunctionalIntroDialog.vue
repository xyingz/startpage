<template>
  <q-dialog v-model="show">
    <q-card class="x-dialog-bg">
      <q-card-section class="items-center q-pa-none">
        <q-toolbar>
          <q-toolbar-title class="q-mt-md">
            <div class="text-center text-bold">功能介绍</div>
            <div class="text-center text-caption">{{ v }}</div>
          </q-toolbar-title>
          <q-btn v-close-popup flat round dense icon="close" />
        </q-toolbar>
      </q-card-section>

      <q-card-section>
        <!-- 简易版自制 markdown -->
        <template v-for="(line, i) in intro.split('\n')" :key="i">
          <div
            :class="{
              'text-subtitle1 text-bold': line.startsWith('# '),
              'text-italic': line.startsWith('> ')
            }"
          >
            {{
              line
                .replace(/^$/, '&nbsp;')
                .replace(/^# /, '')
                .replace(/^> /, '')
                .replace(/^- /, '● ')
            }}
          </div>
        </template>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);

const show = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val)
});

const v = `v${APP_VERSION}`;

// 简易版自制 markdown
// 支持符号（可以在模板中添加）：
// # 标题（无等级）
// > 斜体
// - 无序列表
const intro = `# 搜索
- 支持快速搜索。打开页面时，输入框会自动获取焦点，方便直接搜索
- 保存搜索记录。点击搜索框，可以查看最近的搜索记录，点击记录可以再次搜索
- 多搜索引擎加持，更可以保存切换后的搜索引擎为默认搜索引擎
- 多种搜索类型可以方便不同类型的搜索。多引擎切换时将尽可能保持类型一致

# 信息
- 时间显示，准确掌控效率
- 支持农历、天干地支、以及节气等显示，让您不错过传统日期
- 支持地点天气，掌握周边环境
- 如果不喜欢信息面板，还可以直接关掉它

# 功能
- 工具箱。可以自定义工具箱内容，快速导航到设定网站

# 个性化
- 支持切换背景图片，保留当前背景。还可以下载喜欢的背景图片，支持多分辨率
- 支持背景高斯模糊，模糊区间可以自定义
- 支持调整工具箱图标的圆角大小
- 所有设定均可以保存到本地，方便下次打开时自动加载
`;
</script>

<style lang="scss" scoped>
.x-dialog-bg {
  color: aliceblue;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.5);
  cursor: default;
}
</style>
