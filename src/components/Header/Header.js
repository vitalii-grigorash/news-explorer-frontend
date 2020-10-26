import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, name, signOut, signIn }) {

    const { pathname } = useLocation();
    const header = `${pathname === '/' ? `header` : `header header_black`}`;

    return (
        <header className={header}>
            <Navigation
                name={name}
                loggedIn={loggedIn}
                signOut={signOut}
                signIn={signIn}
            />
        </header>
    );
}

export default Header;