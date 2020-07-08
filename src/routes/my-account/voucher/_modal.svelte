<script>
import Voucher from "../../../components/myAccount/voucher.svelte"
import USTransfer from '../../../components/payments/uk.svelte'
import SEPATransfer from '../../../components/payments/sepa.svelte'

export let modalObj;
export let closeModal;
</script>

<div class="modal-wrapper open">
    <div class:full={modalObj.status == "pending"} class="modal">
        <button class="close pointer" on:click={closeModal}>
            <img src="/image/myAcc/close.svg" alt="close">
        </button>

            <div id="modal_result">
                <div class="mw500 voucher_info">
                    <Voucher
                    voucher={modalObj}
                    />
                    <div class="order-block">
                        Order № <span class="opt">{modalObj.order}</span>
                    </div>
                </div>
                {#if modalObj.status == "pending"}
                        <div class="wrapper-for-template">
                            {#if modalObj.paymentMethod == 'SEPA Bank Transfer'}
                            <SEPATransfer order={modalObj.order}/>
                            {:else}
                            <USTransfer order={modalObj.order}/>
                            {/if}
                        </div>
                {:else if modalObj.status == "paid"}
                    <div class="form-group">
                        <div class="label">Crypto Voucher code</div>
                        <input type="text" value={modalObj.code}>
                        <button class="copy-btn pointer">
                            Copy
                            <div class="help-block">
                                Copied
                            </div>
                        </button>
                    </div>
                {:else}
                    <div class="form-group">
                        <div class="label">{modalObj.cryptoInfo.cryptoFullName} wallet address</div>
                        <input type="text" value={modalObj.cryptoInfo.wallet}>
                        <button class="copy-btn pointer">
                            Copy
                            <div class="help-block">
                                Copied
                            </div>
                        </button>
                    </div>
                {/if}
            </div>
    </div>
</div>



<style lang="scss">
.modal-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(24, 25, 29, 0.7);
    overflow-y: auto;
    padding: 20px;
    display: none;
    &.open{
      display: flex;
    }
    .modal{
      padding: 30px;
      background: #26272F;
      border-radius: 3px;
      width: 570px;
      margin: auto;
      position: relative;
      &.full{
          width: 830px;

      }
      .close{
        position: absolute;
        width: 15px;
        height: 15px;
        top: -16px;
        right: -16px;
      }
      .mw500{
        max-width: 500px;
        margin: auto;
      }
      & :global(.voucher-block){
        flex-direction: column;
        align-items: center;
        text-align: center;
        margin-bottom: 30px;
        & :global(.help-block) {
          margin: 0;
          margin-top: 15px;
          & :global(.details-btn){
            display: none;
          }
        }
        & :global(.right-v){
          & :global(.btn){
            display: none;
          }
        }
      }
      .order-block{
        color: #606674;
        font-family: open_sansbold;
        margin-bottom: 30px;
        .opt{
          color: #BCC3D1;
        }
      }
      .wrapper-for-template{
        & :global(.title3){
          font-size: 16px;
          font-family: open_sansbold;
          color: #FFFFFF;
          margin-bottom: 30px;
        }
        & :global(.tabs){
          & :global(.tab){
            font-size: 12px;
            font-family: open_sansbold;
            color: #FFFFFF;
          }
        }
        & :global(.tab-content){
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          & :global(.form-group){
            flex: 48% 0 1;
            & :global(.label){
              margin-top: 15px !important;
            }
          }
        }
        & :global(.info-block){
          display: flex;
          align-items: center;
          flex-wrap: nowrap;
          width: 48%;
          margin-top: 10px;
          font-size: 14px;
          font-family: open_sansregular;
          font-style: italic;
          line-height: 19px;
          margin-bottom: 0;
          margin-left: auto;
          & :global(.ico){
            width: 15px;
            min-width: 15px;
            margin-right: 10px;
            & :global(img){
              width: 100%;
            }
          }
        }
      }
      & :global(.modal-tab-content){
        justify-content: space-between;
        & :global(.info-block){
          flex-wrap: nowrap;
          align-items: flex-start;
          font-size: 14px;
          font-style: italic;
          margin-top: 10px;
          & :global(.ico){
            width: 15px;
            min-width: 15px;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
