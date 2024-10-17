<script>
    import Avatar from "src/lib/components/Avatar.svelte";
</script>

<div class="loading">
    <p>загружаю</p>
    <div class="loading__avatar">
        <Avatar />
    </div>
</div>

<style>
    .loading {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: black;
        color: white;
    }

    .loading p {
        animation: 1s ease-in-out infinite alternate shimmer
    }

    .loading__avatar {
        position: absolute;
        bottom: 4rem;
    }

    @keyframes shimmer {
        from {
            opacity: 1;
        }

        to {
            opacity: 0.5;
        }
    }
</style>