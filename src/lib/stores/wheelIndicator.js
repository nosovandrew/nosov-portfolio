import { writable, get } from 'svelte/store';

const wheelIndicatorStore = writable(undefined);

export const getWheelIndicator = () => get(wheelIndicatorStore);
export const setWheelIndicator = (value) => wheelIndicatorStore.set(value);
