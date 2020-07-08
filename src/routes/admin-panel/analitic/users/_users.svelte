<script>
import { onMount } from "svelte";
import { post } from "../../../../helper/fetch"
import { currency } from "../../../../store/store"

let usersData = []

async function getUsersAnalitic() {
    const response = await post('/admin-panel/analitic/users')

    usersData = response.data;
}

onMount(() => {
    getUsersAnalitic()
})
</script>


<div class="tabel" style="margin-top: 50px;">
    <div class="line df">
        <div class="email">
            Email
        </div>
        <div class="orders">
            Count Orders
        </div>
        {#each $currency as cur}
            <div class="price">
                {cur.ico}{cur.name}
            </div>
        {/each}
    </div>
    {#each usersData as data}
    <div class="line df">
        <div class="email">
            {data.email}
        </div>
        <div class="orders">
            {data.countCoupon}
        </div>
        {#each $currency as cur}
            <div class="price">
                {data.analitic[cur.name] ? data.analitic[cur.name] : 0}
            </div>
        {/each}
    </div>
    {/each}
</div>


<style lang="scss">
.line{
    align-items: center;
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom: 1px solid white;
    .email{
        width: 15%
    }
    .orders{
        width: 15%
    }
    .price{
        width: 10%
    }
}
</style>
