import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
// import Preloader from '../Preloader/Preloader';
// import NoResult from '../NoResult/NoResult';
import { useLocation } from 'react-router-dom';

function NewsCardList({ show }) {

    const { pathname } = useLocation();

    return (
        <>
            {show && 
                (   
                    <div className="news-card-list">
                        {/* <Preloader /> */}
                        {/* <NoResult /> */}
                        {pathname === '/' && 
                            (
                                <h2 className="news-card-list__header">Результаты поиска</h2>
                            )
                        }
                        <div className="news-card-list__container">
                            <NewsCard />
                        </div>
                        {pathname === '/' && 
                            (
                                <button className="news-card-list__show-button">Показать еще</button>
                            )
                        }
                    </div>
                )
            }
        </>
    );
}

export default NewsCardList;