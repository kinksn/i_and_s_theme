import { tab } from '../../common/utility';

function initAboutUs() {

    const pageFlug = document.querySelector('#aboutUs');
    if (!pageFlug ) return

    // about us tab menu
    const tabFlag = document.querySelector('#js-tab');
    if ( tabFlag ) {
        const tabItem = document.querySelectorAll("#js-tab .aboutUs__tabButtonItem");
        const tabContent = document.querySelectorAll("#js-tab .aboutUs__tabContent");
        tab( tabItem, tabContent );
    }

}

export default initAboutUs;