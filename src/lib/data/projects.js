const PROJECT_ROLES = {
    frontend: {
        title: 'Фронтенд',
        color: 'rgba(200, 255, 224)',
    },
    backend: {
        title: 'Бэкенд',
        color: 'rgba(133, 230, 197)',
    },
    design: {
        title: 'Дизайн',
        color: 'rgba(51, 187, 197)',
    },
    founder: {
        title: 'Основатель',
        color: 'rgba(97, 75, 195)',
    },
};

export const PROJECT_CATEGORIES = {
    nda: {
        title: 'NDA',
        value: 'nda',
    }
}

const PROJECT_PROGRESS_STAGES = {
    inProgress: {
        title: 'В разработке',
        color: 'rgba(253, 228, 0)',
    },
    archived: {
        title: 'Архив',
        color: 'rgba(253, 46, 0)',
    },
};

export const CUSTOMER_INFO_TYPES = {
    text: 'text',
    link: 'link',
}

const PROJECT_CUSTOMERS = {
    nda: {
        type: CUSTOMER_INFO_TYPES.text,
        title: 'Заказчик под NDA',
    },
    personal: {
        type: CUSTOMER_INFO_TYPES.text,
        title: 'Личный проект',
    }
}

const PROJECT_URLS = {
    nda: {
        title: 'Ссылка на проект под NDA',
    },
}

const PROJECT_PERIODS = {
    tillNow: {
        title: 'настоящее время',
    }
}

