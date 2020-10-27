import React, { useState, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import LoginPopup from '../LoginPopup/LoginPopup';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
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

  function handleLoginPopupClick() {
    setLoginPopupOpen(true);
    document.addEventListener('keyup', memoizedOnKeyup);
  }

  function handleRegisterPopupClick() {
    setRegisterPopupOpen(true);
    document.addEventListener('keyup', memoizedOnKeyup);
  }

  function handleShowResult() {
    setShow(true);
  }

  function handleSignOut() {
    setLoggedIn(false);
    setName('');
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
    document.removeEventListener('keyup', memoizedOnKeyup);
  }
  
  return (
    <div className="app">

      <Header 
        name={name}
        loggedIn={loggedIn}
        signOut={handleSignOut}
        onAuthClick={handleLoginPopupClick}
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
        />

    </div>
  );
}

export default App;
