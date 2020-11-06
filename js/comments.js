'use strict';

const COMMENTS_LIMIT = 5;

const commentsContainer = document.querySelector(`.social__comments`);
const bigPhoto = document.querySelector(`.big-picture`);
const commentsCount = bigPhoto.querySelector(`.social__comment-count`);
const commentsLoader = bigPhoto.querySelector(`.comments-loader`);

let commentsCopy = [];
let count = 0;

// отрисовывает содержимое блока с актуальным количеством загруженных комментариев
const generateCommentsCountBlock = (loadedComments) => {
  commentsCount.textContent = ``;
  const commentsCountBlockContent = `${loadedComments} из <span class="comments-count">${count}</span> комментариев`;
  commentsCount.insertAdjacentHTML(`afterbegin`, commentsCountBlockContent);
};

// генерирует шаблон комментария
const generateCommentSample = (comment) => `<li class="social__comment">
      <img class="social__picture" width="35" height="35" src="${comment.avatar}" alt="${comment.name}">
      <p class="social__text">${comment.message}</p>
      </li>`;

// отрисовывает комментарии
const renderComments = (comments) => {
  comments.forEach((comment) => {
    const htmlComment = generateCommentSample(comment);
    commentsContainer.insertAdjacentHTML(`beforeend`, htmlComment);
  });

  generateCommentsCountBlock(commentsContainer.querySelectorAll(`.social__comment`).length);
};

// генерирует и отрисовывает ограниченный список комментариев
const renderList = (photo) => {
  commentsCopy = photo.comments.slice();
  count = photo.comments.length;

  if (commentsCopy.length > COMMENTS_LIMIT) {
    commentsCount.classList.remove(`visually-hidden`);
    commentsLoader.classList.remove(`visually-hidden`);

    renderComments(commentsCopy.splice(0, COMMENTS_LIMIT));
  } else {
    commentsCount.classList.add(`visually-hidden`);
    commentsLoader.classList.add(`visually-hidden`);

    renderComments(commentsCopy);
  }
};

const onSocialLoadMore = () => {
  renderComments(commentsCopy.splice(0, COMMENTS_LIMIT));

  if (commentsCopy.length === 0) {
    commentsLoader.classList.add(`visually-hidden`);
  }
};

// удаляет комментарии
const removeSocial = () => {
  const comments = commentsContainer.querySelectorAll(`.social__comment`);

  comments.forEach((comment) => {
    commentsContainer.removeChild(comment);
  });
};

window.comments = {
  onSocialLoadMore,
  renderList,
  removeSocial,
  bigPhoto,
  commentsLoader,
};
