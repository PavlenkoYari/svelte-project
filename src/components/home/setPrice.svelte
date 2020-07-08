<svelte:body on:mousedown={e => {
    const $this = e.target;
    if(!$this.classList.contains('currency-list') && !$this.closest('.currency-list') && !$this.classList.contains('сhoose-currency-btn') && !$this.closest('.сhoose-currency-btn')){
        openBtn = false;
        openList = false;
    }
}} />

<script>
import { amount, currName, currIco, currency, countCrupto, minAndMax, currCrypto } from '../../store/store.js';
import { onMount } from 'svelte';
import { goto } from '@sapper/app';
import { get } from "../../helper/fetch"
import { getCryptoValue } from '../../helper/getCryptoValue'

export let setError;
export let setDisabledNextStep;

let disabledNextStep = true;
let openBtn = false;
let openList = false;
let countCrypto = 0;

let minValue = $minAndMax[0];
let maxValue = $minAndMax[1];



let errorMSG = "";
let inputValue = minValue

async function getCurrency() {
	const response = await get('/get-static/get-currency')
	if(response.success){
		currency.update( () => response.data)
	}
	else {
		goto('/error/500')
	}
}

const inputBlur = () => {
    if (isNaN(+inputValue) || +inputValue< minValue || +inputValue > maxValue) {
        setError(true)
        errorMSG = isNaN(+inputValue) ? "Voucher value must be a number." : +inputValue < minValue ? `Minimum order amount ${minValue}.` : `Maximum order amount ${maxValue}.`;
    } else {
        setError(false)
        setDisabledNextStep(false)
        amount.update( () => inputValue)
    }
}
const chooseCurrency = (index) => {
     openBtn = !openBtn;
     openList = !openList;
     countCrypto = index;
     currName.update( () => $currency[countCrypto].name)
     currIco.update( () => $currency[countCrypto].ico)
     getCryptoValue(countCrupto, $currName, $currCrypto, inputValue, minValue, maxValue)
}

onMount(async () => {
    await getCurrency();
    amount.update( () => inputValue)
    currName.update( () => $currency[countCrypto].name)
	getCryptoValue(countCrupto, $currName, $currCrypto, inputValue, minValue, maxValue)
});
</script>

<div class="input-block">
    <div class="label">Coupon value</div>
    <input type="text"
           bind:value={inputValue}
           on:focus={() => setDisabledNextStep(true)}
           on:blur={inputBlur}
           on:keyup={() => getCryptoValue(countCrupto, $currName, $currCrypto, inputValue, minValue, maxValue)}>
    <button class:open={openBtn} class="сhoose-currency-btn pointer df" on:click={() => {openBtn = !openBtn; openList = !openList}}>
        <div class="val">{$currency.length && $currency[countCrypto].name}</div>
        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4L0.401924 0.25L5.59808 0.25L3 4Z" fill="#ABB3C6"/>
        </svg>
    </button>
    <div class:open={openList} class="currency-list df">
        {#each $currency as c, i}
            <button class:selected={countCrypto == i} class="list pointer" on:click={() => chooseCurrency(i)}>{c.ico} {c.name}</button>
        {/each}
    </div>
    <div class="btc-val">
        ≈ <span class="val">{$countCrupto}</span>{$currCrypto}
    </div>
    <div class="error">{errorMSG}</div>
</div>


<style lang="scss">
.input-block{
  flex: 35% 0 1;
  background: #27292F;
  border: 1px solid #2E3139;
  border-radius: 3px;
  position: relative;
  .btc-val{
    color: #ABB3C6;
    font-family: open_sansbold;
    position: absolute;
    bottom: -10px;
    left: 0;
    transform: translateY(100%);
  }
  .label{
    font-family: open_sansbold;
    color: #FFFFFF;
    margin-bottom: 10px;
    position: absolute;
    top: -10px;
    left: 0;
    transform: translateY(-100%);
  }
  .error{
    display: none;
  }
  input{
    width: 100%;
    font-size: 16px;
    height: 100%;
    color: #818796;
    padding: 0 10px;
    font-family: cabinregular;
  }
  .currency-list{
    position: absolute;
    bottom: -5px;
    transform: translateY(100%);
    right: 0;
    background: #27292F;
    border-radius: 3px;
    padding: 10px 15px;
    flex-direction: column;
    display: none;
    &.open{
      display: flex;
    }
    .list{
      width: 100%;
      font-size: 18px;
      color: #ABB3C6;
      padding: 5px 3px;
      border-bottom: 1px solid #2E3139;
      &:last-child{
        border: 0;
      }
      &:hover{
        color: white;
      }
      &.selected{
        color: white;
      }
    }
  }
  .сhoose-currency-btn{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    align-items: center;
    color: #ABB3C6;
    &:hover{
      color: #FFFFFF;
      svg {
        path{
          fill: white;
        }
      }
    }
    &.open{
      color: #FFFFFF;
      svg {
        transform: rotate(180deg);
        path{
          fill: white;
        }
      }
    }
    svg{
      margin-left: 7px;
      transition: all .3s;
      path{
        fill: #ABB3C6;
      }
    }
  }
}
</style>
