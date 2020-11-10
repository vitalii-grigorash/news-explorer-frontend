import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { Validation } from '../../utils/Validation';

function Login (props) {

    const { 
        isOpen, 
        onClose, 
        onChangePopup,
        onLogin,
        authError,
        disabled,
    } = props;

    const email = Validation();
    const password = Validation();

    function submitForm() {
        onLogin(email.value, password.value);
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
            isFormValid={email.isValid && password.isValid}
            authError={authError}
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
            disabled={disabled}
            value={email.value}
            onChange={email.onChange}
            />
            <span id="login-email-input-error" className="popup-with-form__input_error">{email.errorMessage}</span>
        
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
            disabled={disabled}
            value={password.value}
            onChange={password.onChange}
            />
            <span id="login-password-input-error" className="popup-with-form__input_error">{password.errorMessage}</span>
        
        </PopupWithForm>
    )

}

export default Login;