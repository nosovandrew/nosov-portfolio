<script>
    import { link } from 'svelte-routing';

    export let data;
    export let type = 'internal'; // 'internal' or 'external'

    // attach colors based on wheter custom bgColor is provided
    let color = data.bgColor ? data.color : 'black';
    let bgColor = data.bgColor ? data.bgColor : data.color;
</script>

{#if type === 'external'}
    <a
        target="_blank"
        href={data.url}
        class="ui-raw-btn ui-common-btn link-btn"
        style="--color:{color}; --bg-color:{bgColor}">{data.title}</a
    >
{:else}
    <a
        use:link
        href={data.url}
        class="ui-raw-btn ui-common-btn link-btn"
        style="--color:{color}; --bg-color:{bgColor}">{data.title}</a
    >
{/if}

<style>
    .link-btn {
        background-color: var(--bg-color);
        color: var(--color);
    }
</style>
