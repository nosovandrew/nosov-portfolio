<script>
    import { LINKS } from 'src/lib/data/about';

    import uiStateStore from 'src/lib/stores/uiState';

    import Layout from 'src/lib/components/Layout.svelte';
    import LinkBtn from 'src/lib/components/LinkBtn.svelte';
    import StackMap from 'src/lib/components/StackMap.svelte';
    import { SITE_TITLE } from 'src/lib/constants/global';

    uiStateStore.set('isMainCanvasVsbl', false); // hide main canvas
</script>

<svelte:head>
    <title>{`Резюме | ${SITE_TITLE}`}</title>
</svelte:head>
<Layout>
    <div class="about-page" slot="children">
        <LinkBtn
            type="internal"
            data={{
                color: 'white',
                bgColor: 'rgba(78, 78, 78, 1)',
                url: '/',
                title: '← проекты',
            }}
        />
        <h1>
            андерей<br />носов
        </h1>
        <div class="about-page__links">
            {#each LINKS as link}
                <LinkBtn type="external" data={link} />
            {/each}
        </div>
        <p>
            Привет! Я JS-разработчик с фокусом на фронтенд. Больше всего пишу на
            React. Люблю самостоятельно дизайнить интерфейсы и не только,
            поэтому хорошо знаком с Figma и популрными графическими редакторами.
        </p>
        <p>
            Не боюсь работать с бэкендом, разбираюсь в построении API,
            авторизации, интеграции с базами данных. Есть опыт развертывания
            приложений на сервере, в том числе с использованием Docker.
        </p>
        <p>Опыт работы — 3 года.</p>
        <p>Стек:</p>
        <StackMap />
    </div>
</Layout>

<style>
    .about-page__links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
    }

    @media (min-width: 1024px) {
        .about-page {
            /* about header height on desktop */
            margin-top: 5rem;
        }
    }
</style>
