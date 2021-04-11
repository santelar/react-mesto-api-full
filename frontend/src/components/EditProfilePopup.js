import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onClickOverlay }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  // Хендлеры
  function handleUserName(event) {
    setName(event.target.value)
  }
  function handleUserDescription(event) {
    setDescription(event.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
    isOpen={isOpen}
    onClose={onClose}
    name="edit-profile"
    title="Редактировать профиль"
    onSubmit={handleSubmit}
    onClickOverlay={onClickOverlay}
    >
      <input
        type="text"
        required
        autoComplete="off"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        className="popup__input popup__input_name popup__input_name-profile"
        id="name"
        name="name"
        value={name || ''}
        onChange={handleUserName}
      />
      <span
        id="name-error"
         className="error">
      </span>
      <input
        type="text"
        required autoComplete="off"
        minLength="2" maxLength="200"
        placeholder="Род деятельности"
        className="popup__input popup__input_description popup__input_description-profile"
        id="job"
        name="info"
        value={description || ''}
        onChange={handleUserDescription}
      />
      <span
        id="job-error"
        className="error">
      </span>
      <button
        type="submit"
        className="popup__save">
        Сохранить
      </button>
    </PopupWithForm>
  );

}

export default EditProfilePopup;
