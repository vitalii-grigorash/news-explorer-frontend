import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import mainBackgroundImage from '../../images/main-background.jpg'
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Main(props) {

    const { 
        show, 
        onSearchForm, 
        news, 
        onShowMore, 
        currentRow, 
        isLoading, 
        isNoResult, 
        loggedIn,
        onAddCard,
        onRemoveCard,
        onAuthClick,
    } = props;

    const { pathname } = useLocation();
    const mainBackground = `${pathname === '/' && `main__background`}`;

    const cardsPerRow = 3;

    const newsToRender = news.slice(0, (currentRow + 1) * cardsPerRow);

    // const currentUser = React.useContext(CurrentUserContext);

    return (

        <main className="main">

            <img className={mainBackground} src={mainBackgroundImage} alt="Фоновое изображение"/>

            <section className="search">
                <h1 className="search__heading">Что творится в мире?</h1>
                <p className="search__description">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <SearchForm
                    searchForm={onSearchForm}
                />
            </section>

            <NewsCardList
                isNewsCard={true}
                isLoading={isLoading}
                news={newsToRender}
                show={show}
                onShowMore={onShowMore}
                isNoResult={isNoResult}
                loggedIn={loggedIn}
                onAddCard={onAddCard}
                onRemoveCard={onRemoveCard}
                onAuthClick={onAuthClick}
            />

            <About />

        </main>
    );
}

export default Main;