<script>
import { post } from "../../../../helper/fetch.js";

let ico = "";
let name = "";

async function addCurrency(){
    const response = await post('/admin-panel/general/add-currency',{
        ico,
        name
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
        <label class="label">Enter icon for currency</label>
        <input type="text" bind:value={ico} placeholder="$">
    </div>
    <div class="form-group">
        <label class="label">Enter name for currency</label>
        <input type="text" bind:value={name} placeholder="USD">
    </div>
    <div class="greenBkgBtn add-cur" on:click={addCurrency}>Add Currencty</div>
</div>

<style>
.form-group{
    margin-right: 30px;
    margin-bottom: 0;
    max-width: calc(33% - 30px);
}
.add-cur{
    padding: 8px
}
</style>
