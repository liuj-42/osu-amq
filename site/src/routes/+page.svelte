<script>
    import { page } from '$app/stores';
	import { onMount } from 'svelte';
    
    let loggedIn = false;
	
	let userInfo = {};

	onMount(async () => {
		loggedIn = $page.url.searchParams.has('loggedIn')
		if (loggedIn) {
			localStorage.setItem('loggedIn', 'true');
			userInfo = await fetch("http://localhost:5000/userInfo")
				.then(res => res.json())
			console.log("got userinfo, ", userInfo)
		} 
	})

	function handleClick() {
		window.location = "http://localhost:5000/auth";
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="osu amq site" />
</svelte:head>

<section>
	<h1>
		osu music quiz
	</h1>
	<!-- log in or play as guest -->
	<div>
		{#if loggedIn}
			<h1>
				you are logged in!
			</h1>
		{:else}
			<button on:click={handleClick}>
				log in
			</button>
		{/if}
		<!--! not iplemented -->
		<!-- <button on:click={handleClick}>
			play as guest
		</button> -->

	</div>


</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
