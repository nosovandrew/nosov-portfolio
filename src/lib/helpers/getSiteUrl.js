const getSiteUrl = () =>
    import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL ? `https://${import.meta.env.VITE_VERCEL_PROJECT_PRODUCTION_URL}` : import.meta.env.VITE_LOCAL_URL;

export { getSiteUrl };