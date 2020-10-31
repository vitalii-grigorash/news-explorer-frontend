import React, { useState, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import RegisterSuccessPopup from '../RegisterSuccessPopup/RegisterSuccessPopup';
import Header from '../Header/Header';
import MobileNavigation from '../MobileNavigation/MobileNavigation'
import Footer from '../Footer/Footer';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);
  const [isRegisterSuccessPopupOpen, setRegisterSuccessPopupOpen] = useState(false);
  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [name, setName] = useState('Грета');
  const history = useHistory();

  const memoizedOnKeyup = useCallback(handleEscClose, []);

  function handleEscClose (evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleChangePopup (evt) { 
    if ((evt.target).textContent === 'Зарегистрироваться') { 
      closeAllPopups();
      handleRegisterPopupClick();
    } else {
      closeAllPopups();
      handleLoginPopupClick();
    }
  }

  function handleMobileNavigationClick() {
    setMobileNavigationOpen(true);
  }

  function handleLoginPopupClick() {
    setLoginPopupOpen(true);
    if (isMobileNavigationOpen) {
      setMobileNavigationOpen(false);
    }
    document.addEventListener('keyup', memoizedOnKeyup);
  }

  function handleRegisterPopupClick() {
    setRegisterPopupOpen(true);
    document.addEventListener('keyup', memoizedOnKeyup);
  }

  function handleRegisterSuccessPopupClick() {
    setRegisterSuccessPopupOpen(true);
    document.addEventListener('keyup', memoizedOnKeyup);
  }

  function handleShowResult() {
    setShow(true);
  }

  function handleSignOut() {
    setLoggedIn(false);
    history.push('/');
  }

  function handleSignIn() {
    setLoggedIn(true);
  }

  function registerForm (name) {
    setName(name);
  }

  function closeAllPopups() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false);
    setRegisterSuccessPopupOpen(false);
    setMobileNavigationOpen(false);
    document.removeEventListener('keyup', memoizedOnKeyup);
  }
  
  return (
    <div className="app">

      <Header 
        isLogin={isLoginPopupOpen}
        isRegister={isRegisterPopupOpen}
        isSuccess={isRegisterSuccessPopupOpen}
        name={name}
        loggedIn={loggedIn}
        signOut={handleSignOut}
        onAuthClick={handleLoginPopupClick}
        onBurgerButtonClick={handleMobileNavigationClick}
      />

        <Switch>

        <Route path='/saved-news'>
          <SavedNews
            name={name}
            show={show}
          />
        </Route>

        <Route path='/'>
          <Main
            show={show}
            showResult={handleShowResult}
          />
        </Route>

        </Switch>

        <Footer />

        <LoginPopup
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          signIn={handleSignIn}
          onChangePopup={handleChangePopup}
        />

        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onUpdateUserName={registerForm}
          onChangePopup={handleChangePopup}
          onRegisterSuccessPopup={handleRegisterSuccessPopupClick}
        />

        <RegisterSuccessPopup
          isOpen={isRegisterSuccessPopupOpen}
          onClose={closeAllPopups}
          onChangePopup={handleChangePopup}
        />

        <MobileNavigation
          isOpen={isMobileNavigationOpen}
          onClose={closeAllPopups}
          name={name}
          loggedIn={loggedIn}
          signOut={handleSignOut}
          onAuthClick={handleLoginPopupClick}
        />

    </div>
  );
}

export default App;
