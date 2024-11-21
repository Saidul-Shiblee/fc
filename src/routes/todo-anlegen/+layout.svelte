<script>
	import Header from '$lib/components/header.svelte';
	import '../../app.css';

	const { children } = $props();
</script>

<div class="container">
	<Header title="Aufgabe anlegen" />

	{@render children()}
</div>
