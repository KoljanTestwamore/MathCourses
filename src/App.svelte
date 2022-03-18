<script lang="ts">
	import Footer from './components/Footer.svelte';
	import Header from './components/Header.svelte';
	import Landing from './components/Landing.svelte';
</script>

<main>
	<Header />
	<Landing />
	<Footer />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>