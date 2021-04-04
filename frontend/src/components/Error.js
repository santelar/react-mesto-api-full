import React from "react";
import Header from "./Header";
import {Link} from "react-router-dom";

function Error() {
  return(
    <>
      <Header />
      <div className="error">
        <h3 className="error__title">Страница не найдена.</h3>
        <Link to="/" className="account__switch-text">На главную страницу</Link>
      </div>
    </>
  );
}

export default Error;
