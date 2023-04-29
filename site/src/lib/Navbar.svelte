<script>
    import { onMount } from "svelte";
    const API_URL = import.meta.env.VITE_API_URL
    const loggedIn = fetch(API_URL + "loggedIn", {credentials: "include"})
    const profileInfo = fetch(API_URL + "me", {credentials: "include"})
        .then(res => res.json())
    
    


</script>


<nav>
    <a href="/#/">Home</a>
    <a href="/#/play">play</a>
    <a href="/#/about">about</a>
    <div id=profileInfo>
        {#await loggedIn}
            checking if logged in
        {:then status}
            {#if status}
                {#await profileInfo}
                    getting profile info
                {:then profile}
                    <img src={profile.avatar_url} alt={profile.username}>
                {/await}
            {:else}
                not logged in
            {/if}
        {/await}
    </div>
</nav>


<style>
    nav {
        display: flex;
        gap: 5vw;
    }
    a {
        font-size: 2rem;
    }
    nav {
        position: fixed;
        width: fit-content;
        top: 5vh;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>