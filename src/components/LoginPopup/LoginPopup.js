import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function LoginPopup (props) {

    const { isOpen, onClose, onChangePopup, signIn } = props;

    function handleSubmit(e) {
        e.preventDefault();
        signIn();
        onClose();
    }

    return (

        <PopupWithForm
            name='login-popup'
            title='Вход'
            submitButtonText='Войти'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
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
            />
            <span id="login-password-input-error" className="popup-with-form__input_error"></span>
        
        </PopupWithForm>
    )

}

export default LoginPopup;