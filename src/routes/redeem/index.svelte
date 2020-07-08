<svelte:body on:mousedown={e => {
    const $this = e.target;
    if(!$this.classList.contains('crypto-btn-list') && !$this.closest('.crypto-btn-list') && !$this.classList.contains('crypto-choose-list-wrapper') && !$this.closest('.crypto-choose-list-wrapper')){
        openChooseCrypto = false;
    }
}} />

<script context="module">
    export async function preload(page) {
        const getCoupon = this.fetch(`/redeem/get-coupon`, {
		    method: 'POST',
		    credentials: 'include',
		    headers: {
		        'Content-Type': 'application/json',
		    },
            body: JSON.stringify({ref: page.query.id}),
		}).then(res => res.json())

        const res = await getCoupon;

        return { coupon:  res.coupon ? [res.coupon] : []};
    }
</script>

<script>
import { countCrupto, minAndMax, cryptocurrency } from "../../store/store";
import { onMount } from "svelte";
import { getCryptoValue } from "../../helper/getCryptoValue";
import RedeemStepOne from "./_stepOne.svelte";


export let coupon;

let RedeemStepTwo;
let ActionSuccess;
let cryptoCount = 0;
let openChooseCrypto = false;
let wallet;
let redeemDate;
let userResponse;
let prettyPrice;

$: currentCrypto = $cryptocurrency[cryptoCount].shortName;
$: commission = $cryptocurrency[cryptoCount].commission;
$: cryptoFullName = $cryptocurrency[cryptoCount].cryptoName;

function getCryptoVal(newCoupon){
    if(coupon.length){
        getCryptoValue(countCrupto, newCoupon[0].currencyName, $cryptocurrency[cryptoCount].shortName, newCoupon[0].price, $minAndMax[0], $minAndMax[1])
    }
}

async function getStepTwo(){
    if(coupon.length){
        import('./_stepTwo.svelte').then(res => RedeemStepTwo = res.default)
    }
}
async function getActionSuccess(walletVal, redeemDateVal, prettyPriceVal){
    wallet = walletVal;
    redeemDate = redeemDateVal;
    prettyPrice = prettyPriceVal;

    import('../action/success/index.svelte').then(res => ActionSuccess = res.default)
}

function setCoupon(newCoupon) {
    coupon = newCoupon;
    getCryptoVal(newCoupon)
}





onMount( () => {
    getCryptoVal(coupon)
})
</script>


