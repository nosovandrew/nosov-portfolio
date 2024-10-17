<script>
    import { onMount } from 'svelte';

    import uiStateStore from 'src/lib/stores/uiState';

    import Layout from 'src/lib/components/Layout.svelte';
    import ProjectInfo from 'src/lib/components/ProjectInfo.svelte';
    import ModelArea from 'src/lib/components/ModelArea.svelte';
    import Header from 'src/lib/components/Header.svelte';
    import UserActionHelper from 'src/lib/components/UserActionHelper.svelte';
    import { SITE_TITLE } from 'src/lib/constants/global';

    $: ({ isInfoVsbl, isInfoVsblAtLeastOnce } = $uiStateStore);

    uiStateStore.set('isMainCanvasVsbl', true); // show main canvas
</script>

<svelte:head>
    <title>{SITE_TITLE}</title>
</svelte:head>
<Layout>
    <Header slot="header" />
    <svelte:fragment slot="children">
        <ModelArea />
        <ProjectInfo />
        {#if !isInfoVsbl}
            <div class="scroll-helper">
                <UserActionHelper
                    position={{ x: '50%', y: '2.5%' }}
                    type="scroll"
                />
            </div>
            {#if !isInfoVsblAtLeastOnce}
                <div class="click-helper">
                    <UserActionHelper
                        position={{ x: '70%', y: '50%' }}
                        type="click"
                    />
                </div>
            {/if}
        {/if}
    </svelte:fragment>
</Layout>

<style>
    /* not standard usage due to canvas on this page */
    :global(.layout) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        min-height: 100vh; /* old browsers */
        min-height: 100dvh; /* new browsers */
        z-index: 1;
    }

    @media (min-width: 1024px) {
        .click-helper {
            display: none;
        }
    }
</style>
