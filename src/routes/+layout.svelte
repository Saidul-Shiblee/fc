<script>
	import Nav from '$lib/components/nav.svelte';
	import '../app.css';

	const { children } = $props();
</script>

<div class="flex h-screen flex-col justify-between">
	{@render children()}

	<Nav />
</div>
