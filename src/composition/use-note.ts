import { saveNotes } from '@/config/set-data';
import { useStore } from '@/store';
import { CONTROLLERS, SETTINGS } from '@/store/mutation-types';
import { changeColorAlpha } from '@/utils/common';
import { computed, ref } from 'vue';
import { debounce } from 'quasar';

export default (note?: Note) => {
  const store = useStore();

  const tmpNote = ref({
    width: 300,
    height: 350,
    top: 50,
    left: 50,
    backgroundColor: '#f5f500',
    color: '#000000',
    opacity: 1,
    zIndex: store.getters[SETTINGS.GET_NOTES_MAX_Z_INDEX],
    isClose: false,
    ...note
  });

  const backgroundColor = computed(() =>
    changeColorAlpha(tmpNote.value.backgroundColor, tmpNote.value.opacity)
  );

  function save() {
    store.dispatch(SETTINGS.UPDATE_NOTE, { ...tmpNote.value }).then(saveNotes);
  }

  /**
   * 更新背景颜色
   */
  function updateBackgroundColor(color: string) {
    tmpNote.value.backgroundColor = color;
    save();
  }

  /**
   * 更新文本颜色
   */
  function updateTextColor(color: string) {
    tmpNote.value.color = color;
    save();
  }

  /**
   * 更新透明度
   */
  function updateOpacity(opacity: number | null) {
    tmpNote.value.opacity = opacity ?? 1;
    save();
  }

  /**
   * 更新层级
   */
  function updateZIndex(zIndex: number) {
    tmpNote.value.zIndex = zIndex;
    save();
  }

  /**
   * 更新内容
   */
  function updateContent(content: string) {
    tmpNote.value.content = content;
    save();
  }

  /**
   * 关闭标签
   */
  function closeNote() {
    tmpNote.value.isClose = true;
    save();
  }

  /**
   * 删除便签
   */
  function deleteNote() {
    store.dispatch(SETTINGS.DELETE_NOTE, tmpNote.value).then(saveNotes);
  }

  /**
   * 添加便签
   */
  function addNote() {
    store.dispatch(SETTINGS.ADD_NOTE, tmpNote.value).then(saveNotes);
  }

  /**
   * 移动窗口
   */
  function onTitleMouseDown(downEvent: MouseEvent) {
    const { offsetX, offsetY } = downEvent;

    const onMouseMove = (moveEvent: MouseEvent) => {
      tmpNote.value.top = moveEvent.pageY - offsetY;
      tmpNote.value.left = moveEvent.pageX - offsetX;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // 保存
      save();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  /**
   * 调整窗口大小
   */
  function onResizeMouseDown(downEvent: MouseEvent) {
    const { offsetX, offsetY } = downEvent;

    const onMouseMove = (moveEvent: MouseEvent) => {
      tmpNote.value.width = moveEvent.pageX - offsetX - tmpNote.value.left;
      tmpNote.value.height = moveEvent.pageY - offsetY - tmpNote.value.top;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // 保存
      save();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  return {
    tmpNote,
    backgroundColor,

    onTitleMouseDown,
    onResizeMouseDown,

    updateBackgroundColor,
    updateOpacity: debounce(updateOpacity, 500),
    updateTextColor,
    updateZIndex,
    updateContent: debounce(updateContent, 500),

    closeNote,
    addNote,
    deleteNote,

    onFocus: () => store.dispatch(CONTROLLERS.SET_FOCUS_MODE, true)
  };
};
