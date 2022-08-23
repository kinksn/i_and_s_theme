const modal = () => {

    const body = document.querySelector( 'body' );
    let   scrollTop,
          scrollPosition;

    const modalOpen = function(e) {
        const dataModalOpen = e.currentTarget.dataset.modalOpen;
        scrollTop = window.pageYOffset;
        scrollPosition = scrollTop;
        body.style.position = 'fixed';
        body.style.setProperty( 'top', `-${ scrollTop }px` );

        Array.from( document.querySelectorAll('.js-c-modal') )
            .forEach( e => {
                if( e.getAttribute('data-modal') === dataModalOpen ) {
                    e.classList.toggle('is-open');
                }
            })
    }

    Array.from( document.querySelectorAll('.js-c-card__link') )
        .forEach( modalOpenElement => {
            modalOpenElement.addEventListener( 'click', modalOpen );
        });


    const modalClose = function(e) {
        const target = e.currentTarget.closest('.js-c-modal');
        body.style.position = 'static';
        body.style.top = 0;
        target.classList.toggle('is-open');
        window.scrollTo( 0, scrollPosition );
    }

    Array.from( document.querySelectorAll('.js-c-modal__close') )
        .forEach( modalCloseElement => {
            modalCloseElement.addEventListener( 'click', modalClose );
        });

    Array.from( document.querySelectorAll('.js-c-modal__bg') )
        .forEach( modalCloseElement => {
            modalCloseElement.addEventListener( 'click', modalClose );
        });

}

export default modal;