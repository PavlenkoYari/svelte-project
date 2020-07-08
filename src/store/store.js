import { writable, readable } from 'svelte/store';


export const amount = writable(10);
export const countCrupto = writable(0);
export const currName = writable("GBP");
export const currIco = writable("£");
export const currCrypto = writable("BTC")
export const currency = writable([]);
export const cryptocurrency = writable([]);
export const minAndMax = writable([10, 500]);
export const payment = writable([]);
export const language = writable({});
