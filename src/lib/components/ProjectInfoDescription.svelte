<script>
    export let description = '';
</script>

<div class="p-info-description">
    {@html description}
</div>

<style>
    .p-info-description :global(p) {
        margin: 1rem 0;
    }

    .p-info-description :global(img) {
        margin: 1rem 0;
        width: 100%;
        border-radius: 0.5rem;
    }
</style>
