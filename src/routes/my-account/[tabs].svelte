<script context="module">
	export async function preload(page, session) {
		const { user } = session;

		if (!user) {
			return this.redirect(301, '/auth');
		}


		const { tabs } = page.params;
		if(tabs !== 'my-vouchers' && tabs !== 'my-redeems'){
			return this.error(404, 'Not found')
		}

		return { isVoucher: tabs == "my-vouchers" }
	}
</script>

<script>
export let isVoucher;
import MyAccount from "./_myAccount.svelte"
import MyVouchers from "./voucher/_Vouchers.svelte"
</script>

<MyAccount {isVoucher}>
    <MyVouchers {isVoucher}/>
</MyAccount>
