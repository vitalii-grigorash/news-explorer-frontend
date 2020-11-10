import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoutIconWhite from '../../images/svg/logout-icon-white.svg';
import logoutIconBlack from '../../images/svg/logout-icon-black.svg';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation({ loggedIn, onSignOut, onAuthClick, isMobileOpen }) {

    const currentUser = React.useContext(CurrentUserContext);

    const { pathname } = useLocation();
    const authButtonText = `${loggedIn ? `${currentUser.name}` : 'Авторизоваться'}`;
    const logoutIconChange = `${pathname === '/' ? logoutIconWhite : logoutIconBlack}`;
    const logoutIcon = `${isMobileOpen ? logoutIconWhite : logoutIconChange}`;
    const mainUnderlineActive = `${pathname === '/' && `navigation__link_active-white`}`;
    const newsUnderlineActive = `${pathname === '/saved-news' && `navigation__link_active-black`}`;
    const navigationLink = `${pathname === '/' ? `navigation__link` : `navigation__link navigation__link_black`}`;
    const navigationLogoutButton = `${pathname === '/' ? `navigation__logout-button` : `navigation__logout-button navigation__logout-button_black`}`;
    const navigationAuthContainer = `${pathname === '/' ? `navigation__auth-container` : `navigation__auth-container navigation__auth-container_black`}`;
    const navigation = `${isMobileOpen ? `navigation-mobile` : `navigation`}`

    return (
        <nav className={navigation}>
            <Link to={'/'} className={`${navigationLink} ${mainUnderlineActive}`}>Главная</Link>
            {loggedIn && (
                <>
                    <Link to={'/saved-news'} className={`${navigationLink} ${newsUnderlineActive}`}>Сохранённые статьи</Link>
                </>
            )}
            <div className={navigationAuthContainer} onClick={loggedIn ? onSignOut : onAuthClick}>
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