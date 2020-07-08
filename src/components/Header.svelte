<script>
import {stores, goto} from '@sapper/app';
import { language } from "../store/store"
import {post} from '../helper/fetch';
const {session} = stores();

export let langList;
export let showNav;
$: currentLang = langList.filter( lang => lang.literals === $session.lang );
$: user = $session.user;

async function logOut(){
    const response = await post('/auth/logout')
    if(response.success){
        await goto('/');
        $session.user = undefined;
    }
}

async function setLangObj(literals, ){


    const response = await post("/change-lang", {lang : literals})
    await import(`../language/${literals}.js`).then(res => {
        $session.lang = literals;
        language.update( () => res.lang)
    })
}

</script>

<header>
    <div class="mw df">
        <a href="/" class="logo">
            <img src="/image/header/logo.svg" alt="logo">
        </a>
        <div class="header-action df">
        {#if user}
            <div class="my-account-wrapper">
                <button class="my-acc-btn pointer df">
                    <div class="ico">
                        <img src="/image/header/user.svg" alt="user">
                    </div>
                    My Account
                    <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 4L0.401924 0.25L5.59808 0.25L3 4Z" fill="#ABB3C6"></path>
                    </svg>
                </button>
                <div class="account-list">
                    <a href="/my-account/my-vouchers" class="acc-list pointer">My Coupons</a>
                    <a href="/my-account/my-redeems" class="acc-list pointer">My Redeems</a>
                    {#if $session.user && $session.user.admin}
                    <a href="/admin-panel/voucher" class="acc-list pointer">Admin Panel</a>
                    {/if}
                    <button on:click={logOut} class="logout df">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0)">
                                <path d="M0.499985 12L9.49998 12C9.77612 12 10 11.7761 10 11.5L10 8.00002C10 7.72388 9.77615 7.50003 9.50001 7.50003C9.22387 7.50003 9.00002 7.72388 9.00002 8.00002L9.00002 11L1.00002 11L1.00002 1.00001L8.99999 1.00001L8.99999 4.00001C8.99999 4.27615 9.22384 4.5 9.49999 4.5C9.77613 4.5 9.99998 4.27615 9.99998 4.00001L9.99998 0.500023C9.99998 0.223883 9.77613 3.14517e-05 9.49999 3.14275e-05L0.499986 3.06407e-05C0.223846 3.06166e-05 -6.59989e-06 0.223882 -6.62403e-06 0.500022L-7.58568e-06 11.5C-7.60982e-06 11.7761 0.223845 12 0.499985 12Z" fill="#5C6273"/>
                                <path d="M7.35355 4.35358C7.54881 4.15832 7.54881 3.84173 7.35355 3.64647C7.1583 3.45121 6.8417 3.45121 6.64644 3.64647L4.64645 5.64647C4.64635 5.64656 4.64631 5.64666 4.64621 5.64673C4.63466 5.65831 4.62371 5.67045 4.61333 5.6831C4.60857 5.68889 4.60445 5.69499 4.59999 5.70094C4.59467 5.70804 4.58917 5.715 4.58422 5.72241C4.57946 5.72953 4.57534 5.73692 4.57098 5.74423C4.56697 5.75093 4.56278 5.75747 4.55907 5.76436C4.55509 5.77181 4.55171 5.77945 4.54813 5.78707C4.54473 5.79427 4.54114 5.80135 4.53807 5.8087C4.53503 5.81609 4.53254 5.82363 4.52987 5.83113C4.52703 5.83903 4.52401 5.84681 4.52157 5.85488C4.5193 5.86238 4.51764 5.87002 4.51574 5.87759C4.51365 5.88581 4.51135 5.89395 4.50969 5.90231C4.50796 5.9111 4.5069 5.91996 4.50564 5.9288C4.5046 5.93609 4.5032 5.94326 4.50247 5.95067C4.49924 5.98348 4.49924 6.01655 4.50247 6.04936C4.5032 6.05674 4.50458 6.06392 4.50564 6.07123C4.5069 6.08006 4.50793 6.08895 4.50969 6.09771C4.51135 6.1061 4.51365 6.11421 4.51574 6.12244C4.51764 6.13003 4.5193 6.13765 4.52157 6.14515C4.52401 6.15321 4.52703 6.16102 4.52987 6.16889C4.53257 6.17639 4.53503 6.18394 4.53807 6.19132C4.54112 6.19871 4.54473 6.20576 4.54813 6.21296C4.55171 6.22055 4.55509 6.22821 4.55907 6.23567C4.56278 6.24256 4.56697 6.2491 4.57098 6.2558C4.57534 6.26311 4.57946 6.2705 4.58422 6.27762C4.58917 6.28503 4.59467 6.29196 4.59999 6.29909C4.60445 6.30504 4.60857 6.31114 4.61333 6.31692C4.62371 6.32958 4.63466 6.34175 4.64621 6.3533C4.64631 6.35339 4.64635 6.35349 4.64645 6.35356L6.64644 8.35356C6.8417 8.54881 7.1583 8.54881 7.35355 8.35356C7.54881 8.1583 7.54881 7.8417 7.35355 7.64644L6.20711 6.5L11.5 6.5C11.7761 6.50004 12 6.27619 12 6.00005C12 5.72391 11.7761 5.50006 11.5 5.50006L6.20711 5.50006L7.35355 4.35358Z" fill="#5C6273"/>
                            </g>
                            <defs>
                                <clipPath id="clip0">
                                    <rect x="12" y="12" width="12" height="12" transform="rotate(-180 12 12)" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                        Log Out
                    </button>
                </div>
            </div>
        {:else}
        <a href="/auth" class="login-link">Log In</a>
        {/if}
            <a href="/#buy-now" class="buy-now-link greenBkgBtn">Buy Now</a>
            <a href="/redeem" class="reedem-link borderBtn">Reedem</a>
            <div class="lang-wrapper">
                <button class="lang-btn pointer df">
                    <div class="ico">
                        <img src={currentLang[0].linkIco} alt={currentLang[0].literals}>
                    </div>
                    {currentLang[0].literals.toUpperCase()}
                    <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 4L0.401924 0.25L5.59808 0.25L3 4Z" fill="#ABB3C6"></path>
                    </svg>
                </button>
                <div class="lang-list-wrapper">
                {#each langList as l}
                    <button class="lang-list df pointer" on:click={() => setLangObj(l.literals)}>
                        <span class="ico">
                            <img src={l.linkIco} alt={l.literals}>
                        </span>
                        {l.name}
                    </button>
                {/each}
                </div>
            </div>
            <button class="burger-wrapper" on:click={() => showNav(true)}>
                <div class="burger df pointer">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
        </div>
    </div>
</header>
