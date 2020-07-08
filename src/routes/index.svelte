<svelte:window on:resize={(e) => {
	windowWidth = e.target.innerWidth;
}}/>

<script context="module">
	export async function preload(page, session) {
		const { user } = session;

		return { user };
	}
</script>

<script>
import { amount, currName, currIco, currCrypto, language } from '../store/store.js';
import { onMount } from "svelte"
import CryptoChoose from "../components/home/cryptoChoose.svelte"
import SetPrice from "../components/home/setPrice.svelte"
import Faq from "../components/home/Faq.svelte"
import Contact from "../components/home/Contact.svelte"
import lottie from "../action/lottie";


export let user;
let notValidInput = false;
let disabledNextStep = false;
let windowWidth;

$: linkForAnimStep = windowWidth > 700 ? "/animations/step.json" : "/animations/stepAdaptive.json";
onMount(() => {
	windowWidth = window.innerWidth
})
</script>

<div class=" home-page">
    <section class="section1 mw">
        <h1 class="title1">{$language['Buy, Sell and Pay with Crypto']}</h1>
        <div class="title2">
            {$language['CoinCoupon makes it possible to receive cryptocurrency in your wallet quickly and simply']}
        </div>
        <a href="/#buy-now" class="buy-now greenBkgBtn">Buy Now</a>
		<div id="anim-arrow" use:lottie={[true, "/animations/arrow.json"]}></div>
    </section>
    <section class="section3 mw">
        <div class="title1">
            How it works
        </div>
        <div class="title2">
            Пройдите эти 3 простых и вы получите купон, который сможете поменять на криптовалюту</div>
        <div style="position: relative">
		{#if windowWidth}
			<div id="step-anim" use:lottie={[false, linkForAnimStep]}></div>
			<div class="text-step-anim">
	            <div class="one">Enter Coupon Amount</div>
	            <div class="two">Select Payment Method</div>
	            <div class="three">Pay and Get Coupon</div>
	        </div>
		{/if}
    </div>
    </section>
    <section class="section2">
        <div class="mw" id="buy-now">
            <div class="title1">
                Get Coupon online
            </div>
            <div class="title2">
                Select your preferred currency and enter the coupon amount below and get it in 2 easy steps
            </div>
            <div class="voucher-wrapper">
                <div class="mw700 withPayment">
                    <div class:has-error={notValidInput} class="voucher-block-s df">
                        <CryptoChoose />
                        <SetPrice setError={(booleIdenty) => notValidInput = booleIdenty} setDisabledNextStep={(booleIdenty) => disabledNextStep = booleIdenty}/>
                        <a href={`/checkout?value=${$amount}&currency=${$currName}&crypto=${$currCrypto}`}
                        class:disabled={disabledNextStep}
                        class="pointer checkout-btn greenBkgBtn"
                        on:click={e => {if(disabledNextStep){e.preventDefault()}}}>
                            Checkout
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <section class="section4 mw df" id="contact-us">
        <div id="anim-contact" class="icon" use:lottie={[true, "/animations/contactUs.json"]}>
        </div>
        <Contact email={user && user.email}/>
    </section>
    <section class="section5" id="faq">
        <div class="mw">
            <div class="title1">FAQ</div>
            <div class="title2">Description Description Description Description Description Description Description Description Description Description</div>
            <Faq />
        </div>
    </section>

</div>


<style lang="scss">
// header{
//   background: 0 0;
// }
.home-page{
	margin: -30px 0;
}
.section1{
  min-height: calc(100vh - 100px);
  position: relative;
  padding-top: 100px;
  .title1{
    max-width: 594px;
    font-family: open_sansbold;
    font-size: 64px;
    color: #FFFFFF;
   line-height: 1;
    padding-top: 50px;
    margin-bottom: 10px;
  }
  .title2{
    font-size: 14px;
    color: #818796;
    margin-bottom: 70px;
    max-width: 430px;
  }
  .title3{
    font-size: 30px;
    color: #FFFFFF;
    margin-bottom: 40px;
    font-family: open_sansbold;
  }
  .buy-now{
    display: block;
    width: 210px;
    text-align: center;
    padding: 10px;
    font-weight: 600;
  }
  #anim-arrow{
    position: absolute;
    bottom: 100px;
    left: 50%;
    width: 60px;
    height: 60px;
    transform: translateX(-50%);
  }
}

