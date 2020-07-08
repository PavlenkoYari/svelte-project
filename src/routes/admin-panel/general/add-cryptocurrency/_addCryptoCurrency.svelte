<script>
import { post } from "../../../../helper/fetch.js";

let shortName = "";
let cryptoName = "";
let commission = "";

$: link = `/image/redeem/cryptoIco/${cryptoName.toLowerCase()}.svg`

async function addCryptoCurrency(){
    const response = await post('/admin-panel/general/add-cryptocurrency',{
        shortName,
        cryptoName,
        commission,
        link
    })

    if(response.success){
        alert(response.message)
    }
    else {
        alert(response.message)
    }
}
</script>

<div class="df" style="align-items: flex-end">
    <div class="form-group">
        <label class="label">Enter short name for cryptocurrency</label>
        <input type="text" bind:value={shortName} placeholder="BTC">
    </div>
    <div class="form-group">
        <label class="label">Enter name for cryptocurrency</label>
        <input type="text" bind:value={cryptoName} placeholder="Bitcoin">
    </div>
    <div class="form-group">
        <label class="label">Enter link icon for cryptocurrency</label>
        <input type="text" bind:value={link} placeholder="/image/redeem/cryptoIco/bitcoin.svg">
    </div>
    <div class="form-group">
        <label class="label">Enter commission for cryptocurrency</label>
        <input type="text" bind:value={commission} placeholder="0.00028">
    </div>
    <div class="greenBkgBtn add-cur" on:click={addCryptoCurrency}>Add Crytpocurrencty</div>
</div>

<style>
.form-group{
    margin-right: 30px;
    margin-bottom: 15px;
    max-width: calc(33% - 30px);
}
.add-cur{
    padding: 8px;
    margin-bottom: 15px;
}
</style>
