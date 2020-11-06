'use strict';

const HASHTAGS_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;

const {imageUploadForm} = window.utils;

const hashtagsInput = imageUploadForm.querySelector(`.text__hashtags`);

const hashtagPattern = /[^A-Za-z0-9А-Яа-я]/;

// проверка хэштегов
const onHashtagsInputСhecks = () => {
  const hashtags = (hashtagsInput.value.trim()).split(` `);

  // собираем уникальные хэштеги
  const uniqueHashtags = [];
  const standalone = (hashtag) => {
    const hashtagLowerCase = hashtag.toLowerCase();
    let isOne = false;
    if (uniqueHashtags.indexOf(hashtagLowerCase) !== -1) {
      isOne = true;
    }
    uniqueHashtags.push(hashtagLowerCase);
    return isOne;
  };

  if (hashtagsInput.value.trim() === ``) {
    hashtagsInput.setCustomValidity(``);
    return;
  }

  for (let i = 0; i < hashtags.length; i++) {
    const hashtag = hashtags[i];
    if (hashtag[0] !== `#`) {
      hashtagsInput.setCustomValidity(`${i + 1} хэш-тег (${hashtag}) должен начинаться с символа # (решётка)`);
      return;
    }
    if (hashtag.slice(-1) === `,`) {
      hashtagsInput.setCustomValidity(`Хэш-теги разделяются пробелами`);
      return;
    }
    if (hashtagPattern.test(hashtag.replace(`#`, ``))) {
      hashtagsInput.setCustomValidity(`Строка после символа # (решётка) должна состоять только из букв и чисел. Пробелы, эмодзи, спецсимволы (#, @, $, - и т. п.) не допустимы. ${(i + 1)} хэш-тег с ошибкой`);
      return;
    }
    if (hashtag[0] === `#` && hashtag.length === 1) {
      hashtagsInput.setCustomValidity(`${i + 1} хэш-тег (${hashtag}) не может состоять только из одной символа ${hashtag} (решётка)`);
      return;
    }
    if (hashtag.length > HASHTAG_MAX_LENGTH) {
      hashtagsInput.setCustomValidity(`Максимальная длина одного хэш-тега ${HASHTAG_MAX_LENGTH} символов, включая решётку`);
      return;
    }
    if (!(i < HASHTAGS_MAX_COUNT)) {
      hashtagsInput.setCustomValidity(`Нельзя указать больше ${HASHTAGS_MAX_COUNT} хэш-тегов`);
      return;
    }
    if (standalone(hashtag)) {
      hashtagsInput.setCustomValidity(`Один и тот же хэш-тег не может быть использован дважды. Хэш-теги нечувствительны к регистру. #ХэшТег и #хэштег считаются одним и тем же тегом`);
      return;
    }
    hashtagsInput.setCustomValidity(``);
  }
};
onHashtagsInputСhecks();

window.validation = {
  onHashtagsInputСhecks,
  hashtagsInput,
};
