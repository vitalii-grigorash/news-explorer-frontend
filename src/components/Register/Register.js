import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function Register(props) {

    const { 
        isOpen, 
        onClose, 
        onChangePopup, 
        onRegister,
    } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function submitForm() {
        if (!email && !password && !name) return;
        onRegister(email, password, name);
        setEmail('');
        setPassword('');
        setName('');
    }

    return (

        <PopupWithForm
            name='register-popup'
            title='Регистрация'
            submitButtonText='Зарегистрироваться'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={submitForm}
            changeFormText='Войти'
            onChangePopup={onChangePopup}
        >

            <span className="popup-with-form__input_heading">Email</span>
            <input
                type="email"
                className="popup-with-form__input popup-with-form__input_email"
                id="register-email-input"
                name="email"
                placeholder='Введите почту'
                minLength="2"
                maxLength="30"
                required
                value={email}
                onChange={handleEmailChange}
            />
            <span id="register-email-input-error" className="popup-with-form__input_error"></span>

            <span className="popup-with-form__input_heading">Пароль</span>
            <input
                type="password"
                className="popup-with-form__input popup-with-form__input_pasword"
                id="register-password-input"
                name="password"
                placeholder='Введите пароль'
                minLength="2"
                maxLength="30"
                required
                value={password}
                onChange={handlePasswordChange}
            />
            <span id="register-password-input-error" className="popup-with-form__input_error"></span>

            <span className="popup-with-form__input_heading">Имя</span>
            <input
                type="text"
                className="popup-with-form__input popup-with-form__input_name"
                id="register-name-input"
                name="name"
                placeholder='Введите своё имя'
                minLength="2"
                maxLength="40"
                pattern="[A-Za-zа-яёА-ЯЁ -]{1,}"
                required
                value={name}
                onChange={handleNameChange}
            />
            <span id="register-name-input-error" className="popup-with-form__input_error"></span>

        </PopupWithForm>
    )
}

export default Register;