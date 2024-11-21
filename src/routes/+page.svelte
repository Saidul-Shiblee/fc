<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import TodoList from '$lib/components/todoList.svelte';

	const completed = false;
</script>

<div>
	<Header title="Offene Aufgaben" showSearch={true} />

	<TodoList {completed} />
</div>

<style>
</style>
