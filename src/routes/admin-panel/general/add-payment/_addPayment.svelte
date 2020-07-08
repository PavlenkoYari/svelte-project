<script>
import { post } from "../../../../helper/fetch.js";
import { currency } from "../../../../store/store.js";

let link = "";
let paymentName = "";
let currencyList = [];


async function addPayment(){
    const response = await post('/admin-panel/general/add-payment',{
        link,
        paymentName,
        currencyList
    })

    if(response.success){
        alert(response.message)
    }
    else {
        alert(response.message)
    }
}
</script>

<div class="df" style="align-items: flex-end; margin-bottom: 20px">
    <div class="form-group">
        <label class="label">Enter payment name</label>
        <input type="text" bind:value={paymentName} placeholder="Direct Bank Transfer">
    </div>
    <div class="form-group">
        <label class="label">Enter payment img link</label>
        <input type="text" bind:value={link} placeholder="/image/checkout/bank.svg">
    </div>
</div>
<div>
    Choose currency for current payment methods
    <div style="margin-top: 7px">
    {#each $currency as c}
        <label>
            <input type="checkbox" bind:group={currencyList} value={c.name}>
            {c.name}
        </label>
    {/each}
    </div>
</div>
<div class="greenBkgBtn add-cur" on:click={addPayment}>Add Paymnet menthod</div>

<style>
.form-group{
    margin-right: 30px;
    margin-bottom: 0;
    max-width: calc(33% - 30px);
}
.add-cur{
    padding: 8px
}

.add-cur{
    max-width: 200px;
    text-align: center;
    margin-top: 20px;
}
</style>
