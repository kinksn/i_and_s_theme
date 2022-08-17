const headerSticky = ( elm ) => {
    const headerStikyLine = document.querySelector('#js-headerStickyLine').offsetTop;
    const headerClass = 'l-header--top';

    window.addEventListener( 'scroll', () => {

        let scrollPosition = window.scrollY;

        if ( scrollPosition > headerStikyLine ) {

            elm.classList.remove( headerClass );
            
        } else if ( scrollPosition < headerStikyLine ) {

            elm.classList.add( headerClass );

        }
    });
    
}

export default headerSticky;