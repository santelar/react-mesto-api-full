import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__title">&copy; {new Date().getFullYear()} Mesto Russia. Alexander Ponomarenko</p>
    </footer>
  );
}

export default Footer;
