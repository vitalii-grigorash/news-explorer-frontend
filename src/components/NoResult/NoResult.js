import React from 'react';
import noResultImage from '../../images/svg/no-result.svg'

function NoResult({ searchError }) {

    const resultInfo = `${!searchError ? 'К сожалению по вашему запросу ничего не найдено' : 
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
    }`

    return (

        <section className="no-result">
            <img className="no-result__image" src={noResultImage} alt="Ничего не найдено" />
            <h3 className="no-result__heading">Ничего не найдено</h3>
            <p className="no-result__description">{resultInfo}</p>
        </section>
    );
}

export default NoResult;