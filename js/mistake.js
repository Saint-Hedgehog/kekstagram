'use strict';

const {isEscEvent} = window.utils;
const {main} = window.success;

const error = document.querySelector(`#error`).content.querySelector(`.error`);

const openErrorMessage = () => {
  const errorBlock = error.cloneNode(true);

  main.append(errorBlock);

  const errorButton = errorBlock.querySelector(`.error__button`);

  errorButton.addEventListener(`click`, onErrorButtonClick);
  errorBlock.addEventListener(`click`, onErrorBlockClick);
  document.addEventListener(`keydown`, onErrorBlockEscEvent);
  errorButton.focus();
};

const closeErrorMessage = () => {
  main.querySelector(`.error`).remove();

  document.removeEventListener(`keydown`, onErrorBlockEscEvent);
};

const onErrorButtonClick = () => {
  closeErrorMessage();
};

const onErrorBlockClick = (evt) => {
  evt.stopPropagation();

  if (evt.target.classList.contains(`error`)) {
    closeErrorMessage();
  }
};

const onErrorBlockEscEvent = (evt) => {
  isEscEvent(evt, closeErrorMessage);
};

window.mistake = {
  openErrorMessage,
};
