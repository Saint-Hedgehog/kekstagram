'use strict';

const SCALE_STEP = 25;

const {imageUploadForm, maxEffectValue, userUploadImg, scaleIndicator} = window.utils;

const buttonDecreaseImgScale = imageUploadForm.querySelector(`.scale__control--smaller`);
const buttonIncreaseImgScale = imageUploadForm.querySelector(`.scale__control--bigger`);

// увеличивает изображение
const onButtonIncreaseImage = () => {
  let valueScaleIndicator = Number(scaleIndicator.value.slice(0, scaleIndicator.value.length - 1));

  if (valueScaleIndicator < maxEffectValue) {
    valueScaleIndicator += SCALE_STEP;
  }

  scaleIndicator.value = `${valueScaleIndicator}%`;
  userUploadImg.style.transform = `scale(${valueScaleIndicator / maxEffectValue})`;
};

// уменьшает изображение
const onButtonDecreaseImage = () => {
  let valueScaleIndicator = Number(scaleIndicator.value.slice(0, scaleIndicator.value.length - 1));

  if (valueScaleIndicator > SCALE_STEP) {
    valueScaleIndicator -= SCALE_STEP;
  }

  scaleIndicator.value = `${valueScaleIndicator}%`;
  userUploadImg.style.transform = `scale(${valueScaleIndicator / maxEffectValue})`;
};

window.zoomPhoto = {
  onButtonIncreaseImage,
  onButtonDecreaseImage,
  buttonIncreaseImgScale,
  buttonDecreaseImgScale,
};
