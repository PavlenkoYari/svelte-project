<svelte:body on:mousedown={e => {
    const $this = e.target;
    if(!$this.classList.contains('payment-method-btn-list') && !$this.closest('.payment-method-btn-list') && !$this.classList.contains('payment-method-btn') && !$this.closest('.payment-method-btn')){
        openList = false;
    }
}} />

<script>
import { currName, amount, currIco, payment } from '../../store/store.js';
import FormGroup from '../../components/FormGroup.svelte';
import { validRegisterForm } from "../../helper/validation"
import { stores, goto } from '@sapper/app';
import {post} from "../../helper/fetch";
const { session } = stores();


let paymentMethods = $payment.filter( p => p.currencyList.includes($currName))
let paymentMethodsCount = 0;
let checkPolicy = false;
let errorPolicy= false;
let openList = false;
let errorObj = {
    emailError: '',
    completeValid: false
};
let email = !$session.user ?  "" : $session.user.email;
let prettyPrice = `${$currIco}${$amount} ${$currName}`


const getCoupon = async () => {
    errorPolicy = !checkPolicy;

    if(!$session.user && checkPolicy){
        errorObj = validRegisterForm(false, email);
        if(errorObj.completeValid){
            const response = await post('../auth/registration', {
                email
            });
            if (response.success) {
                $session.user = response.user;
            } else {
                if(response.message){
                    errorObj = {
                        emailError: response.message,
                        completeValid: false
                    };
                }
                else {
                    errorObj = response.errorObj;
                }
            }
        }
    }
    else{
        errorObj.completeValid = true
    }

    if(errorObj.completeValid && checkPolicy){
        const newCoupon = await post('checkout/create-coupon', {
            price: $amount,
            prettyPrice,
            paymentMethod: paymentMethods[paymentMethodsCount].name,
            email,
            currName: $currName,
        });
        if(newCoupon.success){
            goto(`/checkout/order-received/${newCoupon.couponID}`)
        }

    }
}
</script>


<div class="label">
    Payment method
</div>
<div class="forListPayment" style="position: relative">
    <button class:open={openList} class="payment-method-btn pointer df" on:click={() => openList = !openList}>
        <div class="icon">
            <img src={paymentMethods[paymentMethodsCount].icon} alt="bank">
        </div>
        <div class="val">{paymentMethods[paymentMethodsCount].name}</div>
        {#if paymentMethods.length > 1}
        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4L0.401923 0.250001L5.59808 0.250001L3 4Z" fill="#ABB3C6"/>
        </svg>
        {/if}
    </button>
    {#if paymentMethods.length > 1}
        <div class:open={openList} class="payment-method-btn-list">
            <div class="overflow">
            {#each paymentMethods as pm, i}
            <button class:selected={i == paymentMethodsCount} class="payment-method pointer df" on:click={() => {paymentMethodsCount = i; openList = false}}>
                <div class="icon">
                    <img src={pm.icon} alt="bank">
                </div>
                {pm.name}
            </button>
            {/each}
            </div>
        </div>
    {/if}
</div>
{#if !$session.user}
<FormGroup label='Create your account'
inputName="Email"
type='text'
foo={event => email = event.target.value}
placeholder="Enter your email"
requiredCheck={true}
errMsg={errorObj.emailError}
lengthVal={[6, 30]}
regCheck={/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/}
styleCSS="margin-bottom: 20px"
/>
{/if}
<div class:has-error={errorPolicy} class="terms-check-wrapper">
    <button class:selected={checkPolicy} class="terms-check pointer df" on:click={() => checkPolicy = !checkPolicy}>
        <div class="square-wrapper df">
            <div class="square"></div>
        </div>
        <div>
            I`ve read and accept the <a href="/chooseLink" target="_blank" class="link"> Privacy Policy </a> and <a href="/chooseLink" target="_blank" class="link"> Terms of Service </a>
        </div>
    </button>
    <div class="error">You have to agree to our privacy policy in order to proceed.</div>
</div>
<button class="check-btn pointer next greenBkgBtn df" on:click={getCoupon}>
    Next step
    <img src="/image/checkout/arrow.svg" alt="arrow">
</button>


<style lang="scss">
.label{
  margin-top: 15px;
  margin-bottom: 5px;
}
.terms-check-wrapper{
  .error{
    display: none;
  }
  &.has-error{
    .terms-check{
      color: #953C53;
      .square-wrapper{
        border: 1px solid #953C53;
        .square{
          background: #953C53;
        }
      }
    }
    .error{
      display: block;
      font-size: 12px;
      font-family: open_sansregular;
      color: #953C53;
      margin-top: 5px;
    }
  }
}
.terms-check{
  margin-top: 20px;
  align-items: flex-start;
  font-size: 12px;
  color: #ABB3C6;
  flex-wrap: nowrap;
  text-align: left;
  font-family: open_sansregular;
  &.selected{
    .square-wrapper{
      .square{
        display: block;
      }
    }
  }
  .link{
    color: #7E9ADE
  }
}
.check-btn{
  margin-top: 40px;
  width: 200px;
  padding: 8px;
  align-items: center;
  justify-content: center;
  img{
    display: block;
    margin-left: 7px;
    width: 8px;
    height: 8px;
  }
}
.payment-method{
  width: 220px;
  padding: 15px 20px;
  line-height: 1;
  align-items: center;
  font-size: 14px;
  color: #ABB3C6;
  border: 1px solid #27292F;
  border-radius: 3px;
  &.selected{
    color: white;
  }
  &:hover{
    color: white;
  }
  margin-bottom: 20px;
  .icon{
    width: 22px;
    margin-right: 10px;
    img{
      width: 100%;
    }
  }
  &:last-child{
    margin-bottom: 0;
  }
}
.payment-method-btn{
  width: 100%;
  padding: 15px 20px;
  line-height: 1;
  align-items: center;
  font-size: 14px;
  color: #ABB3C6;
  border: 1px solid #27292F;
  border-radius: 3px;
  position: relative;
  svg{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    width: 6px;
    transition: all .3s;
  }
  &.open{
    svg {
      transform: translateY(-50%) rotate(180deg);
      path{
        fill: #FFFFFF;
      }
    }
  }
  &:hover{
    svg path{
      fill: #FFFFFF;
    }
  }
  margin-bottom: 20px;
  .icon{
    width: 22px;
    margin-right: 10px;
    img{
      width: 100%;
    }
  }
}
.payment-method-btn-list{
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  background: #27292F;
  border-radius: 3px;
  transform: translateY(100%);
  z-index: 2;
  padding: 5px 10px;
  display: none;

  .overflow{
    overflow: auto;
    max-height: 170px;
    padding-right: 5px;
    &::-webkit-scrollbar {
      width: 16px;
    }
    &::-webkit-scrollbar-track {
      background: linear-gradient(0deg, #202228, #202228), linear-gradient(0deg, #202228, #202228), #202228;
    }
    &::-webkit-scrollbar-thumb {
      background: linear-gradient(0deg, #2E3139, #2E3139), linear-gradient(0deg, #202228, #202228), #202228;
    }
  }

  &.open{
    display: block;
  }
  .payment-method{
    width: 100%;
    border-bottom: 1px solid #2E3139;
    padding: 10px 0;
    margin: 0;
    margin-right: 5px;
    &:last-child{
      bottom: 0;
    }
  }
}
</style>
