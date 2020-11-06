'use strict';

const RANDOM_IMG_COUNT = 10;

const {isEscEvent, shufflePhotos, onError, imgFilters} = window.utils;
const {onSocialLoadMore, renderList, removeSocial, bigPhoto, commentsLoader} = window.comments;
const {debounce} = window.timeout;
const {load} = window.backend;

const imageFiltersForm = document.querySelector(`.img-filters__form`);
const buttonCloseBigPhoto = bigPhoto.querySelector(`.big-picture__cancel`);
const filtersButtons = document.querySelectorAll(`.img-filters__button`);
const photosList = document.querySelector(`.pictures`);
const photoSample = document.querySelector(`#picture`).content.querySelector(`.picture`);
const body = document.querySelector(`body`);

// отрисовывает фотографии в блок .picture
const renderPhotosList = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.append(renderPhoto(photo));
  });

  photosList.append(fragment);
};

// обработчик блока фотографии
const openPhoto = (evt, photos) => {
  if (!(evt.target.matches(`.picture`) || evt.target.matches(`.picture__img`))) {
    return;
  }
  // получаем ссылку на фотографию
  const picture = photos.find((photo) => photo.url === evt.target.closest(`.picture`).children[0].attributes.src.value);

  onPictureOpenBigPicture(picture);
};

let photoData = [];

const onPictureImgOpenBigPicture = (evt) => {
  openPhoto(evt, photoData);
};

const onLoad = (photos) => {
  photoData = photos;
  renderPhotosList(photos);

  imgFilters.classList.remove(`img-filters--inactive`);
};

load(onLoad, onError);

// удалаяет класс активной кнопки фильтра
const removeActiveClass = () => {
  filtersButtons.forEach((button) => {
    if (button.classList.contains(`img-filters__button--active`)) {
      button.classList.remove(`img-filters__button--active`);
    }
  });
};

// очищает галлерею
const clearGallery = () => {
  const photos = photosList.querySelectorAll(`.picture`);
  photos.forEach((photo) => {
    photo.remove();
  });
};

// получает массив случайных и уникальных фото в определенном количестве из родительского массива фото
const getUniquePhotos = (photos, count) => shufflePhotos(photos.slice()).slice(0, count);

// фильтр "по умолчанию"
const filterDefault = () => {
  clearGallery();
  renderPhotosList(photoData);
};

// фильтр "случайные"
const filterRandom = () => {
  clearGallery();
  const photosData = photoData.slice();
  renderPhotosList(getUniquePhotos(photosData, RANDOM_IMG_COUNT));
};

// фильтр "обсуждаемые"
const filterDiscussed = () => {
  clearGallery();
  const photosData = photoData.slice().sort((left, right) => right.comments.length - left.comments.length);
  renderPhotosList(photosData);
};

// словарь для фильтров: id кнопки --- функция-обработчик
const filterButtonMap = {
  'filter-default': filterDefault,
  'filter-random': filterRandom,
  'filter-discussed': filterDiscussed
};

// обработчик клика по кнопке фильтра
const onFilterButtonClick = debounce((evt) => {
  removeActiveClass();
  evt.target.classList.add(`img-filters__button--active`);
  filterButtonMap[evt.target.id]();
});

// подписка на событие клика по кнопке фильтра
imageFiltersForm.addEventListener(`click`, onFilterButtonClick);

// отрисовывает фотографию по шаблону
const renderPhoto = (photo) => {
  const photoElement = photoSample.cloneNode(true);

  photoElement.querySelector(`img`).src = photo.url;
  photoElement.querySelector(`img`).alt = photo.description;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
  photoElement.querySelector(`.picture__comments`).textContent = photo.comments.length;

  return photoElement;
};

photosList.addEventListener(`click`, onPictureImgOpenBigPicture);

// отрисовывает и открывает блок с большой фотографией
const onPictureOpenBigPicture = (photo) => {
  bigPhoto.classList.remove(`hidden`);
  body.classList.add(`modal-open`);
  buttonCloseBigPhoto.focus();

  bigPhoto.querySelector(`.big-picture__img`).querySelector(`img`).src = photo.url;
  bigPhoto.querySelector(`.big-picture__img`).querySelector(`img`).alt = photo.description;
  bigPhoto.querySelector(`.likes-count`).textContent = photo.likes;
  bigPhoto.querySelector(`.comments-count`).textContent = photo.comments.length;
  bigPhoto.querySelector(`.social__caption`).textContent = photo.description;

  removeSocial();
  renderList(photo);

  imageFiltersForm.removeEventListener(`click`, onFilterButtonClick);
  photosList.removeEventListener(`click`, onPictureImgOpenBigPicture);
  commentsLoader.addEventListener(`click`, onSocialLoadMore);
  buttonCloseBigPhoto.addEventListener(`click`, onBigPhotoClose);
  document.addEventListener(`keydown`, onBigPhotoEscEvent);
};

// закрывает большую фотографию
const onBigPhotoClose = () => {
  bigPhoto.classList.add(`hidden`);
  body.removeAttribute(`class`);

  imageFiltersForm.addEventListener(`click`, onFilterButtonClick);
  photosList.addEventListener(`click`, onPictureImgOpenBigPicture);
  commentsLoader.removeEventListener(`click`, onSocialLoadMore);
  buttonCloseBigPhoto.removeEventListener(`click`, onBigPhotoClose);
  document.removeEventListener(`keydown`, onBigPhotoEscEvent);
};

//  обработчик закрытия фото при нажатии на ESC
const onBigPhotoEscEvent = (evt) => {
  isEscEvent(evt, onBigPhotoClose);
};

window.gallery = {
  onFilterButtonClick,
  photosList,
  body,
  onPictureImgOpenBigPicture,
  imageFiltersForm,
};
