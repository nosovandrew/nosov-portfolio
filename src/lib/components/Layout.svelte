<div class="layout">
    <slot name="header" />
    <main>
        <slot name="children" />
    </main>
</div>

<style>
    main {
        padding: 1rem;
        /* padding-top: 0; */
    }

    @media (min-width: 1024px) {
        .layout main {
            padding: 0 30%;
        }
    }
</style>
