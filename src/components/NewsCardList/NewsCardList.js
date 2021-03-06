import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import NoResult from '../NoResult/NoResult';
import { useLocation } from 'react-router-dom';

function NewsCardList(props) {

    const { 
        show, 
        news, 
        isLoading, 
        isNoResult,
        onShowMore,
        loggedIn,
        onAddCard,
        onRemoveCard,
        onAuthClick,
        isNewsCard,
        cards,
        searchKeyword,
        isMoreNews,
        searchError,
    } = props

    const { pathname } = useLocation();

    return (
        <>
            {show && 
                (   
                    <div className="news-card-list">
                        {isLoading ? <Preloader /> : 
                            <>
                                { isNoResult || searchError ? <NoResult searchError={searchError} /> :
                                    <>
                                        {pathname === '/' && 
                                            (
                                                <h2 className="news-card-list__header">Результаты поиска</h2>
                                            )
                                        }
                                        <div className="news-card-list__container">
                                            {isNewsCard ? (
                                                <>
                                                    {news.map((article, index) => (
                                                        <NewsCard
                                                            newsCard={article}
                                                            key={index}
                                                            loggedIn={loggedIn}
                                                            onAddCard={onAddCard}
                                                            onRemoveCard={onRemoveCard}
                                                            onAuthClick={onAuthClick}
                                                            searchKeyword={searchKeyword}
                                                            savedCard={cards}
                                                        />
                                                    ))}
                                                </>) : (
                                                <>
                                                    {cards.map((card, index) => (
                                                        <NewsCard
                                                            savedCard={card}
                                                            key={index}
                                                            loggedIn={loggedIn}
                                                            onAddCard={onAddCard}
                                                            onRemoveCard={onRemoveCard}
                                                            onAuthClick={onAuthClick}
                                                        />
                                                    ))}
                                                </>)
                                            }
                                        </div>
                                        {pathname === '/' && isMoreNews === true &&
                                            (
                                                <button 
                                                    className="news-card-list__show-button" 
                                                    onClick={onShowMore}>
                                                    Показать еще
                                                </button>
                                            )
                                        }
                                    </>
                                }
                            </> 
                        }
                    </div>
                )
            }
        </>
    );
}

export default NewsCardList;