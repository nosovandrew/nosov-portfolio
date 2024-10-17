import { writable } from 'svelte/store';

const createUiStateStore = () => {
    const initialState = {
        isInfoVsbl: false,
        isInfoVsblAtLeastOnce: false,
        isScrollAllowed: true,
        isModelAreaHovered: false,
        isMainCanvasVsbl: false,
    };

    const store = writable(initialState);
    const { subscribe, update } = store;

    const methods = {
        set(key, value) {
            if (typeof value !== 'boolean') {
                throw new Error(`Value of ${key} must be boolean.`);
            }
            update((state) => ({
                ...state,
                [key]: value,
            }));
        },
    };

    return {
        subscribe,
        ...methods,
    };
};

const uiStateStore = createUiStateStore();

export default uiStateStore;

// Usage of custom store (sample)
//
// import uiStateStore from './uiStateStore.js';
// ...
// $: ({ isInfoVisible, isScrollAllowed } = $uiStateStore);
// ...
// <button on:click={() => uiStateStore.<someMethod>()}>Toggle</button>
