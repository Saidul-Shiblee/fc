import { browser } from '$app/environment';
import { writable, type Writable } from 'svelte/store';
import type { Todo } from '../model';

export class TodoStore {
	open: Todo[] = [];
	completed: Todo[] = [];
}

// Helper function to sync with localStorage
function createPersistedStore(key: string, initialValue: TodoStore): Writable<TodoStore> {
	if (!browser) {
		return writable(new TodoStore());
	}

	const storedValue = localStorage.getItem(key);
	const data = storedValue ? JSON.parse(storedValue) : initialValue;
	const store = writable(data);

	// Subscribe to changes and update localStorage
	store.subscribe((value) => localStorage.setItem(key, JSON.stringify(value)));

	return store;
}

// Initialize the store with default values or values from localStorage
export const TodosStore = createPersistedStore('todos', {
	open: [
		{
			title: 'Einkaufen gehen',
			description: 'Milch, Eier, Brot und Gemüse kaufen',
			completed: false,
			selected: false
		},
		{
			title: 'Bachelorarbeit schreiben',
			description: 'Kapitel über Svelte-Framework fertigstellen',
			completed: false,
			selected: false
		},
		{
			title: 'Fitnessstudio besuchen',
			description: '1 Stunde Ausdauer und Krafttraining',
			completed: false,
			selected: false
		},

		{
			title: 'Einkaufen gehen',
			description: 'Lebensmittel und Haushaltswaren besorgen',
			completed: false,
			selected: false
		},
		{
			title: 'Arzttermin wahrnehmen',
			description: 'Jährliche Gesundheitsuntersuchung',
			completed: false,
			selected: false
		},
		{
			title: 'E-Mails bearbeiten',
			description: 'Alle wichtigen E-Mails durchgehen und beantworten',
			completed: false,
			selected: false
		},
		{
			title: 'Projektbericht schreiben',
			description: 'Fortschrittsbericht für das aktuelle Projekt erstellen',
			completed: false,
			selected: false
		},
		{
			title: 'Wohnung putzen',
			description: 'Staubsaugen und Oberflächen abwischen',
			completed: false,
			selected: false
		},
		{
			title: 'Freunde treffen',
			description: 'Treffen zum Abendessen vereinbaren',
			completed: false,
			selected: false
		},
		{
			title: 'Rechnung bezahlen',
			description: 'Telefon- und Internetrechnung begleichen',
			completed: false,
			selected: false
		},
		{
			title: 'Buch lesen',
			description: 'Kapitel 4 des aktuellen Buches durchlesen',
			completed: false,
			selected: false
		},
		{
			title: 'Joggen gehen',
			description: '30 Minuten joggen im Park',
			completed: false,
			selected: false
		},
		{
			title: 'Familie anrufen',
			description: 'Kurzes Gespräch mit den Eltern führen',
			completed: false,
			selected: false
		}
	],
	completed: []
});

export const SearchStore = writable('');

export function addTodo(todo: Todo): void {
	TodosStore?.update((store) => {
		store.open.push(todo);
		return store;
	});
}

export function toggleTodoCompletion(index: number): void {
	TodosStore?.update((store) => {
		const updatedStore = { ...store };
		updatedStore.open[index].completed = !updatedStore.open[index].completed;
		return updatedStore;
	});
}

export function removeTodo(index: number): void {
	TodosStore?.update((store) => {
		const updatedStore = { ...store };
		updatedStore.open.splice(index, 1);
		return updatedStore;
	});
}

export function selectTodo(todo: Todo): void {
	TodosStore?.update((store) => {
		const storedTodo = store.open.find((t) => todo === t);
		if (storedTodo) {
			storedTodo.selected = !storedTodo.selected;
		}
		const updatedStore = { ...store };
		return updatedStore;
	});
}

export function closeSelectedTodos(): void {
	TodosStore?.update((store) => {
		const updatedStore = { ...store };
		updatedStore.completed = updatedStore.completed.concat(
			updatedStore.open.filter((todo) => todo.selected)
		);
		updatedStore.open = updatedStore.open.filter((todo) => !todo.selected);
		updatedStore.completed.forEach((todo) => (todo.completed = true));

		return updatedStore;
	});
}
