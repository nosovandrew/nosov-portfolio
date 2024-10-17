export const breakpoints = {
    // xs is default style
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
};

export const mediaquery = {
    // xs is default size
    sm: `@media (min-width: ${breakpoints.sm}px)`,
    md: `@media (min-width: ${breakpoints.md}px)`,
    lg: `@media (min-width: ${breakpoints.lg}px)`,
    xl: `@media (min-width: ${breakpoints.xl}px)`,
    xxl: `@media (min-width: ${breakpoints.xxl}px)`,
}