<script>
    import { fade } from 'svelte/transition';

    import currProjectStore from 'src/lib/stores/currProject';
    import uiStateStore from 'src/lib/stores/uiState';
    import { getWheelIndicator } from 'src/lib/stores/wheelIndicator';
    import { moveCameraForProjectInfo } from 'src/lib/utils/createScene';
    import {
        CUSTOMER_INFO_TYPES,
        PROJECT_CATEGORIES,
    } from 'src/lib/data/projects';

    import CloseIcon from 'src/lib/components/svg/CloseIcon.svelte';
    import TagBtn from 'src/lib/components/TagBtn.svelte';
    import ProjectInfoDescription from 'src/lib/components/ProjectInfoDescription.svelte';

    $: ({ isInfoVsbl } = $uiStateStore);
    $: project = $currProjectStore;

    const closeProjectInfo = () => {
        uiStateStore.set('isInfoVsbl', false);
        getWheelIndicator().turnOn(); // turn on scrolling models on desktop
        uiStateStore.set('isScrollAllowed', true);
        moveCameraForProjectInfo(); // move on default position
    };

    const getActivePeriod = (project) => {
        const activePeriodStart = project?.activePeriod.start.getFullYear();
        const activePeriodEnd =
            typeof project?.activePeriod.end === 'string'
                ? project?.activePeriod.end
                : project?.activePeriod.end.getFullYear();

        return activePeriodStart === activePeriodEnd
            ? `${activePeriodStart}`
            : `${activePeriodStart} - ${activePeriodEnd}`;
    };

    const isNda = (p) => {
        const result = p.categories?.some(
            (cat) => cat.value === PROJECT_CATEGORIES.nda.value,
        );

        return result;
    };
</script>

{#if project && isInfoVsbl}
    <div class="p-info" in:fade={{ duration: 500 }}>
        {#if isNda(project)}
            <img class="p-info__nda-sticker" src="/assets/images/nda-holo-sticker.png" alt="nda" />
        {/if}

        <div class="p-info__header">
            <button
                class="p-info__close-btn"
                on:click|preventDefault={closeProjectInfo}
            >
                <CloseIcon />
            </button>
        </div>
        <div class="p-info__content">
            <!-- title -->
            <h2 class="p-info__title">{project.title.toLowerCase()}</h2>
            <!-- roles -->
            <div class="p-info__devider" />
            <div class="p-info__roles">
                {#each project.roles as role}
                    <TagBtn data={role} />
                {/each}
            </div>
            <!-- customer (optional) -->
            <div class="p-info__devider" />
            {#if project.customer}
                {#if project.customer.type === CUSTOMER_INFO_TYPES.link}
                    <a
                        class="p-info__url ui-external-link"
                        href={project.customer.url}
                    >
                        {project.customer.title}
                    </a>
                {:else}
                    <p class="p-info__customer">
                        {project.customer.title}
                    </p>
                {/if}
            {/if}
            <!-- active period -->
            <div class="p-info__devider" />
            <div class="p-info__active-period">
                <span>{getActivePeriod(project)}</span>
                {#if project.activePeriod.state}
                    <TagBtn data={project.activePeriod.state} outlined={true} />
                {/if}
            </div>
            <!-- url (optional) -->
            {#if project.url}
                <div class="p-info__devider" />
                {#if /^https?:\/\//.test(project.url)}
                    <a class="p-info__url ui-external-link" href={project.url}>
                        {project.url}
                    </a>
                {:else}
                    <p class="p-info__url">
                        {project.url}
                    </p>
                {/if}
            {/if}
            <!-- tech stack -->
            <div class="p-info__devider" />
            <p class="p-info__tech-stack">
                {project.techStack.join(', ')}
            </p>
            <!-- description -->
            <div class="p-info__devider" />
            <ProjectInfoDescription description={project.description} />
        </div>
    </div>
{/if}

<style>
    .p-info {
        padding-top: 60vh;
        padding-bottom: 1rem;
    }

    .p-info__header {
        position: fixed;
        top: 0;
        right: 0;
        padding: 1rem;
        z-index: 1;
        line-height: 0;
    }

    .p-info__close-btn {
        cursor: pointer;
    }

    .p-info__nda-sticker {
        position: absolute;
        top: 30vh;
        left: 50%;
        transform: translate(-50%, -50%);
        rotate: -15deg;
        width: 200px;
    }

    .p-info__content > * {
        margin: 0;
    }

    .p-info__roles {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
    }

    .p-info__active-period {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
    }

    .p-info__devider {
        width: 100%;
        height: 1px;
        background-color: rgba(135, 135, 135);
        margin: 0.5rem 0;
    }
</style>
