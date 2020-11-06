'use strict';

const {imageUploadForm, maxEffectValue, effectValueInput, pin, effectDepth} = window.utils;

const effectScale = imageUploadForm.querySelector(`.effect-level__line`);

const onMouseDown = (downEvt, action) => {
  downEvt.preventDefault();

  const startCoords = {
    x: downEvt.clientX
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX
    };

    startCoords.x = moveEvt.clientX;

    let pinPosition = pin.offsetLeft - shift.x;

    if (pinPosition > effectScale.offsetWidth) {
      pinPosition = effectScale.offsetWidth;
    } else if (pinPosition <= 0) {
      pinPosition = 0;
    }

    pin.style.left = `${pinPosition}px`;

    effectValueInput.value = Math.round((pin.offsetLeft * maxEffectValue) / effectScale.offsetWidth);

    effectDepth.style.width = `${effectValueInput.value}%`;

    action();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

window.dragAndDrop = {
  onMouseDown,
  pin,
};
