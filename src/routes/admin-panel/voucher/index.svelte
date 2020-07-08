<script context="module">
export async function preload(page, session){
    const { user } = session;
    if(!user || !user.admin){
        return this.error(403, 'Premision denied');
    };

    const {path} = page;

    return {path}
}
</script>


<script>
import AdminPanelWrapper from "../_adminPanelWrapper.svelte"
import { stores } from "@sapper/app"
const { session } = stores();
import { onMount } from "svelte";
import { post } from '../../../helper/fetch.js'
import Voucher from '../../../components/myAccount/voucher.svelte';

export let path;


let voucherList = [];
let reference = '';
let emailForVaucher = '';
let isVoucher = true;


async function getVoucher() {
    const response = await post('/admin-panel/voucher/get-voucher', {
        reference,
        emailForVaucher,
        isVoucher
    })
    voucherList = response;
}
async function setStatusVoucher(vouchID){
    const route = isVoucher ? '/admin-panel/voucher/voucher-paid' : '/admin-panel/voucher/voucher-complete'
    const response = await post(route, {
        vouchID
    })
    if(response.success){
        voucherList = voucherList.filter( v => v._id != vouchID)
    }
    alert(response.message)
}

onMount( () => {
    getVoucher()
})
</script>


<AdminPanelWrapper page={path}>
    <div class="mw">
        <div class="df option-search">
            <input type="text" bind:value={reference} placeholder="Enter reference">
            <input type="text" bind:value={emailForVaucher} placeholder="Enter email">
            <button class="greenBkgBtn pointer" on:click={getVoucher}>Search Voucher</button>
        </div>
        <div class="df" style="margin-top: 20px">
            <div class:active={isVoucher} class="radio df pointer" on:click={() => {isVoucher = true; getVoucher()}}>
                <div class="circle-wrapper">
                    <div class="circle"></div>
                </div>
                Voucher
            </div>
            <div class:active={!isVoucher} class="radio df pointer" on:click={() => {isVoucher = false; getVoucher()}}>
                <div class="circle-wrapper">
                    <div class="circle"></div>
                </div>
                Redeem
            </div>
        </div>
        {#each voucherList as v (v._id)}
            <Voucher voucher={v} {setStatusVoucher} id={v._id} adminPanel={true} {isVoucher}/>
        {:else}
            <div>No coupons yet</div>
        {/each}
    </div>
</AdminPanelWrapper>


<style lang="scss">
.option-search input{
    border: 1px solid white;
    color: white;
    margin-right: 10px;
    padding: 7px;
    border-radius: 5px
}
.option-search .greenBkgBtn{
    padding: 7px;
    width: 150px;
    text-align: center;
}
.radio{
    margin-right: 20px;
    align-items: center;
    &.active{
        .circle-wrapper .circle{
            display: block;
        }
    }
    .circle-wrapper{
        width: 20px;
        height: 20px;
        margin-right: 7px;
        border-radius: 100%;
        border: 1px solid white;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        align-items: center;
        justify-content: center;
        .circle{
            width: 10px;
            height: 10px;
            border-radius: 100%;
            background: white;
            display: none;
        }
    }
}
</style>
