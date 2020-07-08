<script>
import { countCrupto } from "../../store/store"
import { onMount } from "svelte";
import { stores } from '@sapper/app';
import FormGroup from "../../components/FormGroup.svelte";
import { validRegisterForm } from "../../helper/validation";
import WAValidator from 'wallet-address-validator/dist/wallet-address-validator.min.js';
import { post } from "../../helper/fetch";
import lottie from "../../action/lottie";
const { session } = stores();

export let currentCrypto;
export let commission;
export let getActionSuccess;
export let prettyPrice;
export let cryptoFullName;
export let coupon;
export let getCryptoVal;


let cryptoValue = 0;
let email =  !$session.user ?  "" : $session.user.email;
let errorObj = {
    emailError: '',
    completeValid: false
};
let wallet = "";
let walletError = "";

async function redeemed(){
    let userResponse;
    if(!$session.user){
        errorObj = validRegisterForm(false, email);

        if(errorObj.completeValid){
            const response = await post('../auth/registration', {
                email
            });
            if (response.success) {
                userResponse = response.user;
            }
            else {
                if(response.validData){
                    errorObj = {
                        emailError: response.message,
                        completeValid: false
                    }
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

    walletError = validWallet();

    if(errorObj.completeValid && !walletError.length){
        const response = await post('/redeem/redeem-coupon', {
            couponID: coupon[0]._id,
            email,
            wallet,
            currentCrypto,
            cryptoFullName,
            cryptoCount: $countCrupto,
        })

        if(response.success){
            getActionSuccess(wallet.trim(), new Date().getTime(), prettyPrice);
            if(!$session.user){
                $session.user = userResponse;
            }
        }
        else {
            if(response.errorWallet){
                walletError = response.errorWallet;
            }
            else {
                alert(response.message)
            }
        }


    }
}

function validWallet(){
    var valid = WAValidator.validate(wallet.trim(), currentCrypto);
    if(valid){
        return "";
    }
    else{
        return "Wallet address is not a valid.";
    }
}

onMount(() => {
    console.log('sss');
    setInterval ( ()=> {
        getCryptoVal(coupon)
    }, 15000)
})
</script>

<div class="right step-redeem-two">
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
        styleCSS="margin-bottom: 25px"
        />
    {/if}
    <div class:has-error={walletError.length} class="form-group">
        <div class="label">Bitcoin wallet address</div>
        <input type="text" bind:value={wallet} placeholder="43c3  3566  4v43  34v4" class="svelte-1b1wwkj">
        <div class="error">{walletError}</div>
    </div>
    <div class="dontHave">
        Dont have a wallet? <button class="link">Create now!</button>
    </div>
    <div class="youWillGet df">
        <div class="left-c">
            <div class="title5" style="margin-bottom: 5px;">
                Total: <span class="opt">{coupon[0].prettyPrice}</span>
            </div>
            <div class="title3">
                You will get: <span id="opt" class="opt">{$countCrupto}{currentCrypto}</span>
            </div>
            <div class="title4">
                Including withdrawal fee {commission} {currentCrypto}
            </div>
        </div>
        <div id="anim-preload" use:lottie={[true, "/animations/preloader.json"]} style="width: 42px; height: 42px;"></div>
    </div>
    <div class="greenBkgBtn finish" on:click={redeemed}>Redeem</div>
</div>


<style lang="scss">
.form-group.has-error .label{
    color: #953c53;
}
.dontHave{
  font-size: 12px;
  color: #ABB3C6;
  margin-top: 10px;
  font-family: open_sansbold;
  margin-bottom: 65px;
  .link{
    color: #6FB12F;
    &:hover{
      color: #72BF27;
    }
  }
}
.youWillGet{
  align-items: flex-end;
  justify-content: space-between;
  .title5{
    font-size: 14px;
    font-family: open_sanssemibold;
    color: #818796;
    .opt{
      font-size: 24px;
      color: #FFFFFF;
    }
  }
  .title4{
    font-size: 12px;
    color: #494E58;
  }
  .title3{
    font-size: 14px;
    font-family: open_sanssemibold;
    color: #818796;
    .opt{
      font-size: 22px;
      color: #6FB12F;
    }
  }
}
.finish{
  background: #6FB12F;
  border-radius: 5px;
  width: 200px;
  text-align: center;
  padding: 8px;
  margin-top: 30px;
}

@media (max-width: 670px) {
    .dontHave{
      max-width: 370px;
      margin: auto;
      margin-bottom: 65px;
      margin-top: 10px;
    }
    .youWillGet .title3 .opt{
      font-size: 18px;
    }
}
</style>
