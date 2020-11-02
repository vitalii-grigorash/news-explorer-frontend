import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import burgerMenuButtonWhite from '../../images/svg/burger-menu-button.svg';
import burgerMenuButtonBlack from '../../images/svg/burger-menu-button-black.svg';
import mobileButtonClose from '../../images/svg/mobile-button-close.svg';

function Header(props) {
    const { 
        loggedIn, 
        name, 
        signOut, 
        onAuthClick, 
        onBurgerButtonClick,
        isMobileOpen,
        isLogin,
        isRegister,
        isSuccess,
        onClose,
    } = props;

    const { pathname } = useLocation();
    const headerChange = `${pathname === '/' ? `header` : `header header_black`}`;
    const header = `${isMobileOpen ? `header` : headerChange}`;
    const logo = `${pathname === '/' ? `header__logo` : `header__logo header__logo_black`}`;
    const headerLogo = `${isMobileOpen ? `header__logo` : logo}`;
    const burgerMenuButton = `${pathname === '/' ? burgerMenuButtonWhite : burgerMenuButtonBlack }`;
    const changeButton = `${isMobileOpen ? mobileButtonClose : burgerMenuButton}`;
    const button = `${isLogin || isRegister || isSuccess ? mobileButtonClose : changeButton}`;

    return (
        <header className={header}>
            <Link to={'/'} className={headerLogo}>NewsExplorer</Link>
            <Navigation
                name={name}
                loggedIn={loggedIn}
                signOut={signOut}
                onAuthClick={onAuthClick}
            />
            <img 
                className='header__burger-menu-button' 
                src={button} 
                alt="Иконка меню для мобильной версии"
                onClick={isMobileOpen || isLogin || isRegister || isSuccess ? onClose : onBurgerButtonClick}
            />
        </header>
    );
}

export default Header;