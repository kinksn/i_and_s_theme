import spMenu from './spMenu';
import modal from './modal';
import SmoothScroll from 'smooth-scroll';

function initCommon() {
    spMenu(); // sp humburger menu

    modal();

    // smooth scroll
    let options = { 
        speed: 140,
        easing: 'easeInOutCubic',
        offset: 0
    };
    let scroll = new SmoothScroll( 'a[href*="#"]', options );
}

export default initCommon;