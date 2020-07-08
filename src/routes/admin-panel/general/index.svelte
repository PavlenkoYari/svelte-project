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
import AddCurrency from "./add-currency/_addCurrency.svelte"

export let path;

const tabs = [
    {title: "Add curency", component: (index) => {tabsCount = index; import('./add-currency/_addCurrency.svelte').then(res => TabsComponents = res.default)}},
    {title: "Add cryptocurency", component: (index) => {tabsCount = index; import('./add-cryptocurrency/_addCryptoCurrency.svelte').then(res => TabsComponents = res.default)}},
    {title: "Minimum and Maximum", component: (index) => {tabsCount = index; import('./min-and-max/_minAndMax.svelte').then(res => TabsComponents = res.default)}},
    {title: "Payment methods", component: (index) => {tabsCount = index; import('./add-payment/_addPayment.svelte').then(res => TabsComponents = res.default)}}
]
let tabsCount = 0;
let TabsComponents = AddCurrency;

</script>


<AdminPanelWrapper page={path}>
    <div class="tabs df" style="margin-bottom: 20px">
        {#each tabs as t, i}
            <div class:active={tabsCount == i} class="tab" on:click={() => t.component(i)}>{t.title}</div>
        {/each}
    </div>
    <svelte:component this={TabsComponents}/>
</AdminPanelWrapper>


<style>
.tab{
    margin-right: 15px;
    cursor: pointer;
}
.tab.active{
    color: white;
}
.title1{
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 70px;
    color: white;
}
</style>
