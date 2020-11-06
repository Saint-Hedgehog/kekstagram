'use strict';

const CHROME_COEFFICIENT = 0.01;
const SEPIA_COEFFICIENT = 0.01;
const PHOBOS_COEFFICIENT = 0.03;
const HEAT_COEFFICIENT = 0.02;
const CORRECTION = 1;

const {resetUserImgSettings, imageUploadForm, userUploadImg, effectSlider, effectValueInput} = window.utils;
const {onMouseDown, pin} = window.dragAndDrop;

const effects = imageUploadForm.querySelector(`.effects`);
const effectsList = imageUploadForm.querySelector(`.effects__list`);

// меняет эффект на фото при нажатии на кнопку эффекта
const changeEffectsButton = () => {
  if (effects.querySelector(`input:checked`).value !== `none`) {
    effectSlider.classList.remove(`hidden`);
    pin.addEventListener(`mousedown`, onEffectLevelPinMove);
  } else {
    pin.removeEventListener(`mousedown`, onEffectLevelPinMove);
  }

  switch (effects.querySelector(`input:checked`).value) {
    case `chrome`:
      userUploadImg.classList.add(`effects__preview--chrome`);
      break;
    case `sepia`:
      userUploadImg.classList.add(`effects__preview--sepia`);
      break;
    case `marvin`:
      userUploadImg.classList.add(`effects__preview--marvin`);
      break;
    case `phobos`:
      userUploadImg.classList.add(`effects__preview--phobos`);
      break;
    case `heat`:
      userUploadImg.classList.add(`effects__preview--heat`);
      break;
  }
};

// обработчик события изменения уровня еффекта накладываемого на изображение
const onEffectLevelPinMove = (downEvt) => {
  onMouseDown(downEvt, changeEffectsPin);
};

// меняет эффект на фото в зависимости от положения пина
const changeEffectsPin = () => {

  switch (effects.querySelector(`input:checked`).value) {
    case `chrome`:
      userUploadImg.style.filter = `grayscale(${(effectValueInput.value * CHROME_COEFFICIENT)})`;
      break;
    case `sepia`:
      userUploadImg.style.filter = `sepia(${(effectValueInput.value * SEPIA_COEFFICIENT)})`;
      break;
    case `marvin`:
      userUploadImg.style.filter = `invert(${effectValueInput.value}%)`;
      break;
    case `phobos`:
      userUploadImg.style.filter = `blur(${(effectValueInput.value * PHOBOS_COEFFICIENT)}px)`;
      break;
    case `heat`:
      userUploadImg.style.filter = `brightness(${(effectValueInput.value * HEAT_COEFFICIENT + CORRECTION)})`;
      break;
  }
};

// смена эффекта по клику
const onSliderEffectChange = () => {
  resetUserImgSettings();
  changeEffectsButton();
};

window.photoFilter = {
  onSliderEffectChange,
  onEffectLevelPinMove,
  effectsList,
};
