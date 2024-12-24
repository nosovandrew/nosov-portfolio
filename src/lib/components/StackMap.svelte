<script>
    import TagBtn from 'src/lib/components/TagBtn.svelte';

    const TECHS = [
        {
            title: 'JavaScript',
            priority: 1,
        },
        {
            title: 'React',
            priority: 1,
        },
        {
            title: 'Next.js',
            priority: 1,
        },
        {
            title: 'Styled-Components',
            priority: 1,
        },
        {
            title: 'Express',
            priority: 1,
        },
        {
            title: 'Node.js',
            priority: 1,
        },
        {
            title: 'MongoDB',
            priority: 1,
        },
        {
            title: 'Git',
            priority: 1,
        },
        {
            title: 'TypeScript',
            priority: 2,
        },
        {
            title: 'Svelte',
            priority: 2,
        },
        {
            title: 'SQL',
            priority: 2,
        },
        {
            title: 'Three.js',
            priority: 3,
        },
        {
            title: 'Redux',
            priority: 3,
        },
        {
            title: 'GraphQL',
            priority: 3,
        },
        {
            title: 'Docker',
            priority: 3,
        },
        {
            title: 'Nginx',
            priority: 3,
        },
        {
            title: 'IIS',
            priority: 3,
        },
    ];

    const TECH_TAG_STYLES = [
        {
            bgColor: 'rgba(0, 143, 109, 1)',
            color: 'rgba(255, 255, 255, 1)'
        },
        {
            bgColor: 'rgba(0, 143, 109, 0.5)',
            color: 'rgba(230, 230, 230, 1)'
        },
        {
            bgColor: 'rgba(0, 143, 109, 0.25)',
            color: 'rgba(179, 179, 179, 1)'
        },
    ]


    const stack = TECHS.sort((a, b) => a.priority - b.priority).map((item) => ({
        ...item,
        bgColor: TECH_TAG_STYLES[item.priority - 1].bgColor,
        color: TECH_TAG_STYLES[item.priority - 1].color
    }));
</script>

<div class="stack-map">
    {#each stack as stackItem}
        <TagBtn data={stackItem} />
    {/each}
</div>

<style>
    .stack-map {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
    }
</style>
