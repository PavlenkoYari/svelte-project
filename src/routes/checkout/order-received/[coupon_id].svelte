<script context="module">
	export async function preload(page, session) {
		const { coupon_id } = page.params;

		const res = await this.fetch(`/checkout/order-received/get-coupon?couponID=${coupon_id}`);
        if(res.status == 200){
            const coupon = await res.json();

    		return { coupon };
        }

        this.error(404, 'Not found');
	}
</script>
<script>

import {currName,amount} from '../../../store/store.js';
import CheckoutPage from "../_checkoutWrapp.svelte"
import CheckOutStepThee from './_checkoutStepThree.svelte'

export let coupon;

amount.update( () => coupon.currentCoupon.price)
currName.update( () => coupon.currentCoupon.currencyName)

</script>


<CheckoutPage >
    <CheckOutStepThee {coupon}/>
</CheckoutPage>
