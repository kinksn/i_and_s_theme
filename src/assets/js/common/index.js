import spMenu from './spMenu';
import SmoothScroll from 'smooth-scroll';

function initCommon() {
    spMenu(); // sp humburger menu

    // smooth scroll
    let options = { 
        speed: 140,
        easing: 'easeInOutCubic',
        offset: 0
    };
    let scroll = new SmoothScroll( 'a[href*="#"]', options );
}

export default initCommon;