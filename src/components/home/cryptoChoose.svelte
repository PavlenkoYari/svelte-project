<svelte:body on:mousedown={e => {
    const $this = e.target;
    if(!$this.classList.contains('choose-currency-list') && !$this.closest('.choose-currency-list') && !$this.classList.contains('choose-crypto-currency') && !$this.closest('.choose-crypto-currency')){
        openBtn = false;
        openList = false;
    }
}} />

<script>
import { cryptocurrency, currCrypto, countCrupto, amount, minAndMax, currName } from '../../store/store.js';
import { getCryptoValue } from "../../helper/getCryptoValue"
let openBtn = false;
let openList = false;
let countCrypto = 0;

function setCurrentCrypto(crypto){
    currCrypto.update( () => crypto)

    getCryptoValue(countCrupto, $currName, $currCrypto, $amount, $minAndMax[0], $minAndMax[1])
}
</script>


<div class="input-block crypt">
    <div class="label">Сryptocurrency</div>
    <input type="text" value={$cryptocurrency[countCrypto].name}>
    <div class="ico">
        <img src={$cryptocurrency[countCrypto].linkIco} alt="bitcoin">
    </div>
    <button class:open={openBtn} class="pointer choose-crypto-currency" on:click={() => {openBtn = !openBtn; openList = !openList}}>
        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 4L0.401923 0.250001L5.59808 0.250001L3 4Z" fill="#ABB3C6"/>
        </svg>
    </button>
    <div class:open={openList} class="choose-currency-list df">
        {#each $cryptocurrency as c, i}
            <button class:selected={i == countCrypto} class="list df pointer" data-value="BTC - Bitcoin Cash"
            on:click={() => {countCrypto = i; openBtn = !openBtn; openList = !openList; setCurrentCrypto(c.shortName)}}>
                    <span class="icon">
                        <img src={c.linkIco} alt="currencyImage">
                    </span>
                {c.name}
            </button>
        {/each}
    </div>
</div>


<style lang="scss">
.input-block{
  flex: 35% 0 1;
  background: #27292F;
  border: 1px solid #2E3139;
  border-radius: 3px;
  position: relative;
  .label{
    font-family: open_sansbold;
    color: #FFFFFF;
    margin-bottom: 10px;
    position: absolute;
    top: -10px;
    left: 0;
    transform: translateY(-100%);
  }
  input{
    width: 100%;
    font-size: 16px;
    height: 100%;
    color: #818796;
    padding: 0 10px;
    font-family: cabinregular;
  }

  &.crypt{
    .choose-crypto-currency{
      position: absolute;
      top: 50%;
      display: flex;
      transform: translateY(-50%);
      right: 20px;
      width: 10px;
      height: 10px;
      align-items: center;
      justify-content: center;
      z-index: 3;
      &:hover{
        svg {
          path{
            fill: white;
          }
        }
      }
      &.open{
        svg {
          transform: rotate(180deg);
          path{
            fill: white;
          }
        }
      }
      svg{
        transition: all .3s;
        path{
          fill: #ABB3C6;
        }
      }
    }
    .choose-currency-list{
      position: absolute;
      bottom: -5px;
      transform: translateY(100%);
      background: #27292F;
      border-radius: 3px;
      padding: 10px;
      flex-direction: column;
      right: 0;
      left: 0;
      display: none;
      z-index: 3;
      &.open{
        display: flex;
      }
      .list{
        border-bottom: 1px solid #2E3139;
        flex-wrap: nowrap;
        font-family: open_sansbold;
        color: #818796;
        padding: 7px 0;
        font-size: 16px;
        align-items: flex-start;
        .icon{
            display: inline-block;
              height: 20px;
              min-height: 20px;
              width: 20px;
              margin-right: 10px;
          img{
            height: 100%;
            width: auto;
          }
        }
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
    .ico{
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 20px;
      left: 10px;
      img{
        height: 100%;
        width: auto;
        margin: auto;
        display: block;
      }
    }
    input{
     padding-left: 50px;
    }
  }
}
</style>
