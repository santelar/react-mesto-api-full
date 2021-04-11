import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onClickOverlay }) {

  const [placeRef, setPlaceRef] = useState('');
  const [urlRef, setUrlRef] = useState('');

  //Обработчик установки названия места
  function handleCardTitle(event) {
    setPlaceRef(event.target.value)
  }

  //Обработчик установки картинки (ссылки на картинку)
  function handleCardLink(event) {
    setUrlRef(event.target.value)
  }

  //Обработчик сабмита формы поп-апа добавления карточки
  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: placeRef,
      link: urlRef
    })
  }

  useEffect(() => {
    setPlaceRef('')
    setUrlRef('')
  }, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Новое место"
      name="place"
      onSubmit={handleSubmit}
      onClickOverlay={onClickOverlay}
    >
      <input
        required
        id="picName"
        name="name"
        type="text"
        className="popup__input popup__input_name popup__input_name-card"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={handleCardTitle}
        value={placeRef ? placeRef : ''}
      />
      <span
        id="picName-error"
        className="error">
      </span>
      <input
        required
        id="picLink"
        name="link"
        type="url"
        className="popup__input popup__input_description popup__input_url-card"
        placeholder="Ссылка на картинку"
        onChange={handleCardLink}
        value={urlRef ? urlRef : ''}
      />
      <span
        id="picLink-error"
        className="error">
      </span>
      <button
        type="submit"
        className="popup__save">
        Создать
      </button>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
