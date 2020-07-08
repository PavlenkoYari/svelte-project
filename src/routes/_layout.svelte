<script context="module">
	export async function preload(page, session) {
		const getCurrency = this.fetch(`/get-static/get-currency`, {
		    method: 'GET',
		    credentials: 'include',
		    headers: {
		        'Content-Type': 'application/json',
		    },
		}).then(res => res.json())

		const getCryptocurrency = this.fetch(`/get-static/get-cryptocurrency`, {
		    method: 'GET',
		    credentials: 'include',
		    headers: {
		        'Content-Type': 'application/json',
		    },
		}).then(res => res.json())

		const getMinAndMaxCrypto = this.fetch(`/get-static/get-minAndMax`, {
		    method: 'GET',
		    credentials: 'include',
		    headers: {
		        'Content-Type': 'application/json',
		    },
		}).then(res => res.json())

		const getPayment = this.fetch(`/get-static/get-payment`, {
		    method: 'GET',
		    credentials: 'include',
		    headers: {
		        'Content-Type': 'application/json',
		    },
		}).then(res => res.json())

		const getLang = this.fetch(`/get-static/get-language`, {
		    method: 'GET',
		    credentials: 'include',
		    headers: {
		        'Content-Type': 'application/json',
		    },
		}).then(res => res.json())

		const language = await import(`../language/${session.lang}.js`).then(res => res.lang)

		const allDate = await Promise.all([
	        getCurrency,
			getCryptocurrency,
			getMinAndMaxCrypto,
			getPayment,
			getLang,
			language
	    ]);

		return {
			Currency: allDate[0].data,
			Cryptocurrency: allDate[1].data,
			getMinAndMaxCrypto: allDate[2].data,
			getPayment: allDate[3].data,
			getLang: allDate[4].data,
			langObj: allDate[5]
		}
	}
</script>

<script>
import { currency, cryptocurrency, minAndMax, payment, language } from '../store/store.js';
import {beforeUpdate} from "svelte"
export let Currency;
export let Cryptocurrency;
export let getMinAndMaxCrypto;
export let getPayment;
export let getLang;
export let langObj;

currency.update(() => Currency)
cryptocurrency.update(() => Cryptocurrency)
minAndMax.update(() => getMinAndMaxCrypto)
payment.update(() => getPayment)
language.update(() => langObj)

import Header from "../components/Header.svelte";
import Footer from "../components/Footer.svelte";
import Navigation from "../components/navigation.svelte";

let openNav = false;

function showNav(bool) {
	openNav = bool;
}

</script>
<Header langList={getLang} {showNav}/>
<main>
	<slot />
	<Navigation {openNav} {showNav}/>
</main>

<Footer />
<style>

</style>
