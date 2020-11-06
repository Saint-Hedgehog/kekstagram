'use strict';

const MAX_EFFECT_VALUE = 100;

const imageUploadForm = document.querySelector(`.img-upload__form`);
const userUploadImg = imageUploadForm.querySelector(`.img-upload__preview img`);
const effectSlider = imageUploadForm.querySelector(`.effect-level`);
const scaleIndicator = imageUploadForm.querySelector(`.scale__control--value`);
const effectValueInput = imageUploadForm.querySelector(`.effect-level__value`);
const pin = imageUploadForm.querySelector(`.effect-level__pin`);
const effectDepth = imageUploadForm.querySelector(`.effect-level__depth`);
const effectOriginalInput = imageUploadForm.querySelector(`#effect-none`);
const imgFilters = document.querySelector(`.img-filters`);
// действие при нажатии на ESC
const isEscEvent = (evt, callback) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    callback();
  }
};

// генерирует случайное число
const generateRandomNumber = (min, max) => {
  const randomNumber = Math.floor(min + Math.random() * (max + 1 - min));

  return randomNumber;
};

// перемешивает массив с фотографиями
const shufflePhotos = (photos) => {
  let index = 0;
  for (let i = photos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    index = photos[i];
    photos[i] = photos[j];
    photos[j] = index;
  }

  return photos;
};

// сбрасывает все настройки изображения
const resetUserImgSettings = () => {
  effectSlider.classList.add(`hidden`);
  userUploadImg.removeAttribute(`class`);
  userUploadImg.removeAttribute(`style`);
  userUploadImg.style.transform = `scale(${MAX_EFFECT_VALUE / MAX_EFFECT_VALUE})`;
  scaleIndicator.value = `${MAX_EFFECT_VALUE}%`;
  effectValueInput.value = MAX_EFFECT_VALUE;
  pin.style.left = `${MAX_EFFECT_VALUE}%`;
  effectDepth.style.width = `${MAX_EFFECT_VALUE}%`;
};

const resetForm = () => {
  imageUploadForm.reset();
  effectOriginalInput.checked = true;
};

// ошибка при получении данных
const onError = (errorMessage) => {
  const error = document.createElement(`div`);
  error.style.position = `absolute`;
  error.style.top = `90px`;
  error.style.left = `0`;
  error.style.right = `0`;
  error.style.zIndex = `100`;
  error.style.width = `790px`;
  error.style.height = `90px`;
  error.style.margin = `0 auto`;
  error.style.paddingTop = `30px`;
  error.style.fontSize = `35px`;
  error.style.fontWeight = `700`;
  error.style.textAlign = `center`;
  error.style.color = `#ffe753`;
  error.style.backgroundColor = `#3c3614`;
  error.style.border = `5px solid #ff4d4d`;
  error.style.borderRadius = `10px`;
  error.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, error);
  error.addEventListener(`click`, () => {
    error.remove();
  });
  imgFilters.classList.add(`visually-hidden`);
};

window.utils = {
  isEscEvent,
  generateRandomNumber,
  shufflePhotos,
  resetUserImgSettings,
  resetForm,
  onError,
  imageUploadForm,
  userUploadImg,
  effectSlider,
  scaleIndicator,
  effectValueInput,
  pin,
  effectDepth,
  imgFilters,
  maxEffectValue: MAX_EFFECT_VALUE
};
