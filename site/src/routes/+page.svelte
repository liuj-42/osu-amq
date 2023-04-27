<script>
    import { page } from '$app/stores';
	import { onMount } from 'svelte';
    
    let loggedIn = false;
	
	let userInfo = {};
	let ready = false;

	onMount(async () => {
		loggedIn = await fetch("http://localhost:5000/loggedIn")
			.then(res => res.json())
			.then(data => { return data })
		if (loggedIn) {
			// send a request to get the users info from the /me endpoint
			await fetch("http://localhost:5000/me")
				.then(res => res.json())
				.then(data => {
					console.log("got data from /me, ", data)
					userInfo = JSON.parse(JSON.stringify(data));
					ready = true;
				})
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
		{#if loggedIn && ready}
			<h1>
				you are logged in!
			</h1>
			{#if ready}
				<p>your username is {userInfo.username}</p>
				<img src={userInfo.avatar_url} alt="avatar" />
			{/if}
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