export const PROJECTS = [
    {
        id: '669185f002e51cca45001ac8',
        categories: [],
        modelPath: '/assets/gltfs/NickMikhalevPortfolio/scene.gltf',
        title: 'Портфолио для Nick Mikhalev',
        roles: [PROJECT_ROLES.frontend, PROJECT_ROLES.design, PROJECT_ROLES.backend],
        customer: {
            type: CUSTOMER_INFO_TYPES.link,
            title: 'Телеграм заказчика @velahim',
            url: 'https://t.me/velahim',
        },
        activePeriod: {
            start: new Date(2024, 0, 1),
            end: new Date(2024, 0, 1)
        },
        url: 'https://design-nick.com',
        techStack: ['Next.js v14', 'React-Admin', 'MongoDB', 'JWT'],
        description:
            '<p>Портфолио для графического дизайнера, в котором он может самостоятельно публиковать проекты в формате фото или видео, а также сортировать их по категориям.</p><p>Фронтенд реализован с помощью Next.js. Главная страница содержит список проектов дизайнера, для их загрузки используются Server Actions. Пагинация выполнена в формате Infinite Scroll.</p><img src="assets/projects/NickMikhalevPortfolio/main.webp" alt="Главная страница" /><p>По клику на проект раскрывается модальное окно с видеоплеером, либо крупным изображением.</p><img src="assets/projects/NickMikhalevPortfolio/modal.webp" alt="Модальное окно" /><p>База данных MongoDB. Медиа хранится в Cloudinary. Роль хостинга выполняет Vercel.</p><p>С помощью React-Admin написана панель администратора, которая интегрирована в Next.js приложение. Функционал позволяет создавать новые проекты параллельно выгружая медиа контент в сервис Cloudinary, а также редактировать и удалять существующие проекты. API админки написано с помощью Next.js Route Handlers. Для аутентификации администратора используется технология JWT.</p><img src="assets/projects/NickMikhalevPortfolio/admin.webp" alt="Панель администратора" /><p>Мобильная версия, без нее никуда.</p><div class="description__image-group"><img src="assets/projects/NickMikhalevPortfolio/mobile-main.webp" alt="Главная страница на смартфоне" /><img src="assets/projects/NickMikhalevPortfolio/mobile-contact.webp" alt="Страница с контактами на смартфоне" /></div>',
    },
    {
        id: '6703f00ea97e742c1081427d',
        categories: [PROJECT_CATEGORIES.nda],
        modelPath: '/assets/gltfs/CryptoExchange/scene.gltf',
        title: 'Админка крипто обменника',
        roles: [PROJECT_ROLES.frontend],
        customer: PROJECT_CUSTOMERS.nda,
        activePeriod: {
            start: new Date(2023, 0, 1),
            end: new Date(2023, 0, 1),
        },
        url: PROJECT_URLS.nda.title,
        techStack: ['React', 'TypeScript', 'React-Admin', 'Material UI'],
        description:
            '<p>Проект представляет собой классическую панель управления для администраторов. Реализовано взаимодействие с табличными данными, визуализация статистики по этим данным. Аутентификация с помощью JWT-токенов, авторизация с разделением пользователей на несколько уровней доступа.</p><p>На этом проекте я совмещал роли разработчика и менеджера. Команда из трех человек: я и мой помощник занимались фронтендом, еще один человек полностью занимался бэкендом.</p><p>Заказчик предоставил техническое задание, по которому мы с командой составили список составных частей интерфейса и логики будущего приложения, а затем я перенес его в Asana (менеджер проектов) в виде kanban-доски, к которой имеется доступ у каждого члена команды. Дальнейшая работа проходила в соответствии с выставленными сроками и приоритетами.</p><p>Из трудностей, с которыми пришлось столкнуться, можно отметить сжатый срок для требуемого объема работ, а также первое знакомство с такими технологиями, как React-Admin и библиотека Material UI.</p>',
    },
    {
        id: '6703f018168b0fdc9fa8ade2',
        categories: [PROJECT_CATEGORIES.nda],
        modelPath: '/assets/gltfs/Zavod/scene.gltf',
        title: 'Инф-ая система предприятия',
        roles: [PROJECT_ROLES.frontend, PROJECT_ROLES.design, PROJECT_ROLES.backend],
        customer: PROJECT_CUSTOMERS.nda,
        activePeriod: {
            start: new Date(2022, 0, 1),
            end: PROJECT_PERIODS.tillNow.title,
        },
        url: PROJECT_URLS.nda.title,
        techStack: ['Next.js', 'Styled-Components', 'Docusaurus', 'Microsoft Windows SSPI', 'Microsoft SQL Server', 'NGINX', 'PM2'],
        description:
            '<p>Основная задача — обновление сервисов, которыми пользуются сотрудники организации.</p><p>В рамках данного проекта я разработал дизайн интерфейса и написал фронтенд, а также интегрировал обновленный фронтенд с уже написанным до меня бэкендом.</p><p>Для создания дизайн-макетов выбран Lunacy, он похож на Figma по функционалу и может работать без доступа в Интернет. На фронтенде используется Next.js, а также библиотеки для интеграции с Microsoft SQL Server и механизмами аутентификации Microsoft Windows. Документация для разработчиков написана с помощью Docusaurus.</p><p>Все приложения запущены на сервере в виде PM2-процессов, также там работает NGINX, который выполняет функцию прокси.</p><p>К трудностям, в первую очередь, можно отнести отсутствие Интернета в сети, что требует особой настройки окружения для совместной работы над проектом, особенно сильно это сказывается на управлении npm-пакетами. Также разброс конфигураций усложняет настройку браузера на компьютере пользователя через групповые политики.</p>',
    },
    {
        id: '67751724f221cdc27d554560',
        categories: [],
        modelPath: '/assets/gltfs/EightiesBagDrop/scene.gltf',
        title: 'Спортивные сумки "80"',
        roles: [PROJECT_ROLES.frontend, PROJECT_ROLES.design, PROJECT_ROLES.backend],
        customer: PROJECT_CUSTOMERS.personal,
        activePeriod: {
            start: new Date(2021, 0, 1),
            end: new Date(2022, 0, 1)
        },
        url: 'https://eighties.vercel.app',
        techStack: ['Next.js v12', 'SWR', 'Styled-Components', 'MongoDB', 'GraphQL', 'Node.js Telegram Bot API'],
        description:
            '<p> Онлайн-магазин для сбора предзаказов на спортивную сумку "80".</p><p> Дизайн интерфейса максимально минималистичный и понятный. Это сделано для того, чтобы не распылять внимание пользователя и максимально эффективно сопроводить его от момента входа на сайт, до успешного создания заказа.</p><p> Фронтенд реализован с помощью Next.js версии 12 (Pages Router). Все страницы сайта статически генерируются во время сборки (Static Site Generation), что дает высокую скорость загрузки контента для конечного пользователя.</p><img src="assets/projects/EightiesBagDrop/catalog.webp" alt="Страница каталога" /><p> Индивидуальная страница товара содержит фото, базовое описание и кнопку "Добавить", которая добавляет товар в корзину.</p><img src="assets/projects/EightiesBagDrop/product.webp" alt="Страница товара" /><p> Находсь в корзине можно регулировать количество каждого из добавленных товаров. Кнопка "Оформить заказ" ведет пользователя на страницу с формой, которая соберет все необходимые данные для доставки.</p><img src="assets/projects/EightiesBagDrop/cart.webp" alt="Корзина" /><img src="assets/projects/EightiesBagDrop/form.webp" alt="Форма сбора данных для доставки" /><p> В случае успешной отпраки формы пользователь будет перенаправлен на страницу с подтверждением заказа. Менеджер получит всю информацию о заказе в Телеграм через бота, написанного с помощью библиотеки "Node.js Telegram Bot API".</p><img src="assets/projects/EightiesBagDrop/success-order.webp" alt="Информация о заказе и сообщение в Телеграм"><p>Экраны с мобильной версткой.</p><img src="assets/projects/EightiesBagDrop/mobile-catalog.webp" alt="Каталог на экране смартфона" /><img src="assets/projects/EightiesBagDrop/mobile-product.webp" alt="Страница товара на экране смартфона" /><img src="assets/projects/EightiesBagDrop/mobile-cart.webp" alt="Корзина на экране смартфона" />'
    },
];