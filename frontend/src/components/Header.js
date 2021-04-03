import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../images/header__logo.svg';

function Header({ loggedIn, loginText, onClick, link, login }) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Лого" className="header__logo" />
      <div className="header__container">
        <p className="header__email">{login}</p>
        <Link to={link}
          className={`${loggedIn ? "header__link_exit" : ""} header__link`}
          onClick={onClick}
        >
          {loginText}
        </Link>
      </div>
    </header>
  );
}

export default Header;
