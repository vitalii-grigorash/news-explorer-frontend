import React from 'react';

function Preloader() {

    return (
        <>

            <section className="preloader">
                <div className="preloader__container">
                    <i class="preloader__circle-preloader"></i>
                </div>
                <p className="preloader__search-text">Идет поиск новостей...</p>
            </section>

        </>
    );
}

export default Preloader;