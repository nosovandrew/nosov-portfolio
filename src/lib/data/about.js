export const LINKS_COLORS = {
    contact: 'rgba(111, 231, 78)',
    socialNetwork: 'rgba(200, 200, 200)',
    cv: 'rgba(200, 200, 200)',
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
    // {
    //     title: 'Дипрофайл',
    //     url: 'https://dprofile.ru/nosov',
    //     color: LINKS_COLORS.socialNetwork,
    // },
    {
        title: 'Гитхаб',
        url: 'https://github.com/nosovandrew',
        color: LINKS_COLORS.socialNetwork,
    },
    {
        title: 'Резюме.pdf',
        url: `${__APP_URL__}/download/nosov-frontend-developer-cv.pdf`,
        color: LINKS_COLORS.cv,
    },
]