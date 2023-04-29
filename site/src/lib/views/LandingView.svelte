<script>
    const API_URL = import.meta.env.VITE_API_URL

    function handleClick() {
        alert("not implemented :(")
    }

</script>


<main>
    <h1>
        landing page
    </h1>
    <a href={API_URL+'auth'}>
        <button>
            Log in to Osu!
        </button>
    </a>
    <button on:click={handleClick}>
        Play as guest
    </button>
    
</main>