{#if !ActionSuccess}
    <div class="mw redeem-page">
        <h1 class="title1">Redeem</h1>
        <div class="step-wrapper df">
            <button class="step step1 active">
                01
                <span class="text">Enter Coupon Code</span>
            </button>
            <button class="step step2">
                02
                <span class="text">Enter wallet address </span>
            </button>
        </div>
        <div class="redeem-wrapper df">
            <div class="left">
                <div class="title2">Cryptocurrency</div>
                <div class:open={openChooseCrypto} class="crypto-btn-list-wrapper" style="position: relative">
                    <div class="crypto-btn-list df pointer" on:click={() => openChooseCrypto = !openChooseCrypto}>
                        <div class="ico">
                            <img src={$cryptocurrency[cryptoCount].linkIco} alt={$cryptocurrency[cryptoCount].cryptoName}>
                        </div>
                        {$cryptocurrency[cryptoCount].shortName}
                        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 4L0.401924 0.25L5.59808 0.25L3 4Z" fill="#ABB3C6"></path>
                        </svg>
                    </div>
                    <div class="crypto-choose-list-wrapper">
                        {#each $cryptocurrency as c, i}
                            <div class="crypto-choose-list df pointer"
                            on:click={() => {cryptoCount = i; openChooseCrypto = false;  getCryptoVal(coupon)}}>
                                <div class="ico">
                                    <img src={c.linkIco} alt={c.cryptoName}>
                                </div>
                                {c.shortName}
                            </div>
                        {/each}
                    </div>
                </div>
                <div class="crypto-block-wrapper">
                    <div class="icon">
                        <img src={$cryptocurrency[cryptoCount].linkIco} alt={$cryptocurrency[cryptoCount].cryptoName}>
                    </div>
                    {$cryptocurrency[cryptoCount].cryptoName}
                </div>
            </div>
            {#if !RedeemStepTwo}
                <RedeemStepOne {getStepTwo} {coupon} {setCoupon}/>
            {:else}
                <RedeemStepTwo {currentCrypto} {commission} {getActionSuccess} {cryptoFullName} {coupon} {getCryptoVal}/>
            {/if}
        </div>
    </div>
{:else}
    <ActionSuccess {prettyPrice} cryptoCount={$countCrupto} cryptoInfo={$cryptocurrency[cryptoCount]} {wallet} {redeemDate}/>
{/if}





<style lang="scss">

.redeem-page{
  max-width: 680px;
  margin: auto;
  .title1{
    font-size: 24px;
    color: #FFFFFF;
    font-family: open_sansbold;
  }
  .step-wrapper{
    border-bottom: 1px solid #27292F;
    margin-top: 50px;
    padding: 0 25px;
    margin-bottom: 70px;
    .step{
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #20222D;
      border-radius: 100%;
      border: 4px solid #2A2D39;
      font-size: 12px;
      color: #BEBEBE;
      position: relative;
      margin-right: 140px;
      margin-left: 20px;
      transform: translateY(-21px);
      .text{
        position: absolute;
        bottom: -70px;
        min-width: 100px;
        text-align: center;
        color: #606674;
        left: 50%;
        transform: translateX(-50%);
      }
      &.active{
        background: #52871F;
        color: white;
        border: 4px solid #6FB12F;
        .text{
          color: white;
        }
        &:after{
          background: #6FB12F;
        }
        &:before{
          border-top: 11px solid #6FB12F;
        }
      }
      &:last-child{
        margin: 0;
      }
      &:after{
        content: '';
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translate(-50%, 100%);
        width: 10px;
        height: 10px;
        background: #2A2D39;
        border-radius: 100%;
      }
      &:before{
        content: "";
        position: absolute;
        border: 7px solid transparent;
        border-top: 11px solid #2A2D39;
        bottom: -1px;
        left: 50%;
        transform: translate(-50%, 100%);
      }
    }
  }
  .redeem-wrapper{
    align-items: flex-start;
    .left{
      background: #1E1F24;
      border-radius: 3px;
      width: 250px;
      margin-right: 20px;
      padding: 20px 25px;
      .title2{
        font-family: open_sansbold;
        font-size: 16px;
        color: #FFFFFF;
        margin-bottom: 15px;
      }
      .crypto-btn-list-wrapper.open{
          .crypto-btn-list{
              svg{
                  transform: translateY(-50%) rotate(180deg);
              }
          }
          .crypto-choose-list-wrapper{
              display: block;
          }
      }
      .crypto-btn-list{
          align-items: center;
          padding: 15px 10px;
          background: #27292F;
          border: 1px solid #2E3139;
          border-radius: 3px;
          position: relative;
          .ico{
              height: 20px;
              width: 30px;
              margin-right: 10px;
              img{
                  height: 100%;
                  width: auto;
                  display: block;
                  margin: auto;
              }
          }
          svg{
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              transition:  all .3s;
          }
      }
      .crypto-choose-list-wrapper{
          display: none;
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          transform: translateY(100%);
          padding: 15px 10px;
          background: #27292F;
          border: 1px solid #2E3139;
          max-height: 135px;
          overflow-y: auto;
          .crypto-choose-list{
              margin-bottom: 10px;
              &:hover{
                  color: white;
              }
              &:last-child{
                  margin-bottom: 0;
              }
              .ico{
                  height: 20px;
                  width: 30px;
                  margin-right: 10px;
                  img{
                      height: 100%;
                      width: auto;
                      display: block;
                      margin: auto;
                  }
              }
              svg{
                  position: absolute;
                  top: 50%;
                  right: 10px;
                  transform: translateY(-50%);
                  transition:  all .3s;
              }
          }

      }
      .crypto-block-wrapper{
        padding: 20px;
        background: url(/image/redeem/card-bkg.png) center no-repeat;
        background-size: cover;
        margin-top: 8px;
        border-radius: 3px;
        font-size: 14px;
        font-family: open_sansbold;
        color: #ABB3C6;
        text-align: center;

        .icon{
          width: 60px;
          height: 60px;
          margin: auto;
          margin-bottom: 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    & :global(.right){
      background: #1E1F24;
      border-radius: 3px;
      width: calc(100% - 270px);
      padding: 20px 25px;
      flex-direction: column;
      justify-content: space-between;
      & :global(.voucher-block){
        text-align: center;
        justify-content: center;
        background: url(/image/redeem/voucherBkg.png) center no-repeat;
        background-size: cover;
        padding: 35px 45px;
        & :global(.help-block) {
          margin: 0;
          margin-top: 20px;
          & :global(.details-btn){
            display: none;
          }
        }
        & :global(.btn){
          display: none;
        }
      }
    }
  }
}

@media (max-width: 820px) {
  .redeem-page .redeem-wrapper & :global(.right .voucher-block){
    width: auto;
    height: auto;
    padding: 20px 45px;
    flex-direction: row;
    margin: 20px -20px 0;
  }
}
@media (max-width: 670px) {
  .redeem-page {
    .step-wrapper{
      margin-bottom: 80px;
    }
    .redeem-wrapper{
      flex-direction: column;
      align-items: center;
      .left{
        margin-right: 0;
        margin-bottom: 20px;
        padding: 15px;
        width: 100%;
        .crypto-btn-list-wrapper{
            max-width: 200px;
            margin: auto;
            margin-bottom: 5px;
        }
        .title2{
          max-width: 200px;
          margin: auto;
          margin-bottom: 15px;
        }
        .crypto-block-wrapper{
          display: flex;
          align-items: center;
          padding: 15px;
          background-size: cover;
          max-width: 200px;
          margin: auto;
          margin-bottom: 15px;
          .icon{
            width: 40px;
            height: 40px;
            min-width: 40px;
            margin: 0;
            margin-right: 15px;
          }
        }
      }
      & :global(.right){
        width: 100%;
        padding: 20px 10px;
        & :global(.form-group){
          max-width: 370px;
          margin: auto;
        }
        & :global(.next-step){
          margin: auto;
          margin-top: 50px;
        }
        & :global(.voucher-block){
          width: 280px;
          height: 250px;
          margin: auto;
          margin-top: 20px;
          padding: 40px;
          justify-content: flex-start;
          background: url(/image/redeem/voucherBkgMob.png) center no-repeat;
          background-size: cover;
          & :global(.left-v){
            align-items: flex-start;
            text-align: left;
          }
        }
      }
    }
    & :global(.dontHave){
      max-width: 370px;
      margin: auto;
      margin-bottom: 65px;
      margin-top: 10px;
    }
    & :global(.youWillGet .title3 .opt){
      font-size: 18px;
    }
  }
}
</style>
