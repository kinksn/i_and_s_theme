const spMenu = () => {

    const body = document.querySelector('body'),
          spMenuButton = document.querySelector('#js-spMenuButton'),
          headerNav = document.querySelector('#js-headerNav');
    let   scrollTop,
          scrollPosition;

    // スクロールイベントが発生する度に変数scrollTopにスクロール値を格納
    window.addEventListener( 'scroll', function() {
        scrollTop = window.pageYOffset;
    });
    
    spMenuButton.addEventListener( 'click', function() {
        this.classList.toggle( 'is-active' );
        headerNav.classList.toggle( 'is-active' );
        body.classList.toggle( 'is-fixed' );
        
        
        if ( body.classList.contains( 'is-fixed' ) ) {
            body.style.setProperty( 'top', `-${scrollTop}px` );
            scrollPosition = scrollTop;
        } else {
            window.scrollTo( 0, scrollPosition );
            body.style.setProperty( 'top', 0 );
        } 
        // body.style.setProperty( 'top', `-${scrollTop}px` );
    });
}

export default spMenu;