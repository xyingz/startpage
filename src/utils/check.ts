const ua = navigator.userAgent.toLowerCase();

// 是否是移动设备
export const isDeviceMobile = () => {
  return /android|webos|iphone|ipod|balckberry/i.test(ua);
};

// 是否ios
export const isIos = () => {
  return ua.indexOf('iphone') > -1;
};

// 是否安卓
export const isAndroid = () => {
  return ua.indexOf('android') > -1 || ua.indexOf('linux') > -1;
};
