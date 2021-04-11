import React from 'react';
import buttonPlus from '../images/add-button__plus.svg';

function PopupWithForm({ isOpen, onClose, name, children, title, onSubmit, onClickOverlay }) {

  return (
    <div className={`popup popup__${name} ${isOpen && 'popup_opened'}`} onClick={onClickOverlay}>
      <div className="popup__container">
        <button type="button" onClick={onClose} className="button"><img src={buttonPlus} alt="Закрыть"
          className={`popup__close popup__close_${name}`} /></button>
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        <form className={`popup__form popup__form_${name}`} name={name} method="POST" onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
