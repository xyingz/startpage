<template>
  <div
    class="fixed relative-position rounded-borders shadow-6 overflow-hidden x-note"
    :style="{
      color: tmpNote.color,
      backgroundColor: backgroundColor,
      width: tmpNote.width + 'px',
      height: tmpNote.height + 'px',
      top: tmpNote.top + 'px',
      left: tmpNote.left + 'px',
      zIndex: tmpNote.zIndex
    }"
    @click.stop
    @mousedown="onFocus"
  >
    <!-- 头部 -->
    <div class="x-note-title" style="width: 100%" @mousedown="onTitleMouseDown">
      <div class="row x-note-title-btn">
        <q-btn
          flat
          padding="sm"
          size="sm"
          icon="format_bold"
          @click.stop="() => onChangeContentStyle('bold')"
          @mousedown.stop
        />

        <q-btn
          flat
          padding="sm"
          size="sm"
          icon="format_italic"
          @click.stop="() => onChangeContentStyle('italic')"
          @mousedown.stop
        />

        <q-btn
          flat
          padding="sm"
          size="sm"
          icon="format_underlined"
          @click.stop="() => onChangeContentStyle('underline')"
          @mousedown.stop
        />

        <q-space class="no-pointer-events" />

        <q-btn flat padding="sm" size="sm" icon="more_vert" @mousedown.stop>
          <q-menu anchor="bottom left" self="top middle">
            <q-list dense>
              <q-item-label header>外观</q-item-label>
              <q-item clickable>
                <q-item-section>
                  <q-item-label caption>透明度</q-item-label>
                  <q-item-label>
                    <q-slider
                      v-model="tmpNote.opacity"
                      dense
                      thumb-size="1rem"
                      :min="0.1"
                      :max="1"
                      :step="0.05"
                      @update:model-value="updateOpacity"
                    />
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-item-label caption>文字颜色</q-item-label>
                  <q-item-label>
                    <q-chip
                      dense
                      square
                      :style="{ backgroundColor: tmpNote.color }"
                      class="full-width"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy auto-close>
                      <q-color
                        v-model="tmpNote.color"
                        no-header
                        no-footer
                        default-view="palette"
                        class="my-picker"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-item-label caption>背景颜色</q-item-label>
                  <q-item-label>
                    <q-chip
                      dense
                      square
                      :style="{ backgroundColor: tmpNote.backgroundColor }"
                      class="full-width"
                    />
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="colorize" class="cursor-pointer">
                    <q-popup-proxy auto-close>
                      <q-color
                        v-model="tmpNote.backgroundColor"
                        no-header
                        no-footer
                        default-view="palette"
                        class="my-picker"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item v-close-popup clickable @click="onUpZIndex">
                <q-item-section>向上一层</q-item-section>
              </q-item>
              <q-item
                v-close-popup
                clickable
                :disable="tmpNote.zIndex <= 0"
                @click="onDownZIndex"
              >
                <q-item-section>向下一层</q-item-section>
              </q-item>
              <q-item v-close-popup clickable @click="onClearZIndex">
                <q-item-section>清除层级</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>
                  删除该便签
                  <q-popup-proxy auto-close>
                    <q-btn
                      round
                      dense
                      color="positive"
                      icon="done"
                      @click="deleteNote"
                    />
                    <q-btn round dense color="negative" icon="close" />
                  </q-popup-proxy>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          flat
          padding="sm"
          size="sm"
          icon="close"
          @mousedown.stop
          @click.stop="closeNote"
        />
      </div>
    </div>

    <!-- 显示内容 -->
    <div class="fit overflow-auto">
      <q-editor
        ref="editor"
        v-model="tmpNote.content"
        flat
        :content-style="{ backgroundColor }"
        :toolbar="[]"
        @update:model-value="updateContent"
      />
    </div>

    <!-- 右下角的缩放按钮 -->
    <div
      class="absolute-bottom-right"
      style="
        width: 5px;
        height: 5px;
        filter: brightness(80%);
        cursor: nw-resize;
      "
      :style="{ backgroundColor: tmpNote.backgroundColor }"
      @click.stop
      @mousedown="onResizeMouseDown"
    />
  </div>
</template>

<script lang="ts">
import useNote from '@/composition/use-note';
import { ref } from 'vue';
</script>

<script lang="ts" setup>
const props = defineProps<{ note: Note }>();

const {
  tmpNote,
  backgroundColor,
  onTitleMouseDown,
  onResizeMouseDown,
  updateZIndex,
  updateOpacity,
  updateContent,
  onFocus,
  closeNote,
  deleteNote
} = useNote(props.note);

const onUpZIndex = () => {
  updateZIndex(tmpNote.value.zIndex + 1);
};

const onDownZIndex = () => {
  // 最小为 0
  if (tmpNote.value.zIndex > 0) {
    updateZIndex(tmpNote.value.zIndex - 1);
  }
};

const onClearZIndex = () => {
  updateZIndex(0);
};

const editor = ref();
function onChangeContentStyle(type: string) {
  switch (type) {
    case 'bold':
      editor.value.runCmd('bold');
      break;
    case 'italic':
      editor.value.runCmd('italic');
      break;
    case 'underline':
      editor.value.runCmd('underline');
      break;
    default:
      break;
  }
}
</script>

<style scoped lang="scss">
.x-note-title {
  background-color: rgba($color: #000000, $alpha: 0.2);
}
</style>
