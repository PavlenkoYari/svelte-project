<svelte:body on:mousedown={e => {
    const $this = e.target;
    if(!$this.classList.contains('modal') && !$this.closest('.modal')){
        modalObj.openModal = false;
    }
}} />

<script>
import { onMount } from 'svelte';
import Voucher from "../../../components/myAccount/voucher.svelte"
import Modal from "./_modal.svelte"
import {post} from "../../../helper/fetch.js"

export let isVoucher;

let name = "asdasd"
let forUpdateData = isVoucher;
let voucherList = [];
let modalObj = {
    openModal: false,
}

function openModal(objForModal){
    modalObj = {
        openModal: !modalObj.openModal,
        ...objForModal
    }

}

async function getVoucher() {
    let response;
    if(isVoucher){
        response = await post('/my-account/voucher', {
            isVoucher
        })
    }
    else {
        response = await post('/my-account/voucher', {
            isVoucher
        })
    }

    forUpdateData = isVoucher;
    voucherList = response;
}

async function cancelVoucher(voucherID){
    const response = await post('/my-account/voucher/cancel-order', {
        voucherID
    })

    if(response.success){
        alert(response.message)
        voucherList = voucherList.filter( v => v._id != voucherID)
    }
    else {
        alert(response.message)
    }
}

function closeModal(){
    modalObj.openModal = false;
}

$: if (isVoucher != forUpdateData) {
	getVoucher();
}

onMount( () => {
    getVoucher();
})
</script>

<div class="tab-content t-voucher">
    {#each voucherList as v (v._id)}
        <Voucher voucher={v} {openModal} {cancelVoucher} id={v._id}/>
	{:else}
        <div class="nothing-show" style="padding-top:20px;padding-bottom: 20px; text-align: center">
            <div class="icon" style="width: 55px; height: 55px;margin:auto; margin-bottom: 10px;">
                <img src="/image/icon/_vouch.svg" alt="_vouch" style="width: 100%; height: 100%;">
            </div>
            <div class="text" style="font-size: 12px;color: #4C505A;margin-bottom: 30px;">You currently have no coupons</div>
            <a href="/#buy-now" style="display: block;width: 75px; margin: auto; color: #6FB12F;font-family: open_sansbold; font-weight: bold;min-width: max-content;max-width: max-content;">Buy now</a>
        </div>
	{/each}


    {#if modalObj.openModal}
        <Modal {modalObj} {closeModal}/>
    {/if}
</div>
