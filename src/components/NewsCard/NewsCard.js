import React from 'react';
import newsCardPhoto from '../../images/image-for-card.jpg'
import { useLocation } from 'react-router-dom';

function NewsCard() {

    const { pathname } = useLocation();
    const infoText = `${pathname === '/' ? `Войдите, чтобы сохранять статьи` : `Убрать из сохранённых`}`;

    return (
        <div className="news-card__container">
            <img className="news-card__image" alt="Фото статьи" src={newsCardPhoto} />
            {pathname !== '/' && 
                (
                    <div className="news-card__keyword-container">
                        <p className="news-card__keyword">Природа</p>
                    </div>
                )
            }
            <div className={pathname === '/' ?
                `news-card__button-container news-card__button-container_main` :
                `news-card__button-container news-card__button-container_saved-news`}>
                <div className="news-card__button-info-container">
                    <p className="news-card__button-info">{infoText}</p>
                </div>
                <button className={pathname === '/' ? `news-card__button news-card__button_add` : `news-card__button news-card__button_trash`}></button>
            </div>
            <div className="news-card__info">
                <p className="news-card__date">2 августа, 2019</p>
                <p className="news-card__heading">Национальное достояние – парки</p>
                <p className="news-card__description">В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала складываться система национальных парков – охраняемых территорий, где и сегодня каждый может приобщиться к природе.</p>
                <p className="news-card__sourse">Лента.ру</p>
            </div>
        </div>
    );
}

export default NewsCard;