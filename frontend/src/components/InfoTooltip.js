import React from 'react';
import login from "../images/login.svg";
import loginErr from "../images/loginErr.svg";
import buttonPlus from '../images/add-button__plus.svg';

export default function InfoTooltip({
    isOpen,
    onClose,
    isAuthSuccess,
    goodRegister,
    badRegister
}) {
    return (
        <section className={`${isOpen ? "popup_opened" : ""} popup popup__info`}>
            <div className="popup__container popup__container_login">
            <button className="button" aria-label="Закрыть" onClick={onClose}><img src={buttonPlus} alt="Закрыть" className="popup__close popup__close_info"/></button>
                <img className="popup__image-login" alt="info" src={`${isAuthSuccess ? login : loginErr}`}/>
                <p className="popup__text-login">{`${isAuthSuccess ? goodRegister : badRegister}`}</p>
            </div>
        </section>
    )}
