import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegisterPopup(props) {

    const { isOpen, onClose, onChangePopup, onUpdateUserName } = props;

    const [name, setName] = useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUserName(name);
        onClose();
    }

    return (

        <PopupWithForm
            name='register-popup'
            title='Регистрация'
            submitButtonText='Зарегистрироваться'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            changeFormText='Войти'
            onChangePopup={onChangePopup}
        >
            <span className="popup-with-form__input_heading">Email</span>
            <input
                type="email"
                className="popup-with-form__input popup-with-form__input_email"
                id="email-input"
                name="email"
                placeholder='Введите почту'
                minLength="2"
                maxLength="30"
                required
            />
            <span id="email-input-error" className="popup-with-form__input_error"></span>

            <span className="popup-with-form__input_heading">Пароль</span>
            <input
                type="password"
                className="popup-with-form__input popup-with-form__input_pasword"
                id="password-input"
                name="password"
                placeholder='Введите пароль'
                minLength="2"
                maxLength="30"
                required
            />
            <span id="password-input-error" className="popup-with-form__input_error"></span>

            <span className="popup-with-form__input_heading">Имя</span>
            <input
                type="text"
                className="popup-with-form__input popup-with-form__input_name"
                id="name-input"
                name="name"
                placeholder='Введите своё имя'
                minLength="2"
                maxLength="40"
                pattern="[A-Za-zа-яёА-ЯЁ -]{1,}"
                required
                onChange={handleNameChange}
            />
            <span id="name-input-error" className="popup-with-form__input_error"></span>

        </PopupWithForm>
    )
}

export default RegisterPopup;