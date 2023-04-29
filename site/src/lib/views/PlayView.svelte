<script>
// check if logged in
const API_URL = import.meta.env.VITE_API_URL
const loggedIn = fetch(API_URL + "loggedIn", {
    credentials: "include"
})

</script>

<h1>
    play view
</h1>

{#await loggedIn} 
    checking if logged in...
{:then loggedInStatus}
    {#if loggedInStatus}
        logged in
    {:else}
        not logged in
    {/if}
{/await}
