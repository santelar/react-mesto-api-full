import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register({ handleRegister }) {
  const [data, setData] = useState({ email: '', password: '' });

  function handleChangeData(evt) {
    const { name, value } = evt.target
    setData({ ...data, [name]: value });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleRegister(data)
  }

  return (
    <>
      <Header loginText={'Войти'} link="/sign-in" />
      <section className="account">
        <form onSubmit={handleSubmit} className="account__container">
          <h3 className="account__title">Регистрация</h3>
          <input value={data.email} onChange={handleChangeData} placeholder="Email" type="email" name="email"
              className="account__input account__input_register" id="email" required minLength="2" maxLength="40" />
          <input value={data.password} onChange={handleChangeData} placeholder="Пароль" type="password" name="password"
            className="account__input accountform__input_password" id="password" required minLength="2" maxLength="200" />
          <button type="submit" className="account__submit">Зарегистрироваться</button>
          <Link to="/sign-in" className="account__switch-text" >Уже зарегистрированы? Войти</Link>
        </form>
      </section>
    </ >
  )
}

export default Register
