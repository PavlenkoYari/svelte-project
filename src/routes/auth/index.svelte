<svelte:head>
	<title>Service Authentication</title>
</svelte:head>

<script context="module">
	export async function preload(page, session) {
		const { user } = session;

		if (user) {
			return this.redirect(302, '/');
		}

		return { user };
	}
</script>

<script>
import FormGroup from '../../components/FormGroup.svelte';
import Login from './_login.svelte'
import Register from './_registration.svelte'

let swithOnLigin = true;

function swithAuthOpt() {
	swithOnLigin = !swithOnLigin
}
</script>


<style lang="scss">
	.auth-wrapper{
	  max-width: 365px;
	  margin: 0;
	  margin-right: auto;
	  margin-top: 60px;
	  .title1{
	    font-size: 36px;
	    font-family: open_sansbold;
	    color: #FFFFFF;
	    margin-bottom: 40px;
	  }
	}
</style>


<div class="mw auth">
		<div class="auth-wrapper">
			<h1 class="title1">{swithOnLigin ? "Log In" : "Create Account"}</h1>
			{#if swithOnLigin}
				<Login {swithAuthOpt}/>
			{:else}
				<Register {swithAuthOpt}/>
			{/if}
		</div>
</div>
