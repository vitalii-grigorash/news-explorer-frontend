import React from 'react';
import noResultImage from '../../images/svg/no-result.svg'

function NoResult() {

    return (

        <section className="no-result">
            <img className="no-result__image" src={noResultImage} alt="Ничего не найдено" />
            <h3 className="no-result__heading">Ничего не найдено</h3>
            <p className="no-result__description">К сожалению по вашему запросу ничего не найдено.</p>
        </section>
    );
}

export default NoResult;