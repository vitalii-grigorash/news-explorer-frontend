import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { articlesDeclension, numberDeclension, adjectiveDeclination } from '../../utils/utils';

function SavedNewsHeader({ card, loggedIn }) {

    const currentUser = React.useContext(CurrentUserContext);
    const keywords = loggedIn ? card.map(item => item.keyword) : [];

    const keywordsSorted = [...new Set(keywords)]
    .map(value => {
      const item = {};
      item.keyword = value;
      item.quantity = keywords.filter(str => str === value).length;
      return item;
    })
    .sort((a, b) => b.quantity - a.quantity)
    .map(item => item.keyword);

    const keywordsToRender = keywordsSorted.length <= 3
    ? keywordsSorted.join(', ')
    : `${keywordsSorted
    .slice(0, 3)
    .join(', ')} и ${keywordsSorted
    .slice(3)
    .length}-${numberDeclension(keywordsSorted)} ${adjectiveDeclination(keywordsSorted)}`;

    return (
        <>
            <section className="saved-news-header">
                <p className="saved-news-header__heading">Сохранённые статьи</p>
                <h3 className="saved-news-header__count">{currentUser.name}, у вас {card.length} сохранённыx {articlesDeclension(card)}</h3>
                <p className="saved-news-header__keywords">По ключевым словам:
                    <span className="saved-news-header__keywords-bold"> {keywordsToRender}</span>
                </p>
    
            </section>
        </> 
    );
}

export default SavedNewsHeader;