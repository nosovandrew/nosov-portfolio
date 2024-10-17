<!-- main three.js canvas and its logic placed here (root App component) to avoid rerender when switch pages -->

<script>
    import { Router, Link, Route } from 'svelte-routing';
    import { onMount } from 'svelte';

    import { createScene } from 'src/lib/utils/createScene';
    import uiStateStore from 'src/lib/stores/uiState';

    import Main from 'src/lib/pages/Main.svelte';
    import About from 'src/lib/pages/About.svelte';
    import NotFound from 'src/lib/pages/NotFound.svelte';
    import CustomCursors from 'src/lib/components/CustomCursors.svelte';
    import Loading from 'src/lib/components/Loading.svelte';

    export let url = ''; // url for router

    let canvasEl;
    let isLoading = true;
    $: ({ isMainCanvasVsbl } = $uiStateStore);

    onMount(async () => {
        await createScene(canvasEl);

        isLoading = false;
    });
</script>

<Router {url}>
    <Route path="/about"><About /></Route>
    <Route path="/"><Main /></Route>
    <Route component={NotFound} />
</Router>
<canvas
    style="--visibility:{isMainCanvasVsbl ? 'visible' : 'hidden'};"
    bind:this={canvasEl}
/>
<CustomCursors />
{#if isLoading}
    <Loading />
{/if}

<style>
    canvas {
        visibility: var(--visibility);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh; /* old browsers */
        height: 100dvh; /* new browsers */
        touch-action: none;
    }
</style>
