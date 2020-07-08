<script>
import { onMount } from "svelte";
import { post } from "../../helper/fetch";
import FormGroup from "../../components/FormGroup.svelte";
import Voucher from "../../components/myAccount/voucher.svelte"

export let getStepTwo;
export let setCoupon;
export let coupon;

let couponCode  = coupon.length && coupon[0].code ? coupon[0].code : "";
let errorObj = {
    codeCouponError: ""
}

async function getCoupon(newVal) {
    const NEW_VAL = newVal.trim();
    const COUPON_CODE = couponCode.trim();
    if(NEW_VAL != COUPON_CODE){
        couponCode = NEW_VAL;
        if(couponCode.length > 0){
            if(couponCode.length != 24){
                errorObj.codeCouponError = "Invalid Coupon code.";
                setCoupon([])
            }
            else {
                const response = await post('/redeem/get-coupon', {
                    code: couponCode
                })
                if(response.success){
                    errorObj.codeCouponError = "";
                    setCoupon([response.coupon])

                }
                else {
                    errorObj.codeCouponError = "Invalid Coupon code.";
                    setCoupon([])
                }
            }
        }
    }
}
</script>

<div class="right step-redeem-one df">
    <FormGroup
    label='Crypto Coupon code'
    inputName="Coupon code"
    value={couponCode}
    type='text'
    foo={event => couponCode = event.target.value}
    keyUpFoo={event => {getCoupon(event.target.value)}}
    placeholder="0000  0000  0000  0000  0000  0000"
    requiredCheck={true}
    style="margin-bottom: 0"
    errMsg={errorObj.codeCouponError}
    />

    {#each coupon as c (c._id)}
        <Voucher voucher={c} id={c._id}/>
    {/each}

    <div class="next-step greenBkgBtn df" on:click={getStepTwo}>
        Next step
        <img src="/image/checkout/arrow.svg" alt="arrow">
    </div>
</div>

<style lang="scss">

.next-step{
  width: 200px;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-top: 25px;
  img{
    width: 8px;
    display: block;
    margin-left: 10px;
  }
}
@media (max-width: 670px) {
    .next-step{
      margin: auto;
      margin-top: 50px;
    }
}


</style>
