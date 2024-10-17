<script>
    import uiStateStore from 'src/lib/stores/uiState';
    import { getWheelIndicator } from 'src/lib/stores/wheelIndicator';
    import { moveCameraForProjectInfo } from 'src/lib/utils/createScene';

    $: ({ isInfoVsbl, isModelAreaHovered, isInfoVsblAtLeastOnce } =
        $uiStateStore);
    const bodyElement = window.document.body;

    const handleHoverStart = () => {
        uiStateStore.set('isModelAreaHovered', true);
        bodyElement.classList.add('global--model-area-hovered');
    };

    const handleHoverEnd = () => {
        uiStateStore.set('isModelAreaHovered', false);
        bodyElement.classList.remove('global--model-area-hovered');
    };

    const showProjectInfo = () => {
        if ($uiStateStore.isScrollAllowed === false) {
            return;
        }
        if (isInfoVsblAtLeastOnce === false) {
            uiStateStore.set('isInfoVsblAtLeastOnce', true);
        }
        uiStateStore.set('isInfoVsbl', true);
        uiStateStore.set('isScrollAllowed', false);
        handleHoverEnd();
        moveCameraForProjectInfo({ x: 0, y: -2, z: 6 });
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if !isInfoVsbl}
    <div
        class="model-area"
        on:mouseenter={handleHoverStart}
        on:mouseleave={handleHoverEnd}
        on:click|preventDefault={showProjectInfo}
    />
{/if}

<style>
    .model-area {
        position: absolute;
        top: calc(50% - 32.5vh);
        left: calc(50% - 45vw);
        height: 70vh;
        width: 90vw;
        /* background-color: rgba(223, 14, 143, 0.5); */
    }

    @media (min-width: 1024px) {
        .model-area {
            top: calc(50% - 40vh);
            left: calc(50% - 25vw);
            height: 80vh;
            width: 50vw;
        }
    }
</style>
