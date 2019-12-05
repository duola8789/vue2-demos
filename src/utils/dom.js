/**
 * Created by zh on 2019/12/1.
 */
import { Message } from 'element-ui';
export const getRect = ele => {
  const { width, height, top, left, bottom, right } = ele.getBoundingClientRect();
  return {
    width,
    height,
    top,
    left,
    bottom,
    right,
    middleLeft: left + width / 2,
    middleTop: top + height / 2,
  }
};


/**
 * 将文字复制到系统剪切板
 * @param { string } text 复制到剪切板的文字
 */
export function copyTextToClipboard(text) {
  // 支持 Clipboard API 并且在安全环境下（localhost 或者 https）
  if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text).then(() => {
      Message({
        message: '内容已复制到剪切板',
        type: 'success',
        duration: 1000,
      });
    }).catch(() => {
      // 静默失败
    });
  } else if (document && document.execCommand && typeof document.execCommand === 'function') {
    // 使用 execCommand 的后退方案
    const input = document.createElement('input');
    input.style.cssText = 'position: absolute; left: -9999px; top: -9999px; z-index: -9999;';
    input.readOnly = true;
    document.body.appendChild(input);
    input.value = text;
    input.focus();
    input.select();
    const isSucceed = document.execCommand('copy', true);
    document.body.removeChild(input);
    if (isSucceed) {
      Message({
        message: '内容已复制到剪切板',
        type: 'success',
        duration: 1000,
      });
    } else {
      // 静默失败
    }
  }
}
