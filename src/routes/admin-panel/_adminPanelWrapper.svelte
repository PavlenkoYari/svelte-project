<script>
export let page;
let tabs = [{name: "General", link: "/admin-panel/general"}, {name: "Voucher", link: "/admin-panel/voucher"}, {name: "Analitic", link: "/admin-panel/analitic"}]
</script>

<div class="mw">
    <div class="df admin-tabs">
        {#each tabs as t}
            <a class:active={t.link == page} href={t.link}>{t.name}</a>
        {/each}
    </div>
    <slot></slot>
</div>


<style>
.admin-tabs{
    margin-bottom: 50px;
    align-items: center;
}
.admin-tabs a{
    margin-right: 30px;
    color: #818796;
}
.admin-tabs a.active{
    color: white
}
</style>
