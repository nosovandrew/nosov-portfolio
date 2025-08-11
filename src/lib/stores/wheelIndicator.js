import { writable, get } from 'svelte/store';

const wheelIndicatorStore = writable(undefined);

export const getWheelIndicator = () => get(wheelIndicatorStore);
export const setWheelIndicator = (value) => wheelIndicatorStore.set(value);
export const turnOffWheelIndicator = () => {
    const wi = get(wheelIndicatorStore);
    if (wi) {
        wi.turnOff();
    }
}
export const turnOnWheelIndicator = () => {
    const wi = get(wheelIndicatorStore);
    if (wi) {
        wi.turnOn();
    }
}

export default wheelIndicatorStore;
