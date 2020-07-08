<script>
import { post } from "../../helper/fetch.js"
export let voucher;
export let id;
export let cancelVoucher;
export let openModal;
export let adminPanel;
export let setStatusVoucher;
export let isVoucher;


let _date = new Date(voucher.date);
let monthDate = _date.getMonth() > 9 ? _date.getMonth() + 1 : `0${_date.getMonth() + 1}`;
let dayDate = _date.getDate() > 9 ? _date.getDate() : `0${_date.getDate()}`;
let hoursDate = _date.getHours() > 9 ? _date.getHours() : `0${_date.getHours()}`;
let minutesDate = _date.getMinutes() > 9 ? _date.getMinutes() : `0${_date.getMinutes()}`;


let _dateRedeem;
let monthDateRedeem;
let dayDateRedeem;
let hoursDateRedeem;
let minutesDateRedeem;

$: if (voucher.redeemDate) {
    _dateRedeem = new Date(voucher.redeemDate);
    monthDateRedeem = _dateRedeem.getMonth() > 9 ? _dateRedeem.getMonth() + 1 : `0${_dateRedeem.getMonth() + 1}`;
    dayDateRedeem = _dateRedeem.getDate() > 9 ? _dateRedeem.getDate() : `0${_dateRedeem.getDate()}`;
    hoursDateRedeem = _dateRedeem.getHours() > 9 ? _dateRedeem.getHours() : `0${_dateRedeem.getHours()}`;
    minutesDateRedeem = _dateRedeem.getMinutes() > 9 ? _dateRedeem.getMinutes() : `0${_dateRedeem.getMinutes()}`;
}


</script>



<div class="voucher-block df">
    <div class="left-v">
        <div class="price">Crypto Voucher <span class="opt">{voucher.prettyPrice}</span></div>
        <div class="date">
            Order date: <span class="opt">{_date.getFullYear()}-{monthDate}-{dayDate} {hoursDate}:{minutesDate}</span>
        </div>
        {#if adminPanel}
        <div class="date">
            Email: <span class="opt">{voucher.email}</span>
        </div>
        {/if}
        <div class="status">
            {#if voucher.status == "pending"}
                Payment status: <span class="opt yellow">Pending</span>
            {:else if voucher.status == "paid"}
                Payment status: <span class="opt green">Paid</span>
            {:else if voucher.status == "redeem"}
                Payment status: <span class="opt yellow">Redeemed</span>
            {:else if voucher.status == "completed"}
            Payment status: <span class="opt green">Redeemed</span>
            {/if}
        </div>
    </div>
    <div class="right-v df">
        <div class="help-block">
            <div class="total">
                <div>
                    Total: <span class="opt">{voucher.prettyPrice}</span>
                </div>
                {#if adminPanel && (voucher.status == "redeem" || voucher.status == "completed")}
                    <div>
                        Crypptocurrency: <span class="opt">{voucher.cryptoInfo.cryptoCount}{voucher.cryptoInfo.cryptoName}</span>
                    </div>
                {/if}
                {#if openModal}
                    <button class="details-btn pointer"
                    on:click={() => openModal(voucher)}>Details</button>
                {:else}
                    {#if (voucher.status == "redeem" || voucher.status == "completed") && !adminPanel}
                    <div class="price">
                        <span style="margin: 0 5px 0 7px;">=</span>
                        <span class="opt" style="color: #6FB12F;">{voucher.cryptoInfo.cryptoCount}{voucher.cryptoInfo.cryptoName}</span>
                    </div>
                    {/if}
                {/if}
            </div>
        </div>
        {#if !adminPanel}
            {#if voucher.status == "pending"}
                <button class="changeOrder btn cancel pointer" on:click={() => cancelVoucher(id)}>Cancel Order</button>
            {:else if voucher.status == "paid"}
                <a href="/redeem?id={voucher.order}" class="borderBtn btn reedem pointer">Redeem</a>
            {:else if voucher.status == "redeem"}
                <div class="btn info">
                    <div class="opt1">Redeem</div>
                    <div class="status">In Progress</div>
                </div>
            {:else if voucher.status == "completed"}
                <div class="btn info">
                    <div class="opt1">Redeem</div>
                    <div class="status">{_dateRedeem.getFullYear()}-{monthDateRedeem}-{dayDateRedeem} {hoursDateRedeem}:{minutesDateRedeem}</div>
                </div>
            {/if}
        {:else}
            <button class="borderBtn btn reedem pointer" on:click={() => setStatusVoucher(id)}>{#if isVoucher}Paid{:else}Complete{/if}</button>
        {/if}
    </div>
</div>
