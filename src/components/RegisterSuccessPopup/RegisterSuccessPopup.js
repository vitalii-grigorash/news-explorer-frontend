import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function RegisterSuccessPopup(props) {

    const { 
        isOpen, 
        onClose, 
        onChangePopup, 
    } = props;

    return (

        <PopupWithForm
            name='register-success-popup'
            title='Пользователь успешно зарегистрирован!'
            isOpen={isOpen}
            onClose={onClose}
            changeFormText='Войти'
            onChangePopup={onChangePopup}
            isSuccessPopup={true}
        ></PopupWithForm>
    )
}

export default RegisterSuccessPopup;