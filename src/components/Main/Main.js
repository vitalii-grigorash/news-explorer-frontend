import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import mainBackgroundImage from '../../images/main-background.jpg'

function Main() {

    const { pathname } = useLocation();
    const mainBackground = `${pathname === '/' && `main__background`}`;

    return (

        <main className="main">

            <img className={mainBackground} src={mainBackgroundImage} alt="Фоновое изображение"/>

            <section className="search">
                <h1 className="search__heading">Что творится в мире?</h1>
                <p className="search__description">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
                <SearchForm />
            </section>

        </main>
    );
}

export default Main;