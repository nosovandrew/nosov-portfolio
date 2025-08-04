<script>
    import TagBtn from 'src/lib/components/TagBtn.svelte';

    const TECHS = [
        // {
        //     title: 'Figma',
        //     priority: 1,
        // },
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
            title: 'SCSS',
            priority: 1,
        },
        
        {
            title: 'React Context API',
            priority: 1,
        },
        {
            title: 'Node.js',
            priority: 1,
        },
        {
            title: 'Express.js',
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
            title: 'Docker',
            priority: 1,
        },
        {
            title: 'Vercel',
            priority: 1,
        },
        {
            title: 'TypeScript',
            priority: 3,
        },
        {
            title: 'Svelte',
            priority: 3,
        },
        // {
        //     title: 'Three.js',
        //     priority: 3,
        // },
        {
            title: 'Redux Toolkit',
            priority: 3,
        },
        {
            title: 'GraphQL(Apollo)',
            priority: 3,
        },
        {
            title: 'PostgreSQL',
            priority: 3,
        },
        {
            title: 'MSSQL',
            priority: 3,
        }
    ];

    const TECH_TAG_STYLES = [
        {
            bgColor: 'rgba(200, 200, 200, 1)',
            color: 'rgba(0, 0, 0, 1)'
        },
        {
            // 2nd priority is depricated (bad in current color scheme)
            bgColor: 'rgba(200, 200, 200, 0.5)',
            color: 'rgba(150, 150, 150, 1)'
        },
        {
            bgColor: 'rgba(200, 200, 200, 0.25)',
            color: 'rgba(200, 200, 200, 1)'
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
