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
  const [showSearchNews, setShowSearchNews] = useState(false);
  const [showSavedNews, setShowSavedNews] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [authError, setAuthError] = useState('');
  const [searchError, setsearchError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();

  function getCards (token) {
    MainApi.getCards(token)
    .then((cardData) => {
      setCard(cardData);
      if (cardData.length === 0) {
        setShowSavedNews(false);
      } else {
        setShowSavedNews(true);
      }
    })
    .catch((err) => console.log(`Ошибка при загрузке карточек: ${err}`));
  }

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      getCards(jwt);
    }
  }, [pathname]);

  React.useEffect(() => {
    if (localStorage.getItem('searchNews')) {
      const searchNews = localStorage.getItem('searchNews');
      const newNews = JSON.parse(searchNews);
      const newKeyword = localStorage.getItem('keyword');
      setNews(newNews);
      setShowSearchNews(true);
      setSearchKeyword(newKeyword);
    }
  },[]);

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

  React.useEffect(() => {
    if (!loggedIn && pathname === '/saved-news') {
      handleLoginPopupClick(); 
    }
  });

  const memoizedOnKeyup = useCallback(handleEscClose, []);

  function handleEscClose (evt) {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  function handleCardAdd (cardData) {
    const isSavedNews = card.find((i) => i.title === cardData.title);
    const jwt = localStorage.getItem('jwt');
    if (!isSavedNews) {
      MainApi.addCard(cardData, jwt)
      .then((res) => {
        setCard([...card, res]);
        getCards(jwt);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
      return;
    }
    handleCardDelete(isSavedNews);
  }

  function handleCardDelete (cards) {
    const jwt = localStorage.getItem('jwt');
    MainApi.removeCard(cards._id, jwt)
    .then((newCard) => {
      if (newCard) {
        const newCards = card.filter((c) => c._id === card._id ? !newCard : c);
        setCard(newCards);
        getCards(jwt);
      }
    })
    .catch((err) => console.log(`Ошибка: ${err}`)); 
  }

  function handleRegister(email, password, name) {
    setDisabled(true);
    MainApi.register(email, password, name)
    .then(() => {
      closeAllPopups();
      handleRegisterSuccessPopupClick();
    })
    .catch((err) => {
      setAuthError(err.message);
    })
    .finally(() => setDisabled(false));
  }

  function handleLogin(email, password) {
    setDisabled(true);
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
    .catch((err) => {
      setAuthError(err.message);
    })
    .finally(() => setDisabled(false));
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('searchNews');
    localStorage.removeItem('keyword');
    setShowSearchNews(false);
    history.push('/');
  }

  function handleShowMore() {
    setCurrentRow(currentRow + 1);
  }

  function handleSearchForm(value) {
    setLoading(true);
    setShowSearchNews(true);
    setCurrentRow(0);
    setSearchKeyword(value);
    localStorage.setItem('keyword', value);
    NewsApi.searchNews(value)
    .then((newsData) => {
      if (newsData.totalResults === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
        setNews(newsData.articles);
        localStorage.setItem('searchNews', JSON.stringify(newsData.articles));
      }
    })
    .catch((err) => {
      if (err) {
        console.log(`Ошибка: ${err}`)
        setsearchError(true);
      }
    })
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
    setAuthError('');
  }
  
  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className="app">

        <Header 
          isLogin={isLoginPopupOpen}
          isRegister={isRegisterPopupOpen}
          isSuccess={isRegisterSuccessPopupOpen}
          loggedIn={loggedIn}
          onSignOut={handleSignOut}
          onAuthClick={handleLoginPopupClick}
          onBurgerButtonClick={handleMobileNavigationClick}
        />

        <Switch>
          <ProtectedRoute path="/saved-news"
            loggedIn={loggedIn}
            component={SavedNews}
            show={showSavedNews}
            card={card}
            isLoading={false}
            isNoResult={false}
            onRemoveCard={handleCardDelete}
          />

          <Route path='/'>
            <Main
              loggedIn={loggedIn}
              news={news}
              card={card}
              show={showSearchNews}
              onSearchForm={handleSearchForm}
              onShowMore={handleShowMore}
              currentRow={currentRow}
              isLoading={isLoading}
              isNoResult={isNoResult}
              onAddCard={handleCardAdd}
              onRemoveCard={handleCardDelete}
              onAuthClick={handleRegisterPopupClick}
              searchKeyword={searchKeyword}
              searchError={searchError}
            />
          </Route>

        </Switch>

        <Footer />

        <Login
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          onChangePopup={handleChangePopup}
          onLogin={handleLogin}
          authError={authError}
          disabled={disabled}
        />

        <Register
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onChangePopup={handleChangePopup}
          onRegister={handleRegister}
          authError={authError}
          disabled={disabled}
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
          onSignOut={handleSignOut}
          onAuthClick={handleLoginPopupClick}
        />

      </div>

    </CurrentUserContext.Provider>

  );
}

export default App;
