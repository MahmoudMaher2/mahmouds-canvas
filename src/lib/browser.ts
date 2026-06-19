export const isIOSBrowser = () =>
  /iP(hone|ad|od)/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

export const isSafariBrowser = () =>
  /^((?!chrome|crios|fxios|edg|edgios|android).)*safari/i.test(
    navigator.userAgent
  );

export const isTouchBrowser = () =>
  navigator.maxTouchPoints > 0 ||
  window.matchMedia("(hover: none), (pointer: coarse)").matches;
