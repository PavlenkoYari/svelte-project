<script>
import {stores} from '@sapper/app';
const {session} = stores();
$: user = $session.user;


export let openNav;
export let showNav;
</script>

<div class:open={openNav} class="navigation-wrapper" on:click={() => showNav(false)}>
    <div class="overflow">
        <div class="navigation">
            {#if user}
                <a href="/my-account/my-vouchers" class="nav my-acc df mob">
                    <div class="ico">
                        <img src="/image/header/user.svg" alt="user">
                    </div>
                    My Account
                </a>
            {:else}
                <a href="/auth" style="color: white" class="login-link nav mob">Log In</a>
            {/if}
            <a href="/#buy-now" data-id="voucher_input" class="buy-now-link greenBkgBtn nav anchor mob">Buy Now</a>
            <a href="/redeem " class="reedem-link borderBtn list mob">Redeem</a>
            <p class="nav">Home</p>
            <a href="/#faq" data-id="faq-anchor" class="nav anchor">FAQ</a>
            <a href="/#contact-us" data-id="contact-us-anchor" class="nav anchor">Contact Us</a>
            <a href="/privacy-policy" class="nav">Privacy Policy</a>
            <a href="/terms-of-service" class="nav">Terms of Service</a>
        </div>
    </div>
</div>
