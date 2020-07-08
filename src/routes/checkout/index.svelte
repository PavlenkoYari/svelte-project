<script context="module">
	export async function preload(page) {
        const { value, currency, crypto } = page.query;

        return {value, currency, crypto};
	}
</script>
<script>
import {currName, amount, currCrypto} from '../../store/store.js';
import CheckoutPage from "./_checkoutWrapp.svelte"
import CheckoutStepTwo from "./_checkoutStepTwo.svelte"
import { onMount } from 'svelte';

export let value;
export let currency;
export let crypto

if(value){
    amount.update( () => value)
}
if(currency){
    currName.update( () => currency)
}
if(crypto){
	currCrypto.update( () => crypto)
}

</script>

<CheckoutPage >
    <CheckoutStepTwo/>
</CheckoutPage>
