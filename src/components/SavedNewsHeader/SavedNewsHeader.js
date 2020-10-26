import React from 'react';

function SavedNewsHeader({ name }) {

    return (
        <>
            <section className="saved-news-heder">
                <p className="saved-news-heder__heading">Сохранённые статьи</p>
                <h3 className="saved-news-heder__count">{name}, у вас 1 сохранённая статья</h3>

                <p className="saved-news-heder__keywords">По ключевым словам:
                    <span className="saved-news-heder__keywords-bold"> Природа, Тайга</span> и
                    <span className="saved-news-heder__keywords-bold"> 2-м другим</span>
                </p>

            </section>
        </> 
    );
}

export default SavedNewsHeader;