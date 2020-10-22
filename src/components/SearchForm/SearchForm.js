import React from 'react';

function SearchForm() {

    return (

        <form className="search-form">
            <input
                className="search-form__input"
                type="text" 
                placeholder='Введите тему новости'
            />
            <button type='button' className='search-form__search-button'>Искать</button>
        </form>
    );
}

export default SearchForm;