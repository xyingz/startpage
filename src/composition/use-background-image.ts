import { ref, watch } from 'vue';
import { useStore } from '@/store';
import { imageUrl } from '@/api/url';
import { CONTROLLERS } from '@/store/mutation-types';
import { useQuasar } from 'quasar';
import { isDeviceMobile } from '@/utils/check';
import { get } from '@/utils/http/requests';
import { saveTodayBg } from '@/config/set-data';

export default () => {
  const store = useStore();

  // 处理背景图片
  const $q = useQuasar();

  // 分设备和屏幕尺寸加载不同的背景图片
  function setBackground() {
    let imgUrl = store.state.controllers.backgroundImage?.standardUrl;
    if (isDeviceMobile()) {
      // 移动设备
      imgUrl = store.state.controllers.backgroundImage?.standardUrl_M;
    } else if ($q.screen.lt.md) {
      // 小尺寸屏幕
      imgUrl = store.state.controllers.backgroundImage?.middleUrl;
      if ($q.screen.height > $q.screen.width) {
        // 小尺寸下的竖屏
        imgUrl = store.state.controllers.backgroundImage?.middleUrl_M;
      }
    } else if ($q.screen.width > 1920) {
      // 超大尺寸品目
      imgUrl = store.state.controllers.backgroundImage?.uhdUrl;
    } else if ($q.screen.height > $q.screen.width) {
      // 竖屏
      imgUrl = store.state.controllers.backgroundImage?.standardUrl_M;
    }

    (
      document.querySelector('.x-home-bg') as HTMLElement
    ).style.backgroundImage = `url(${imgUrl})`;
  }

  function getImage(
    rand = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    successCb = (_res: BackgroundImage | undefined) => {},
    catchCb = () => {},
    finallyCb = () => {}
  ) {
    get<BackgroundImage>(`${imageUrl}?random=${rand}`)
      .then(([, res]) => {
        store
          .dispatch(CONTROLLERS.SET_BACKGROUND_IMAGE, res)
          .then(setBackground);

        successCb(res);
      })
      .catch(catchCb)
      .finally(finallyCb);
  }

  function initImage() {
    // 初始化背景图片。如果本地没有信息，直接获取。如果有，就从本地加载
    if (!store.state.settings.todayBgImageInfo) {
      getImage();
    } else {
      store
        .dispatch(
          CONTROLLERS.SET_BACKGROUND_IMAGE,
          store.state.settings.todayBgImageInfo.image
        )
        .then(setBackground);
    }
  }

  // 电脑可以调整屏幕大小，所以检测在屏幕大小发生变化时，调整背景图
  watch(
    () => [$q.screen.width, $q.screen.height],
    () => {
      setBackground();
    }
  );

  const loadingChangeImage = ref(false);
  function changeBgImage() {
    loadingChangeImage.value = true;

    // 延长切换图片的时间，降低请求频率
    setTimeout(() => {
      getImage(
        true,
        res => {
          // 保存图片信息
          if (res) {
            saveTodayBg({
              isSavedCurrent: false,
              isCustom: false,
              savedTime: new Date(),
              image: res
            } as TodayBgImageInfo);
          }
        },
        undefined,
        () => {
          loadingChangeImage.value = false;
        }
      );
    }, 500);
  }

  return {
    initImage,
    changeBgImage,
    loadingChangeImage
  };
};
