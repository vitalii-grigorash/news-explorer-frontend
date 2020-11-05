import React from 'react';
import { useLocation } from 'react-router-dom';

function NewsCard(props) {

    const { 
        newsCard, 
        loggedIn, 
        onAddCard, 
        onRemoveCard, 
        onAuthClick,
        savedCard,
    } = props;

    const { pathname } = useLocation();
    const infoText = `${pathname === '/' ? `Войдите, чтобы сохранять статьи` : `Убрать из сохранённых`}`;

    const options = {
        month: 'long',
        day: 'numeric',
    };

    const date = new Date(pathname === '/' && newsCard.publishedAt);
    const dayAndMonth = date.toLocaleString('ru', options);
    const fullDate = dayAndMonth + ', ' + date.getFullYear();

    function addCard () {
        onAddCard({
            keyword: 'Природа',
            title: newsCard.title,
            text: newsCard.description,
            date: fullDate,
            source: newsCard.source.name,
            link: newsCard.url,
            image: newsCard.urlToImage,
          });   
    }

    return (
        <div className="news-card__container">
            <img className="news-card__image" alt={pathname === '/' ? newsCard.title : savedCard.title} src={pathname === '/' ? newsCard.urlToImage : savedCard.image} />
            {pathname !== '/' && 
                (
                    <div className="news-card__keyword-container">
                        <p className="news-card__keyword">{savedCard.keyword}</p>
                    </div>
                )
            }
            <div className={pathname === '/' ?
                `news-card__button-container news-card__button-container_main` :
                `news-card__button-container news-card__button-container_saved-news`}>
                <div className="news-card__button-info-container">
                    {loggedIn && pathname === '/' ? '' : 
                        <p className="news-card__button-info">{infoText}</p>
                    }
                </div>
                <button 
                    className={pathname === '/' ? `news-card__button news-card__button_add` : `news-card__button news-card__button_trash`}
                    onClick={loggedIn ? (pathname === '/' ? addCard : onRemoveCard) : (onAuthClick)}
                ></button>
            </div>
            <div className="news-card__info">
                <p className="news-card__date">{pathname === '/' ? fullDate : savedCard.date}</p>
                <p className="news-card__heading">{pathname === '/' ? newsCard.title : savedCard.title}</p>
                <p className="news-card__description">{pathname === '/' ? newsCard.description : savedCard.text}</p>
            </div>
            <a 
                href={pathname === '/' ? newsCard.url : savedCard.link} 
                className="news-card__sourse"  
                target='_blank' rel='noopener noreferrer'>
                {pathname === '/' ? newsCard.source.name : savedCard.source}
            </a>
        </div>
    );
}

export default NewsCard;