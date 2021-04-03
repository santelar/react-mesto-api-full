import React, { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef('');

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Обновить аватар"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        required
        autoComplete="off"
        placeholder="Ссылка на аватар"
        className="popup__input popup__input_name popup__input_name-avatar"
        id="picLink"
        name="link"
      />
      <span
        id="picLink-error"
        className="error">
      </span>
      <button
        type="submit"
        className="popup__save">
        Сохранить
      </button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
