'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const {imageUploadForm, userUploadImg, effectSlider} = window.utils;
const {openErrorMessage} = window.mistake;

const imageUploadInput = imageUploadForm.querySelector(`.img-upload__input`);
const editingUploadImage = imageUploadForm.querySelector(`.img-upload__overlay`);
const effectsPreviewImages = editingUploadImage.querySelectorAll(`.effects__preview`);

const checksFileType = () => {
  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));
  return matches;
};
  // отрисовывает пользовательское фото
const addUserPhoto = () => {
  effectSlider.classList.add(`hidden`);

  const file = imageUploadInput.files[0];

  if (checksFileType()) {
    const reader = new FileReader();

    reader.addEventListener(`load`, () => {
      // записываем новый адрес изображения
      userUploadImg.src = reader.result;

      effectsPreviewImages.forEach((image) => {
        image.style.backgroundImage = `url(${reader.result})`;
      });

      editingUploadImage.classList.remove(`hidden`);
    });

    reader.readAsDataURL(file);
  } else {
    openErrorMessage();
  }
};

window.fileChoser = {
  FILE_TYPES,
  addUserPhoto,
  editingUploadImage,
  imageUploadInput,
  checksFileType,
  effectsPreviewImages,
};
