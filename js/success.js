'use strict';

const {isEscEvent} = window.utils;

const success = document.querySelector(`#success`).content.querySelector(`.success`);
const main = document.querySelector(`main`);

const openСongratulationMessage = () => {
  const successBlock = success.cloneNode(true);

  main.append(successBlock);

  const successButton = successBlock.querySelector(`.success__button`);
  successButton.addEventListener(`click`, onSuccessButtonClick);
  successBlock.addEventListener(`click`, onSuccessBlockClick);
  document.addEventListener(`keydown`, onSuccessBlockEscEvent);
  successButton.focus();
};

const closeSuccessMessage = () => {
  main.querySelector(`.success`).remove();

  document.removeEventListener(`keydown`, onSuccessBlockEscEvent);
};

const onSuccessButtonClick = () => {
  closeSuccessMessage();
};

const onSuccessBlockClick = (evt) => {
  evt.stopPropagation();

  if (evt.target.classList.contains(`success`)) {
    closeSuccessMessage();
  }
};

const onSuccessBlockEscEvent = (evt) => {
  isEscEvent(evt, closeSuccessMessage);
};

window.success = {
  openСongratulationMessage,
  main,
};
