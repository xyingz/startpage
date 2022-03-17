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
        <template v-for="(t, i) in toolbar" :key="i">
          <q-btn-dropdown
            v-if="!!t.children?.length"
            :label="t.label"
            :icon="t.icon"
            flat
            padding="xs"
            size="sm"
            dense
            @mousedown.stop
          >
            <q-toolbar class="no-padding" style="min-height: fit-content">
              <template v-for="(tc, ic) in t.children" :key="ic">
                <q-btn
                  flat
                  padding="xs"
                  size="sm"
                  :icon="tc.icon"
                  @click="() => onChangeContentStyle(tc.cmd)"
                />
              </template>
            </q-toolbar>
          </q-btn-dropdown>

          <q-separator v-else-if="!!t.separator" vertical />

          <q-btn
            v-else
            flat
            padding="xs"
            size="xs"
            :icon="t.icon"
            @click.stop="() => onChangeContentStyle(t.cmd)"
            @mousedown.stop
          >
            <q-tooltip v-if="!!t.tip" :delay="200">
              {{ t.tip }}
            </q-tooltip>
          </q-btn>
        </template>

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
        :toolbar="[
          // [
          //   {
          //     label: $q.lang.editor.align,
          //     icon: $q.iconSet.editor.align,
          //     fixedLabel: true,
          //     list: 'only-icons',
          //     options: ['left', 'center', 'right', 'justify']
          //   }
          // ],
          // ['bold', 'italic', 'strike', 'underline'],
          // [
          //   {
          //     label: $q.lang.editor.formatting,
          //     icon: $q.iconSet.editor.formatting,
          //     fixedLabel: true,
          //     fixedIcon: true,
          //     list: 'only-icons',
          //     options: [
          //       'left',
          //       'center',
          //       'right',
          //       'justify',
          //       'bold',
          //       'italic',
          //       'strike',
          //       'underline'
          //     ]
          //   },
          //   'removeFormat'
          // ],
          // ['unordered', 'ordered']
        ]"
        :fonts="{
          // arial: 'Arial',
          // arial_black: 'Arial Black',
          // comic_sans: 'Comic Sans MS',
          // courier_new: 'Courier New',
          // impact: 'Impact',
          // lucida_grande: 'Lucida Grande',
          // times_new_roman: 'Times New Roman',
          // verdana: 'Verdana'
        }"
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
function onChangeContentStyle(type?: string) {
  if (type) editorRef.value.runCmd(type);
}

const toolbar = [
  {
    icon: 'format_align_justify',
    label: '对齐',
    children: [
      {
        icon: 'format_align_left',
        cmd: 'justifyLeft'
      },
      {
        icon: 'format_align_center',
        cmd: 'justifyCenter'
      },
      {
        icon: 'format_align_right',
        cmd: 'justifyRight'
      }
    ]
  },
  { separator: true },
  {
    icon: 'format_bold',
    cmd: 'bold',
    tip: '加粗'
  },
  {
    icon: 'format_italic',
    cmd: 'italic',
    tip: '斜体'
  },
  {
    icon: 'format_underlined',
    cmd: 'underline',
    tip: '下划线'
  },
  {
    icon: 'strikethrough_s',
    cmd: 'strikeThrough',
    tip: '删除线'
  },
  { separator: true },
  {
    icon: 'format_clear',
    cmd: 'removeFormat',
    tip: '清除格式'
  }
  // {
  //   icon: 'format_list_numbered',
  //   cmd: 'insertOrderedList'
  // },
  // {
  //   icon: 'format_list_bulleted',
  //   cmd: 'insertUnorderedList'
  // }
];

/**
 * Capture the <CTL-V> paste event, only allow plain-text, no images.
 * See: https://stackoverflow.com/a/28213320
 */
function onPaste(evt: any) {
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
