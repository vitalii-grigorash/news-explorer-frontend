import React, { useState } from 'react';

function SearchForm({ searchForm }) {

    const [search, setSearch] = useState('');

    function handleSearchInput(evt) {
        setSearch(evt.target.value);
    }

    function submitForm(e) {
        e.preventDefault();
        searchForm(search);
    }

    return (
        <form 
            className="search-form"
            onSubmit={submitForm}
        >
            <input
                className="search-form__input"
                type="text" 
                placeholder='Введите тему новости'
                required
                value={search}
                onChange={handleSearchInput}
            />
            <button type="submit" className="search-form__search-button">Искать</button>
        </form>
    );
}

export default SearchForm;