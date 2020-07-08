<script>
import { amount, currName, countCrupto, currCrypto } from '../../store/store.js';
import { onMount } from 'svelte';

const setValueBTC = () => {
    if (!isNaN(+$amount)) {
        fetch(`https://blockchain.info/tobtc?currency=${$currName}&value=${$amount}`)
            .then(res => res.json())
            .then(result => {
                countCrupto.update(() => result)
            })
    }
}

onMount(() => {
    setValueBTC()
})
</script>

<div class="mw700 checkout_page">
    <h1 class="title1">Checkout</h1>
    <div class="step-wrapper df">
        <button class="step step1 active">
            01
            <span class="text">Select Payment Method</span>
        </button>
        <button class="step step2">
            02
             <span class="text">Pay and Get Coupon</span>
        </button>
    </div>
    <div class="chekcout-content-wrapper df">
        <div class="chekcout-content df">
            <div class="card df">
                <div>
                    <div class="title2">
                        Voucher value:
                    </div>
                    <div class="price">{$amount} {$currName}</div>
                    <div class="btc-val">
                        <span class="opt">≈</span> {$countCrupto}{$currCrypto}
                    </div>
                </div>
                <div class="total">
                    Total: <span class="opt">{$amount} {$currName}</span>
                </div>
            </div>
            <div class="right">
                <slot></slot>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
.checkout_page{
  .title1{
    font-size: 24px;
    font-family: open_sansbold;
    color: #FFFFFF;
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
      margin-right: 70px;
      transform: translateY(-21px);
      .text{
        position: absolute;
        bottom: -70px;
        min-width: 100px;
        text-align: center;
        color: #606674;
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
        margin-right: 0;
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
  .chekcout-content-wrapper{
    margin-top: 50px;
    flex-wrap: nowrap;
    overflow: hidden;
    align-items: flex-start;
    .chekcout-content{
      min-width: 100%;
      .card{
        background: #676767;
        width: 245px;
        height: 250px;
        margin-right: 20px;
        font-family: open_sansbold;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
        background: url(../image/checkout/cardBkg.png) center no-repeat;
        background-size: 100% 100%;
        .title2{
          color: #FFFFFF;
          margin-bottom: 20px;
        }
        .price{
          color: #ABB3C6;
          font-family: open_sansregular;
          margin-bottom: 5px;
        }
        .btc-val{
          font-size: 24px;
          color: #6FB12F;
          .opt{
            color: #818796;
          }
        }
        .total{
          font-size: 14px;
          color: #818796;
          .opt{
            font-size: 24px;
            color: #FFFFFF;
          }
        }
      }
      .right{
        flex: calc(100% - 265px) 0 1;
        padding: 20px 25px;
        background: #1E1F24;
        border-radius: 3px;
      }
    }
  }
}
</style>
