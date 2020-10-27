import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoutIconWhite from '../../images/svg/logout-icon-white.svg';
import logoutIconBlack from '../../images/svg/logout-icon-black.svg';

function Navigation({ loggedIn, name, signOut, onAuthClick }) {

    const { pathname } = useLocation();
    const authButtonText = `${loggedIn ? `${name}` : 'Авторизоваться'}`;
    const logoutIcon = `${pathname === '/' ? logoutIconWhite : logoutIconBlack}`;
    const mainUnderlineActive = `${pathname === '/' && `navigation__link_active-white`}`;
    const newsUnderlineActive = `${pathname === '/saved-news' && `navigation__link_active-black`}`;
    const navigationLink = `${pathname === '/' ? `navigation__link` : `navigation__link navigation__link_black`}`;
    const navigationLogo = `${pathname === '/' ? `navigation__logo` : `navigation__logo navigation__logo_black`}`;
    const navigationLogoutButton = `${pathname === '/' ? `navigation__logout-button` : `navigation__logout-button navigation__logout-button_black`}`;
    const navigationAuthContainer = `${pathname === '/' ? `navigation__auth-container` : `navigation__auth-container navigation__auth-container_black`}`;

    return (
        <nav className="navigation">
            <Link to={'/'} className={navigationLogo}>NewsExplorer</Link>
            <Link to={'/'} className={`${navigationLink} ${mainUnderlineActive}`}>Главная</Link>
            {loggedIn && (
                <>
                    <Link to={'/saved-news'} className={`${navigationLink} ${newsUnderlineActive}`}>Сохранённые статьи</Link>
                </>
            )}
            <div className={navigationAuthContainer} onClick={loggedIn ? signOut : onAuthClick}>
                <p className={navigationLogoutButton}>{authButtonText}</p>
                {loggedIn && (
                    <>
                        <img className="navigation__logout-icon" src={logoutIcon} alt="Иконка выхода" />
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navigation;