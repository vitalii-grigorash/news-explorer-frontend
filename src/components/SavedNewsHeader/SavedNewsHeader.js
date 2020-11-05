import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader() {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <section className="saved-news-header">
                <p className="saved-news-header__heading">Сохранённые статьи</p>
                <h3 className="saved-news-header__count">{currentUser.name}, у вас 3 сохранённые статьи</h3>

                <p className="saved-news-header__keywords">По ключевым словам:
                    <span className="saved-news-header__keywords-bold"> Природа, Тайга</span> и
                    <span className="saved-news-header__keywords-bold"> 2-м другим</span>
                </p>

            </section>
        </> 
    );
}

export default SavedNewsHeader;