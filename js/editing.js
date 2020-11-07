'use strict';

const {isEscEvent, resetUserImgSettings, imageUploadForm, userUploadImg, resetForm} = window.utils;
const {save} = window.backend;
const {openСongratulationMessage} = window.success;
const {openErrorMessage} = window.mistake;
const {addUserPhoto, checksFileType, editingUploadImage, imageUploadInput, effectsPreviewImages} = window.fileChoser;
const {pin} = window.dragAndDrop;
const {onButtonIncreaseImage, onButtonDecreaseImage, buttonIncreaseImgScale, buttonDecreaseImgScale} = window.zoomPhoto;
const {onSliderEffectChange, effectsList, onEffectLevelPinMove} = window.photoFilter;
const {hashtagsInput, onHashtagsInputСhecks} = window.validation;
const {onFilterButtonClick, imageFiltersForm, onPictureImgOpenBigPicture, photosList, body} = window.gallery;

const buttonCloseUploadField = imageUploadForm.querySelector(`.img-upload__cancel`);
const loadingMessageTemplate = document.querySelector(`#messages`).content;
const commentUploadInput = imageUploadForm.querySelector(`.text__description`);
const imgUpload = document.querySelector(`.img-upload`);
const previewImgDefault = userUploadImg.attributes.src.value;

// открывает окно редактирования загруженного фото
const onInputUploadImage = () => {
  body.classList.add(`modal-open`);
  resetUserImgSettings();
  addUserPhoto();

  if (checksFileType()) {
    imageUploadInput.removeEventListener(`change`, onInputUploadImage);
    photosList.removeEventListener(`click`, onPictureImgOpenBigPicture);
    imageFiltersForm.removeEventListener(`click`, onFilterButtonClick);
  }
  buttonCloseUploadField.addEventListener(`click`, onButtonCancelCloseUpload);
  buttonDecreaseImgScale.addEventListener(`click`, onButtonDecreaseImage);
  buttonIncreaseImgScale.addEventListener(`click`, onButtonIncreaseImage);
  effectsList.addEventListener(`click`, onSliderEffectChange);
  document.addEventListener(`keydown`, onUploadFormEscEvent);
  hashtagsInput.addEventListener(`invalid`, onHashtagsInputСhecks);
  hashtagsInput.addEventListener(`input`, onHashtagsInputСhecks);
  imageUploadForm.addEventListener(`submit`, onSubmitFormData);
};

// открытие окна редактирования фото при изменении значения инпута загрузки
imageUploadInput.addEventListener(`change`, onInputUploadImage);

// закрывает окно редактирования загруженного фото
const onButtonCancelCloseUpload = () => {
  resetUserImgSettings();
  resetForm();

  userUploadImg.src = previewImgDefault;
  effectsPreviewImages.forEach((effectPreview) => {
    effectPreview.removeAttribute(`style`);
  });

  editingUploadImage.classList.add(`hidden`);
  body.removeAttribute(`class`);

  imageUploadInput.addEventListener(`change`, onInputUploadImage);
  imageFiltersForm.addEventListener(`click`, onFilterButtonClick);
  photosList.addEventListener(`click`, onPictureImgOpenBigPicture);
  buttonCloseUploadField.removeEventListener(`click`, onButtonCancelCloseUpload);
  buttonDecreaseImgScale.removeEventListener(`click`, onButtonDecreaseImage);
  buttonIncreaseImgScale.removeEventListener(`click`, onButtonIncreaseImage);
  effectsList.removeEventListener(`click`, onSliderEffectChange);
  document.removeEventListener(`keydown`, onUploadFormEscEvent);
  pin.removeEventListener(`mousedown`, onEffectLevelPinMove);
  hashtagsInput.removeEventListener(`invalid`, onHashtagsInputСhecks);
  hashtagsInput.removeEventListener(`input`, onHashtagsInputСhecks);
  imageUploadForm.removeEventListener(`submit`, onSubmitFormData);
};

// обработчик события нажатия на клавишу ESC
const onUploadFormEscEvent = (evt) => {
  if (!hashtagsInput.matches(`:focus`) && !commentUploadInput.matches(`:focus`)) {
    isEscEvent(evt, onButtonCancelCloseUpload);
  }
};

const message = imageUploadForm.querySelector(`.img-upload__message.img-upload__message--loading`);
if (message) {
  message.classList.add(`overlay`);
}

const removeMessage = () => {
  imgUpload.classList.remove(`overlay`);
  body.removeAttribute(`class`);
  imgUpload.querySelector(`.img-upload__message`).remove();
};

const onLoad = () => {
  removeMessage();
  openСongratulationMessage();
};

const onError = () => {
  removeMessage();
  onButtonCancelCloseUpload();
  openErrorMessage();
};

const opensLoadingMessages = () => {
  const loadingMessage = loadingMessageTemplate.cloneNode(true);
  imageUploadForm.append(loadingMessage);
  imgUpload.classList.add(`overlay`);
  body.classList.add(`modal-open`);
};

// обработчик отправки формы
const onSubmitFormData = (evt) => {
  evt.preventDefault();
  onButtonCancelCloseUpload();
  opensLoadingMessages();
  const data = new FormData(imageUploadForm);
  save(data, onLoad, onError);
};
