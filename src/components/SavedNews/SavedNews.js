import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews(props) {

    const { 
        show,
        card,
        isLoading,
        isNoResult,
        loggedIn,
        onRemoveCard,
    } = props;

    return (
        <>
            <SavedNewsHeader
                card={card}
                loggedIn={loggedIn}
            />
            
            <NewsCardList
                isNewsCard={false}
                show={show}
                cards={card}
                isLoading={isLoading}
                isNoResult={isNoResult}
                loggedIn={loggedIn}
                onRemoveCard={onRemoveCard}
            />
        </> 
    );
}

export default SavedNews;