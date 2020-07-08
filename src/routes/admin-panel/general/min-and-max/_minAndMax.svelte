<script>
import { minAndMax } from '../../../../store/store.js';
import { post } from "../../../../helper/fetch.js";

let min = $minAndMax[0];
let max = $minAndMax[1];


async function changeMinAndMax(){
    const response = await post('/admin-panel/general/min-and-max',{
        min,
        max
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
        <label class="label">Enter minimal price coupon</label>
        <input type="text" bind:value={min} placeholder="10">
    </div>
    <div class="form-group">
        <label class="label">Enter maximal price coupon</label>
        <input type="text" bind:value={max} placeholder="500">
    </div>
    <div class="greenBkgBtn add-cur" on:click={changeMinAndMax}>Change min/max</div>
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
