import React from 'react';

function PopupWithForm(props) {
    const {
        name,
        title,
        submitButtonText,
        isOpen,
        onClose,
        onSubmit,
        children,
        changeFormText,
        onChangePopup,
        isSuccessPopup,
    } = props;

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit();
    }

    function handleOverlayClose(evt) {
        if ((evt.target).classList.contains('popup-with-form_opened')) {
            onClose();
        }
    }

    return (
        <div
            className={`popup-with-form popup-with-form_type_${name} ${isOpen && 'popup-with-form_opened'}`}
            onClick={handleOverlayClose}
        >
            <div
                className={`popup-with-form__container popup-with-form__container_type_${name}`}
            >
                <button
                    type='button'
                    className='popup-with-form__close-button'
                    onClick={onClose}
                ></button>
                <form
                    className="popup-with-form__forms"
                    onSubmit={handleSubmit}
                >
                    <h2 className="popup-with-form__heading">{title}</h2>
                    {children}
                    <div className="popup-with-form__handlers">
                        {!isSuccessPopup ?
                            (
                                <>
                                    <span className="popup-with-form__submit-button-error"></span>
                                    <button
                                        type='submit'
                                        className="popup-with-form__submit-button"
                                    >
                                        {submitButtonText}
                                    </button>

                                    <p className="popup-with-form__change-form">или <span
                                        className="popup-with-form__change-form popup-with-form__change-form_link"
                                        onClick={onChangePopup}
                                    >
                                        {changeFormText}
                                        </span>
                                    </p>
                                </>
                            ) : (
                                <p
                                    className="popup-with-form__change-form popup-with-form__change-form_link"
                                    onClick={onChangePopup}
                                >
                                    {changeFormText}
                                </p>    
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;