<script>
    export let data;
    export let outlined = false;

    let color;
    let borderColor;
    let bgColor;
    // attach colors based on wheter custom bgColor is provided
    if (!data.bgColor) {
        color = outlined ? data.color : 'black';
        borderColor = data.color;
        bgColor = data.color;
    } else {
        color = data.color;
        borderColor = data.color;
        bgColor = data.bgColor;
    }
</script>

<div
    class={`ui-raw-btn ui-common-btn tag-btn ${outlined ? 'tag-btn_outlined' : ''}`}
    style="--color:{color}; --bg-color:{bgColor}; --border-color:{borderColor};"
>
    {data.title}
</div>

<style>
    .tag-btn {
        background-color: var(--bg-color);
        color: var(--color);
        pointer-events: none;
        cursor: none;
        border-radius: 0.5rem;
    }

    .tag-btn_outlined {
        border: 2px solid var(--border-color);
        color: var(--color);
        background-color: transparent;
    }
</style>
