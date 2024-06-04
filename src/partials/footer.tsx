import React from 'react';

const Footer = () => {
  return (
    <footer className="sh__footer">
      <div className="sh__footer-wrp">
        <h2 className="sh__footer--text">
          Built with&nbsp;
          <picture className="sh__footer--love-icon">
            <source srcSet="images/heart.svg?as=avif&width=80" type="image/avif" />
            <source srcSet="images/heart.svg?as=webp&width=80" type="image/webp" />
            <source srcSet="images/heart.svg?width=80" type="image/png" />
            <img src="images/heart.svg?width=80" alt="heart icon" />
          </picture>
          &nbsp;by&nbsp;
          <a href="https://twitter.com/heysagnik" className="sh__footer--user">
            <span>Sagnik</span>
          </a>
          <picture className="sh__footer--user-icon">
            <source srcSet="images/sagnik.png?as=avif&width=100" type="image/avif" />
            <source srcSet="images/sagnik.png?as=webp&width=100" type="image/webp" />
            <source srcSet="images/sagnik.png?width=100" type="image/jpg" />
            <img src="images/sagnik.png?width=100" alt="sagnik icon" />
          </picture>
        </h2>
      </div>
    </footer>
  );
};

export default Footer;