import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

function MobileNavigation(props) {

    const {
        isOpen,
        loggedIn, 
        onSignOut, 
        onAuthClick,
        onClose,
    } = props;

    return (

        <section className={`mobile-navigation ${isOpen && 'mobile-navigation_opened'}`}>

            <div className="mobile-navigation__container">
                <Header
                    isMobileOpen={isOpen}  
                    onClose={onClose} 
                />

                <Navigation 
                    loggedIn={loggedIn}
                    onSignOut={onSignOut}
                    onAuthClick={onAuthClick}
                    isMobileOpen={isOpen}
                />
            </div>

        </section>

    );   
}

export default MobileNavigation;