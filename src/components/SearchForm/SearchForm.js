import React from 'react';

function SearchForm({ showResult }) {

    function handleSubmit(e) {
        e.preventDefault();
        showResult();
    }

    return (
        <form 
            className="search-form"
            onSubmit={handleSubmit}
        >
            <input
                className="search-form__input"
                type="text" 
                placeholder='Введите тему новости'
            />
            <button type="submit" className="search-form__search-button">Искать</button>
        </form>
    );
}

export default SearchForm;