export const isSP = () => {

    const breakPointSp = 1024;
    const isBreakpoint = window.matchMedia( '(max-width: ' + breakPointSp + 'px)' ).matches;

    if ( isBreakpoint ) {
        return true;
    } else {
        return false;
    }

};