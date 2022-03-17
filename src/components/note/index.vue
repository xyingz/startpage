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
    <div
      class="absolute z-1"
      style="width: 100%"
      :style="{
        backgroundColor: tmpNote.backgroundColor,
        filter: 'brightness(80%)',
        color: 'black'
      }"
      @mousedown="onTitleMouseDown"
    >
      <div class="row">
        <q-btn-dropdown
          flat
          :icon="`format_align_${formatAlign}`"
          padding="sm"
          size="sm"
          @mousedown.stop
        >
          <q-list>
            <q-item
              v-close-popup
              dense
              clickable
              @click.stop="() => onChangeContentStyle('left')"
            >
              <q-item-section>
                <q-icon name="format_align_left" />
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              dense
              clickable
              @click.stop="() => onChangeContentStyle('center')"
            >
              <q-item-section>
                <q-icon name="format_align_center" />
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              dense
              clickable
              @click.stop="() => onChangeContentStyle('right')"
            >
              <q-item-section>
                <q-icon name="format_align_right" />
              </q-item-section>
            </q-item>

            <q-item
              v-close-popup
              dense
              clickable
              @click.stop="() => onChangeContentStyle('justify')"
            >
              <q-item-section>
                <q-icon name="format_align_justify" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-separator vertical />

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
    <div class="absolute fit overflow-auto q-pt-lg">
      <q-editor
        ref="editorRef"
        v-model="tmpNote.content"
        flat
        :toolbar="[]"
        @paste="onPaste"
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

const editorRef = ref();
const formatAlign = ref('left');
function onChangeContentStyle(type: string) {
  switch (type) {
    case 'bold':
      editorRef.value.runCmd('bold');
      break;
    case 'italic':
      editorRef.value.runCmd('italic');
      break;
    case 'underline':
      editorRef.value.runCmd('underline');
      break;
    case 'left':
      formatAlign.value = 'left';
      editorRef.value.runCmd('justifyLeft');
      break;
    case 'center':
      formatAlign.value = 'center';
      editorRef.value.runCmd('justifyCenter');
      break;
    case 'right':
      formatAlign.value = 'right';
      editorRef.value.runCmd('justifyRight');
      break;
    case 'justify':
      formatAlign.value = 'justify';
      editorRef.value.runCmd('justifyFull');
      break;
    default:
      break;
  }
}

/**
 * Capture the <CTL-V> paste event, only allow plain-text, no images.
 * See: https://stackoverflow.com/a/28213320
 */
function onPaste(evt: ClipboardEvent) {
  // Let inputs do their thing, so we don't break pasting of links.
  if (evt.target?.nodeName === 'INPUT') return;
  let text;
  let onPasteStripFormattingIEPaste;
  evt.preventDefault();
  evt.stopPropagation();
  if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
    text = evt.originalEvent.clipboardData.getData('text/plain');
    editorRef.value.runCmd('insertText', text);
  } else if (evt.clipboardData && evt.clipboardData.getData) {
    text = evt.clipboardData.getData('text/plain');
    editorRef.value.runCmd('insertText', text);
  } else if (window.clipboardData && window.clipboardData.getData) {
    if (!onPasteStripFormattingIEPaste) {
      onPasteStripFormattingIEPaste = true;
      editorRef.value.runCmd('ms-pasteTextOnly', text);
    }
    onPasteStripFormattingIEPaste = false;
  }
}
</script>

<style lang="scss">
.q-editor {
  background-color: transparent;
  text-align: left;
}
</style>
