<script>
import USTransfer from '../../../components/payments/uk.svelte'
import SEPATransfer from '../../../components/payments/sepa.svelte'

export let coupon;
</script>

{#if coupon.currentCoupon.paymentMethod == 'SEPA Bank Transfer'}
<SEPATransfer order={coupon.currentCoupon.order}/>
{:else}
<USTransfer order={coupon.currentCoupon.order}/>
{/if}
<a href={`/action/paid/${coupon.currentCoupon._id}`} class="check-btn pointer greenBkgBtn df">
   I paid
</a>

<style lang="scss">
.check-btn{
  margin-top: 40px;
  width: 200px;
  padding: 8px;
  align-items: center;
  justify-content: center;
}
</style>
