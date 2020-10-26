import React from 'react';
import { Link } from 'react-router-dom';
import githubIcon from '../../images/svg/github-icon.svg';
import facebookIcon from '../../images/svg/facebook-icon.svg';

function Footer() {

    return (

        <footer className="footer">

            <p className="footer__copyright">&copy; 2020 Supersite, Powered by News API</p>

            <nav className="footer__navigation-container">

                <Link to={'/'} className="footer__links">Главная</Link>

                <a 
                    className="footer__links" 
                    href="https://praktikum.yandex.ru/" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    Яндекс.Практикум
                </a>

                <a className="footer__social-icons" href="https://github.com/" target="_blank" rel="noopener noreferrer">
                    <img className="footer__social-icon" src={githubIcon} alt="Иконка Гитхаба" />
                </a>

                <a className="footer__social-icons" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                    <img className="footer__social-icon" src={facebookIcon} alt="Иконка Фейсбука" />
                </a>
            </nav>

        </footer>
    );
}

export default Footer;