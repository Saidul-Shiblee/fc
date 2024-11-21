<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import type { Todo } from '../../model';
	import { addTodo } from '../../store/+todo.store';
	import { showToast } from '../../store/toast.store';

	const todo: Todo = $state({ title: '', description: '', completed: false, selected: false });

	const fields = [
		{ name: 'title', placeholder: 'Titel eingeben', type: 'text' },
		{ name: 'description', placeholder: 'Beschreibung hinzufügen', type: 'text' },
		{ name: 'deadline', placeholder: 'Fälligkeitsdatum', type: 'date' }
	];

	function submit(): void {
		showToast('Formular erfolgreich abgeschickt!');
		addTodo(todo);
	}
</script>

<div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
	<form class="mx-auto mt-4 max-w-md space-y-4">
		{#each fields as field}
			<div>
				<label for={field.name} class="sr-only">{field.placeholder}</label>
				<div class="relative">
					<input
						type={field.type}
						name={field.name}
						class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
						placeholder={field.placeholder}
						bind:value={todo[field.name as keyof Todo]}
					/>
				</div>
			</div>
		{/each}

		<div class="flex items-center justify-between">
			<Button
				label="Aufgabe anlegen"
				type="button"
				disabled={!todo.title || !todo.description}
				onclick={submit}
			/>
		</div>
	</form>
</div>
