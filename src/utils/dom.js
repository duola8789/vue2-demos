/**
 * Created by zh on 2019/12/1.
 */
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
