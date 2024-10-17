<script>
    export let type; // 'click', 'scroll'
    export let position = { x: 0, y: 0 }; // from left bottom corner

    const helperText = type === 'click' ? 'клик' : 'скролл';
</script>

<div class="user-action-helper" style="--x: {position.x}; --y: {position.y};">
    <div
        class="user-action-helper__circle user-action-helper__circle--animate-{type}"
    />
    <p class="user-action-helper__text">
        {helperText}
    </p>
</div>

<style>
    .user-action-helper {
        position: absolute;
        left: var(--x);
        bottom: var(--y);
        display: flex;
        align-items: center;
        gap: 0.4rem;
        transform: translate(-50%, -50%);
        user-select: none;
        padding: 0.25rem 0.4rem;
        border-radius: 99rem;
        background-color: rgba(30, 30, 30, 1);
    }

    .user-action-helper__circle {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        background-color: white;
    }

    .user-action-helper__text {
        margin: 0;
    }

    .user-action-helper__circle--animate-click {
        animation: 1s ease-out infinite alternate click;
    }

    @keyframes click {
        from {
            opacity: 0.25;
        }

        to {
            opacity: 1;
        }
    }

    .user-action-helper__circle--animate-scroll {
        animation: 1s ease-out infinite alternate scroll;
    }

    @keyframes scroll {
        from {
            transform: translate(0, -4px);
            opacity: 1;
        }

        to {
            transform: translate(0, 4px);
            opacity: 0.5;
        }
    }
</style>
