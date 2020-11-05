import React, { useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function Login (props) {

    const { 
        isOpen, 
        onClose, 
        onChangePopup,
        onLogin,
    } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function submitForm() {
        if (!email && !password) return;
        onLogin(email, password);
        setEmail('');
        setPassword('');
    }

    return (

        <PopupWithForm
            name='login-popup'
            title='Вход'
            submitButtonText='Войти'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={submitForm}
            changeFormText='Зарегистрироваться'
            onChangePopup={onChangePopup}
        >
        
            <span className="popup-with-form__input_heading">Email</span>
            <input
            type="email"
            className="popup-with-form__input popup-with-form__input_email"
            id="login-email-input"
            name="email"
            placeholder='Введите почту'
            minLength="2"
            maxLength="30"
            required
            value={email}
            onChange={handleEmailChange}
            />
            <span id="login-email-input-error" className="popup-with-form__input_error"></span>
        
            <span className="popup-with-form__input_heading">Пароль</span>
            <input
            type="password"
            className="popup-with-form__input popup-with-form__input_pasword"
            id="login-password-input"
            name="password"
            placeholder='Введите пароль'
            minLength="2"
            maxLength="30"
            required
            value={password}
            onChange={handlePasswordChange}
            />
            <span id="login-password-input-error" className="popup-with-form__input_error"></span>
        
        </PopupWithForm>
    )

}

export default Login;