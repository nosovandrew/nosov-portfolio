<script>
    import uiStateStore from 'src/lib/stores/uiState';

    import EyeCursor from 'src/lib/components/svg/EyeCursor.svelte';

    let customCursor;
    $: ({ isModelAreaHovered } = $uiStateStore);

    const moveCustomCursor = (x, y) => {
        customCursor.style.transform = `translate(${x}px, ${y}px)`;
    };

    // cursor coords
    const cursor = {};
    cursor.x = 0;
    cursor.y = 0;

    // handle cursor moving
    window.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;

        moveCustomCursor(cursor.x, cursor.y);
    });
</script>

<div
    class="cursors-container"
>
    <div class="cursors-container__cursor" bind:this={customCursor}>
        <div
            class={`cursors-container__eye ${
                isModelAreaHovered ? 'cursors-container__eye--visible' : ''
            }`}
        >
            <EyeCursor />
        </div>
    </div>
</div>

<style>
    .cursors-container {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    }

    .cursors-container__cursor {
        position: absolute;
        will-change: transform;
        transform: translate(-25px, -25px);
    }

    .cursors-container__eye {
        position: absolute;
        top: -25px;
        left: -25px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 0;

        transform: scale(0);
        transition: transform 0.2s ease-in;
    }

    .cursors-container__eye--visible {
        transform: scale(1);
        transition-timing-function: cubic-bezier(0.5, 2.25, 1, 1.1);
        transition-duration: 0.4s;
    }

    @media (min-width: 1024px) {
        .cursors-container {
            display: block;
        }
    }
</style>
