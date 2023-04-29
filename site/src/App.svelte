<script>
  import Router, {location, link} from 'svelte-spa-router';
  import LandingView from './lib/views/LandingView.svelte';
  import PlayView from './lib/views/PlayView.svelte';
  import AboutView from './lib/views/AboutView.svelte';
  import Footer from './lib/Footer.svelte';
  import Navbar from './lib/Navbar.svelte';
  
  const routes={
    '/': LandingView,
    '/about': AboutView,
    '/play': PlayView
  }
</script>

<Navbar/>


<Router {routes}} />

<Footer/>

<style>
</style>
