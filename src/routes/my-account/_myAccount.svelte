<script>
import { stores, goto } from '@sapper/app';
import { post } from "../../helper/fetch.js"
import ChangePass from "../../components/myAccount/changePass.svelte"
const { session } = stores();

export let isVoucher;

let openChangePass = false;

function openChangePassEvent(){
    openChangePass = !openChangePass;
}

async function logOut(){
    const response = await post('/auth/logout')
    if(response.success){
        await goto('/');
        $session.user = undefined;
    }
}
</script>

<div class="mw account">
    <h1 class="title1">My Account</h1>
    <div class="acc-content df">
        <div class="card df">
            <div>
                <div class:open={!openChangePass} class="close-change-pass open">
                    <div class="title2">Account Info</div>

                    <div class="label">EMAIL</div>
                    <div class="email-val">{$session.user.email}</div>
                </div>


                <button class="df change-pass pointer" on:click={openChangePassEvent}>
                    <span class="ico">
                        <img src="/image/myAcc/key.svg" alt="key">
                    </span>
                    Change password
                </button>

                {#if openChangePass}
                    <div class="change-password-wrapper open">
                          <ChangePass {openChangePassEvent}/>
                          <div class="cancel-change-pass-block" on:click={openChangePassEvent}>Cancel</div>
                    </div>
                {/if}


            </div>
            <div class:open={!openChangePass} class="close-change-pass open">
                <button on:click={logOut} class="df logout">
                        <span class="ico">
                           <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg"><g
                                   clip-path="url(#clip0)" fill="#ABB3C6"><path
                                   d="M.5 12h9a.5.5 0 0 0 .5-.5V8a.5.5 0 1 0-1 0v3H1V1h8v3a.5.5 0 1 0 1 0V.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5z"/><path
                                   d="M7.354 4.354a.5.5 0 0 0-.708-.708l-2 2a.506.506 0 0 0-.033.037l-.013.018-.016.021-.013.022-.012.02-.01.023c-.004.007-.008.014-.01.022l-.01.022-.007.024c-.003.007-.004.015-.006.023l-.006.024-.004.027-.004.022a.504.504 0 0 0 0 .098l.004.022c0 .01.002.018.004.027l.006.024c.002.008.003.016.006.023l.008.024.008.022.01.022.011.023.012.02.013.022.016.021.013.018c.01.013.022.025.033.036l2 2a.5.5 0 0 0 .708-.707L6.207 6.5H11.5a.5.5 0 1 0 0-1H6.207l1.147-1.146z"/></g><defs><clipPath
                                   id="clip0"><path transform="rotate(-180 12 12)" fill="#fff"
                                                    d="M12 12h12v12H12z"/></clipPath></defs></svg>
                        </span>
                    Log Out
                </button>
            </div>
        </div>
        <div class="right">
            <div class="tabs df">
                <a href="/my-account/my-vouchers" class:active={isVoucher} class="tab pointer" id="t-voucher">My Vouchers</a>
                <a href="/my-account/my-redeems" class:active={!isVoucher} class="tab pointer" id="t-redeems">My Redeems</a>
            </div>
            <slot></slot>
        </div>
    </div>

</div>


<style lang="scss">
.account{
  .title1{
    font-size: 24px;
    font-family: open_sansbold;
    color: #FFFFFF;
    margin-bottom: 30px;
  }
  .acc-content{
    align-items: flex-start;
    .card{
      font-family: open_sansregular;
      width: 245px;
      margin-right: 20px;
      padding: 20px 25px;
      background: #1E1F24;
      border-radius: 3px;
      min-height: 300px;
      flex-direction: column;
      justify-content: space-between;
      .close-change-pass{
        display: none;
        &.open{
          display: block;
        }
      }
      .change-password-wrapper{
        display: none;
        margin-top: 20px;
        &.open{
          display: block;
        }
        & :global(.form-group){
          margin-bottom: 15px;
        }
        .cancel-change-pass-block{
          text-align: center;
          margin-top: 10px;
          font-size: 14px;
          font-family: open_sansregular;
          color: #818796;
          cursor: pointer;
          &:hover{
            color: #ABB3C6;
          }
        }
      }
      .title2{
        font-family: open_sansbold;
        color: #FFFFFF;
        margin-bottom: 20px;
      }
      .label{
        font-size: 12px;
        color: #818796;
      }
      .email-val{
        font-size: 14px;
        font-family: cabinsemibold;
        color: #FFFFFF;
        margin-bottom: 20px;
      }
      .change-pass{
        font-size: 14px;
        color: #818796;
        &:hover{
          color: #ABB3C6;
        }
        .ico{
          width: 14px;
          height: 14px;
          margin-right: 5px;
        }
      }
      .logout{
        font-size: 14px;
        color: #818796;
        &:hover{
          color: #ABB3C6;
          svg path{
            fill: #E1E8FA;
          }
        }
        .ico{
          width: 12px;
          margin-right: 10px;
          svg{
            width: 100%;
          }
        }
      }
    }
    .right{
      width: calc(100% - 265px);
      padding: 20px 25px;
      background: #1E1F24;
      border-radius: 3px;
      .tabs{
        border-bottom: 1px solid #27292F;
        margin-bottom: 30px;
        .tab{
          font-size: 16px;
          font-family: open_sansbold;
          color: #555966;
          padding: 10px;
          position: relative;
          &:not(.active):hover{
            color: #818796;
          }
          &.active{
            color: #FFFFFF;
            &:before{
              content: "";
              position: absolute;
              height: 3px;
              background: #818796;
              width: 100%;
              bottom: 0;
              display: block;
              transform: translateY(50%);
              left: 0;
            }
          }
        }
      }
    }
  }
}


@media (max-width: 1100px) {
  .account{
    .acc-content{
      flex-direction: column;
      .card{
        width: 100%;
        margin: auto;
        margin-bottom: 20px;
        .change-password-wrapper :global(.submit-change-pass){
          display: block;
          margin: auto;
          margin-top: 25px;
        }
      }
      .right{
        width: 100%;
      }
    }
  }
}

@media (max-width: 820px) {
    .account :global(.modal-wrapper .modal .voucher-block){
        width: auto;
        height: auto;
        margin: auto;
        max-width: 300px;
        background: url(/image/myAcc/voucherModalMob.png) center no-repeat;
        background-size: cover;
        margin-bottom: 30px;
        padding: 40px 25px;
        & :global(.help-block .total){
          flex-direction: column;
          align-items: flex-start;
          & :global(.opt){
            display: inline;
          }
        }
      }
      .account{
        .acc-content .right {
          padding: 10px;
          & :globla(.tabs){
            justify-content: center;
          }
        }
      }
}

@media (max-width: 550px) {
  .account :global(.modal-wrapper .modal) {
    padding: 15px;
    & :global(.redeem-btn){
      width: 100%;
    }
    & :global(.voucher-block){
      width: auto;
      height: auto;
      max-width: 300px;
    }
    & :global(.wrapper-for-template) {
      & :global(.tab-content .form-group){
        flex: 100% 0 1;
      }
      & :global(.info-block){
        width: 100%;
      }
    }
  }
}


</style>
