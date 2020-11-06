'use strict';

const DEBOUNCE_INTERVAL = 500;

const debounce = (cb) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(() => {
      cb(...args);
    }, DEBOUNCE_INTERVAL);
  };
};

window.timeout = {
  debounce,
};
