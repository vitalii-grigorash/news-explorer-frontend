import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoutIconWhite from '../../images/svg/logout-icon-white.svg';
import logoutIconBlack from '../../images/svg/logout-icon-black.svg';

function Navigation({ loggedIn, name, signOut, signIn }) {

    const { pathname } = useLocation();
    const authButtonText = `${loggedIn ? `${name}` : 'Авторизоваться'}`;
    const logoutIcon = `${pathname === '/' ? logoutIconWhite : logoutIconBlack}`;
    const mainUnderlineActive = `${pathname === '/' && `Header__link_active-white`}`;
    const newsUnderlineActive = `${pathname === '/saved-news' && `Header__link_active-black`}`;
    const headerLink = `${pathname === '/' ? `Header__link` : `Header__link Header__link_black`}`;
    const headerLogo = `${pathname === '/' ? `Header__logo` : `Header__logo Header__logo_black`}`;
    const headerLogoutButton = `${pathname === '/' ? `Header__logout-button` : `Header__logout-button Header__logout-button_black`}`;
    const headerAuthContainer = `${pathname === '/' ? `Header__auth-container` : `Header__auth-container Header__auth-container_black`}`;

    return (
        <>
            <Link to={'/'} className={headerLogo}>NewsExplorer</Link>
            <Link to={'/'} className={`${headerLink} ${mainUnderlineActive}`}>Главная</Link>
            {loggedIn && (
                <>
                    <Link to={'/saved-news'} className={`${headerLink} ${newsUnderlineActive}`}>Сохранённые статьи</Link>
                </>
            )}
            <div className={headerAuthContainer} onClick={loggedIn ? signOut : signIn}>
                <p className={headerLogoutButton}>{authButtonText}</p>
                {loggedIn && (
                    <>
                        <img className="Header__logout-icon" src={logoutIcon} alt="Иконка выхода" />
                    </>
                )}
            </div>
        </>
    );
}

export default Navigation;