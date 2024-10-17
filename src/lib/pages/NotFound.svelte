<script>
    import { Link, link } from 'svelte-routing';

    import uiStateStore from 'src/lib/stores/uiState';

    import Layout from 'src/lib/components/Layout.svelte';
    import LinkBtn from 'src/lib/components/LinkBtn.svelte';
    import { SITE_TITLE } from 'src/lib/constants/global';

    uiStateStore.set('isMainCanvasVsbl', false); // hide main canvas
</script>

<svelte:head>
    <title>{`404 | ${SITE_TITLE}`}</title>
</svelte:head>
<main class="notfound-page">
    <h1 class="notfound-page__title">
        тут<br />
        ничего<br />
        нет
    </h1>
    <LinkBtn
        type="internal"
        data={{
            color: 'white',
            bgColor: 'rgba(78, 78, 78, 1)',
            url: '/',
            title: '← на главную',
        }}
    />
</main>

<style>
    .notfound-page {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .notfound-page__title {
        text-align: center;
    }
</style>
