import tab from './tab';
import headerSticky from './headerSticky';

function initIndex() {

    // mv true or false
    const mvFlag = document.querySelector('#mv');
    if ( !mvFlag ) return

    // about us tab menu
    const tabFlag = document.querySelector('#js-tab');
    if ( tabFlag ) {
        const tabItem = document.querySelectorAll("#js-tab .aboutUs__tabButtonItem");
        const tabContent = document.querySelectorAll("#js-tab .aboutUs__tabContent");
        tab( tabItem, tabContent );
    }

    // header sticky
    const headerStickyFlag = document.querySelector('#js-header--top');
    if ( headerStickyFlag ) headerSticky( headerStickyFlag );
   
    
}

export default initIndex;