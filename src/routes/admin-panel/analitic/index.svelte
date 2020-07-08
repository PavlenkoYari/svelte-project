<script context="module">
export async function preload(page, session){
    const { user } = session;
    if(!user || !user.admin){
        // return this.error(403, 'Premision denied');
    };

    const {path} = page;

    return {path}
}
</script>

<script>
import AdminPanelWrapper from "../_adminPanelWrapper.svelte"
import Users from "./users/_users.svelte"

export let path;

let TabsComponents = Users;

const tabs = [
    {title: "Users", component: (index) => {tabsCount = index; import('./users/_users.svelte').then(res => TabsComponents = res.default)}},
]
let tabsCount = 0;

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
</style>
