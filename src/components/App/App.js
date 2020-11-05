import React, { useState, useCallback } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import Login from '../Login/Login';
import Register from '../Register/Register';
import RegisterSuccessPopup from '../RegisterSuccessPopup/RegisterSuccessPopup';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Header from '../Header/Header';
import MobileNavigation from '../MobileNavigation/MobileNavigation'
import Footer from '../Footer/Footer';
import * as MainApi from '../../utils/MainApi';
import * as NewsApi from '../../utils/NewsApi';
import { useLocation } from 'react-router-dom';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [news, setNews] = useState([]);
  const [card, setCard] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [isLoginPopupOpen, setLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setRegisterPopupOpen] = useState(false);
  const [isRegisterSuccessPopupOpen, setRegisterSuccessPopupOpen] = useState(false);
  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isNoResult, setNoResult] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();

  const memoizedOnKeyup = useCallback(handleEscClose, []);

  function handleEscClose (evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleCardAdd (cardData) {
    const jwt = localStorage.getItem('jwt');
    MainApi.addCard(cardData, jwt)
    .then((res) => {
      setCard([...card, res]);
      console.log(cardData);
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
  }

  function handleCardDelete (evt) {
    console.log('Removed')  
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (pathname === '/saved-news') {
      MainApi
      .getCards(jwt)
      .then((cardData) => {
        setCard(cardData);
      })
      .catch((err) => console.log(`Ошибка при загрузке карточек: ${err}`));
    }
  }, [pathname]);

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      MainApi.getContent(jwt)
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res.data);
        history.push('/');
      })
      .catch(err => console.log(err));
    }
  }, [history]);

  function handleRegister(email, password, name) {
    MainApi.register(email, password, name)
    .then(() => {
      closeAllPopups();
      handleRegisterSuccessPopupClick();
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleLogin(email, password) {
    MainApi.authorize(email, password)
    .then((res) => {
      if (res.token) {
        MainApi.getContent(res.token)
        .then((res) => {
          setCurrentUser(res.data);
          setLoggedIn(true);
          closeAllPopups();
        })
        .catch((err) => console.log(`Ошибка: ${err}`));
      }
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/');
  }

  function handleShowMore() {
    setCurrentRow(currentRow + 1);
  }

  function handleSearchForm(value) {
    setLoading(true);
    setShow(true);
    setCurrentRow(0);
    NewsApi.searchNews(value)
    .then((newsData) => {
      if (newsData.totalResults === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
        setNews(newsData.articles)
      }
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => setLoading(false));
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

  function closeAllPopups() {
    setLoginPopupOpen(false);
    setRegisterPopupOpen(false);
    setRegisterSuccessPopupOpen(false);
    setMobileNavigationOpen(false);
    document.removeEventListener('keyup', memoizedOnKeyup);
  }
  
  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className="app">

        <Header 
          isLogin={isLoginPopupOpen}
          isRegister={isRegisterPopupOpen}
          isSuccess={isRegisterSuccessPopupOpen}
          loggedIn={loggedIn}
          signOut={handleSignOut}
          onAuthClick={handleLoginPopupClick}
          onBurgerButtonClick={handleMobileNavigationClick}
        />

        <Switch>
          <ProtectedRoute exact path="/saved-news"
            loggedIn={loggedIn}
            component={SavedNews}
            show={show}
            card={card}
            isLoading={false}
            isNoResult={false}
            onRemoveCard={handleCardDelete}
          />

          <Route path='/'>
            <Main
              loggedIn={loggedIn}
              news={news}
              show={show}
              onSearchForm={handleSearchForm}
              onShowMore={handleShowMore}
              currentRow={currentRow}
              isLoading={isLoading}
              isNoResult={isNoResult}
              onAddCard={handleCardAdd}
              onRemoveCard={handleCardDelete}
              onAuthClick={handleLoginPopupClick}
            />
          </Route>

        </Switch>

        <Footer />

        <Login
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          onChangePopup={handleChangePopup}
          onLogin={handleLogin}
        />

        <Register
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onChangePopup={handleChangePopup}
          onRegister={handleRegister}
        />

        <RegisterSuccessPopup
          isOpen={isRegisterSuccessPopupOpen}
          onClose={closeAllPopups}
          onChangePopup={handleChangePopup}
        />

        <MobileNavigation
          isOpen={isMobileNavigationOpen}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
          signOut={handleSignOut}
          onAuthClick={handleLoginPopupClick}
        />

      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;
