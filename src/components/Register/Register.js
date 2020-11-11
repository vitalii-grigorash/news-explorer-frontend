import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { Validation } from '../../utils/Validation';

function Register(props) {

    const { 
        isOpen, 
        onClose, 
        onChangePopup, 
        onRegister,
        authError,
        disabled,
    } = props;

    const email = Validation();
    const password = Validation();
    const name = Validation();

    function submitForm() {
        onRegister(email.value, password.value, name.value);
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
            isFormValid={email.isValid && password.isValid && name.isValid}
            authError={authError}
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
                disabled={disabled}
                value={email.value}
                onChange={email.onChange}
            />
            <span id="register-email-input-error" className="popup-with-form__input_error">{email.errorMessage}</span>

            <span className="popup-with-form__input_heading">Пароль</span>
            <input
                type="password"
                className="popup-with-form__input popup-with-form__input_pasword"
                id="register-password-input"
                name="password"
                placeholder='Введите пароль'
                minLength="8"
                maxLength="30"
                required
                disabled={disabled}
                value={password.value}
                onChange={password.onChange}
            />
            <span id="register-password-input-error" className="popup-with-form__input_error">{password.errorMessage}</span>

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
                disabled={disabled}
                value={name.value}
                onChange={name.onChange}
            />
            <span id="register-name-input-error" className="popup-with-form__input_error">{name.errorMessage}</span>

        </PopupWithForm>
    )
}

export default Register;