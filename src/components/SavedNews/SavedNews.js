import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader'
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNews({ show, name }) {

    return (
        <>
            <SavedNewsHeader
                name={name}
            />
            <NewsCardList
                show={show}
            />
        </> 
    );
}

export default SavedNews;