import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Login({ handleLogin }) {

  const [data, setData] = React.useState({ email: '', password: '' });

  function handleSubmit(evt) {
    evt.preventDefault();
    handleLogin(data)
  }

  function handleChangeData(evt) {
    const { name, value } = evt.target
    setData({ ...data, [name]: value });
  }

  return (
    <>
      <Header loginText={'Регистрация'} link="/sign-up" />
      <section className="account">
        <form onSubmit={handleSubmit} className="account__container">
          <h3 className="account__title">Вход</h3>
          <input value={data.email} onChange={handleChangeData} placeholder="Email" type="email" name="email"
            className="account__input account__input_register" id="email" required minLength="2" maxLength="40" />
          <input value={data.password} onChange={handleChangeData} placeholder="Пароль" type="password" name="password"
            className="account__input account__input_password" id="password" required minLength="2" maxLength="200" />
          <button type="submit" className="account__submit">Войти</button>
          <Link to="/sign-up" className="account__switch-text" >Не зарегистрированы? Регистрация</Link>
        </form>
      </section>
    </ >
  )
}

export default Login
