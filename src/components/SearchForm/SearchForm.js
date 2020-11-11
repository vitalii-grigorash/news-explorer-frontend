import React from 'react';
import { Validation } from '../../utils/Validation';

function SearchForm({ searchForm }) {

    const search = Validation();

    function submitForm(evt) {
        evt.preventDefault();
        if (!search.value) {
            search.setErrorMessage('Нужно ввести ключевое слово');
            return;
        }
        searchForm(search.value);
    };

    return (
        <>
        <form 
            className="search-form"
            onSubmit={submitForm}
        >

            <input
                type="text" 
                className="search-form__input"
                id="search-form-input"
                name="search"
                placeholder='Введите тему новости'
                value={search.value}
                onChange={search.onChange}
            />
            <span id="search-form-input-error" className="search-form__input_error">{search.errorMessage}</span>

            <button type="submit" className="search-form__search-button">Искать</button>
        </form>
        </>
    );
}

export default SearchForm;