.section2{
    padding: 30vw 0;
     background: url(../image/home/section2.svg) center no-repeat;
     background-size: 100% auto;
     .title1{
       font-family: open_sansbold;
       font-size: 24px;
       color: #FFFFFF;
       text-align: center;
       margin-bottom: 20px;
       margin-top: 320px;

     }
     .title2{
       font-size: 14px;
       color: #818796;
       text-align: center;
       max-width: 520px;
       margin: auto;
       margin-bottom: 60px;
     }
 	 .voucher-wrapper{

	    background: #1E1F24;
	    border-radius: 10px;
	    padding: 30px 0;
	    .withPayment{
	      max-width: none;
	      padding: 0 60px;
	      .voucher-block-s :global(.input-block){
	        flex: 38% 0 1;
	      }
	    }

	    .voucher-block-s{
	      justify-content: space-between;
	      margin-top: 30px;
	      margin-bottom: 27px;
	      &.has-error{
	        margin-bottom: 45px;
	        & :global(.btc-val){
	          bottom: -28px;
	        }
	        & :global(.input-block:not(.crypt)){
	          background: #2B1D20;
	          border: 1px solid #953C53;
	          & :global(.error){
	            display: block;
	            font-size: 12px;
	            font-family: open_sansregular;
	            color: #953C53;
	            margin-top: 5px;
	          }
	        }
	      }
	      .checkout-btn{
	        background: #6FB12F;
	        border-radius: 5px;
	        padding: 15px 10px;
	        font-size: 14px;
	        width: 215px;
	        min-width: 215px;
	        font-family: open_sansbold;
	        color: #FFFFFF;
	        text-align: center;
	      }
	    }
  }
}

.section3{
  margin-bottom: -25vw;
  .title1{
    font-family: open_sansbold;
    font-size: 24px;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 20px;
  }
  .title2{
    font-size: 14px;
    color: #818796;
    text-align: center;
    max-width: 520px;
    margin: auto;
    margin-bottom: 60px;
  }
  .text-step-anim{
    .one{
      position: absolute;
      left: 17%;
      text-align: center;

      max-width: 100px;
    }
    .two{
      text-align: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      max-width: 110px;
    }
    .three{
      text-align: center;
      position: absolute;
      right: 16%;
      max-width: 100px;
    }
  }
}

.section4{
  justify-content: space-between;
  margin-top: -5vw;
  .icon{
    width: 35%;
  }

}

.section5{
  margin-top: 200px;
  background: url(../image/home/faq.svg) center bottom no-repeat;
  background-size: 100% auto;
  padding: 14.7vw 0;
  .title1{
    font-family: open_sansbold;
    font-size: 24px;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 20px;
  }
  .title2{
    font-size: 14px;
    color: #818796;
    text-align: center;
    max-width: 520px;
    margin: auto;
    margin-bottom: 60px;
  }

}


@media (max-width: 1100px) {
  .section2 .voucher-wrapper .voucher-block-s{
    flex-direction: column;
    &.has-error :global(.input-block:not(.crypt)) :global(.error){
      position: absolute;
      bottom: -2px;
      transform: translateY(100%);
      left: 0;
    }
    & :global(.input-block){
      padding: 15px;
      margin-bottom: 70px;
    }
  }
}
@media (max-width: 1300px) {
  .section2{
    padding: 10vw 0;
    background-size: cover;
  }
}
@media (max-width: 992px) {
  .section1 #anim-arrow{
    position: relative;
    bottom: initial;
    left: initial;
    transform: initial;
    margin-top: 50px;
    margin-left: 8%;
  }
  .section1 {
    padding-top: 30px;
    .title1{
      max-width: 100%;
      font-size: 8vw;
    }
    .title3{
      font-size: 5vw
    }
  }
  .section5{
    margin-top: 50px;
    padding: 30px 0;
    background: #23252D;
  }
}
@media (max-width: 700px) {
  .section2{
    padding: 1vw 0;
    padding-bottom: 170px;
  }
  .section3 {
    margin-bottom: -35vw;
    margin-top: 70px;
    #step-anim{
      width: 121px;
      height: 427.5px;
      margin-left: 30px;
    }
    .text-step-anim{
      .one{
        top: 40px;
        left: 170px;
        text-align: left;
      }
      .two{
        left: 170px;
        top: 50%;
        transform: translate(0, -50%);
        text-align: left;
      }
      .three{
        left: 170px;
        bottom: 40px;
        text-align: left;
      }
    }
  }
  .section4 {
    .icon{
      display: none;
    }
  }

}
@media (max-width: 550px) {
  .section1 {
    padding-top: 30px;
    #anim-arrow{
      bottom: 20px;
    }
    .title1{
      max-width: 100%;
      font-size: 36px;
    }
    .title3{
      font-size: 16px;
      margin-bottom: 20px;
    }
    .title2 {
      font-size: 12px;
      margin-bottom: 40px;
    }
  }
  .section4 :global(.contact-us .form-contact .form-group){
    flex: 100% 0 1;
  }
  .section2 {
    .title1{
      margin-top: 50vw;
    }
    .voucher-wrapper{
      padding: 20px 0;
      padding-bottom: 10px;
      & :global(.withPayment){
        padding: 0 20px;
      }
      .voucher-block-s :global(.checkout-btn){
        width: 100%;
      }
    }
  }

}
</style>
