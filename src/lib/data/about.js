export const LINKS_COLORS = {
    contact: 'rgba(248, 229, 89, 1)',
    socialNetwork: 'rgba(134, 74, 249, 1)',
    cv: 'rgba(243, 66, 19, 1)',
};

export const LINKS = [
    {
        title: 'Телеграм',
        url: 'https://t.me/andrewnosov',
        color: LINKS_COLORS.contact,
    },
    {
        title: 'Почта',
        url: 'mailto:drenosov@yandex.ru',
        color: LINKS_COLORS.contact,
    },
    {
        title: 'Дипрофайл',
        url: 'https://dprofile.ru/nosov',
        color: LINKS_COLORS.socialNetwork,
    },
    {
        title: 'Резюме.pdf',
        url: `${import.meta.env.VITE_BASE_URL ?? 'http://localhost:5173'}/download/nosov-frontend-developer-cv.pdf`,
        color: LINKS_COLORS.cv,
    },
]