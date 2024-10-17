<script>
    import { link } from 'svelte-routing';

    import uiStateStore from 'src/lib/stores/uiState';

    import Avatar from './Avatar.svelte';
    import { SITE_TITLE } from 'src/lib/constants/global';

    $: ({ isInfoVsbl } = $uiStateStore);
</script>

{#if !isInfoVsbl}
    <div class="header">
        <div class="header__title">
            <p>{SITE_TITLE}</p>
        </div>
        <a use:link href="/about" class="ui-raw-btn header__btn">
            <p>резюме</p>
        </a>
        <Avatar />
    </div>
{/if}

<style>
    .header {
        padding: 1rem;
        z-index: 1;
        display: flex;
        justify-content: stretch;
        align-items: end;
        gap: 0.5rem;
    }

    .header__title {
        flex-grow: 1;
        background-color: transparent;
        align-self: center;
    }

    .header__title p {
        margin: 0;
    }

    .header__btn {
        align-self: stretch;
        border-radius: 1.25rem;
        background-color: rgba(30, 30, 30, 1);
        color: white;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .header__btn p {
        margin: 0.5rem 1rem;
    }

    @media (min-width: 1024px) {
        .header {
            width: fit-content;
            margin-left: auto;
        }
    }
</style>
