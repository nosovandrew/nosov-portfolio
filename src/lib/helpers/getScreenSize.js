import { breakpoints } from 'src/lib/styles/breakpoints';

const getScreenSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

const isMobileScreen = () => getScreenSize().width < breakpoints.md;

export { getScreenSize, isMobileScreen };