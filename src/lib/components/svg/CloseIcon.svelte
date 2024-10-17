<svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
>
    <circle cx="25" cy="25" r="25" fill="rgba(78, 78, 78, 1)" />
    <path d="M15 35L35 15M15 15L35 35" stroke="white" stroke-width="2" />
</svg>

<style>
    svg circle {
        transition: var(--ui-raw-btn-transition);
    }

    svg path {
        transition: var(--ui-raw-btn-transition);
    }

    svg:hover circle {
        fill: white;
    }

    svg:hover path {
        stroke: black;
    }
</style>
