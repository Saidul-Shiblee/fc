<script>
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';
	import { closeSelectedTodos, TodosStore } from '../../store/+todo.store';

	const selected = derived(TodosStore, (store) => store.open.some((todo) => todo.selected));
</script>

<div class="sticky bottom-0 w-full pt-5">
	<div class="mx-auto w-full">
		<div class=" bg-white px-7 shadow-lg">
			<div class="flex">
				<div class="group flex-1">
					<a
						href="{base}/"
						class="mx-auto flex w-full items-end justify-center border-b-2 border-transparent px-4 pt-2 text-center text-gray-500"
					>
						<span class="block px-1 pb-2 pt-1">
							<i class="far fa-list mb-1 block pt-1 text-2xl"></i>
							<span class="block pb-1 text-xs">Offen</span>
						</span>
					</a>
				</div>
				{#if $page.route.id === '/'}
					<div class="group m-auto flex-1">
						<button
							class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-700 text-white disabled:bg-blue-500"
							aria-label="Check"
							disabled={!$selected}
							onclick={() => closeSelectedTodos()}
						>
							<i class="fas fa-check"></i>
						</button>
					</div>
				{/if}

				<div class="group flex-1">
					<a
						href="{base}/abgeschlossen"
						class="mx-auto flex w-full items-end justify-center border-b-2 border-transparent px-4 pt-2 text-center text-gray-500"
					>
						<span class="block px-1 pb-2 pt-1">
							<i class="fas fa-clipboard-check mb-1 block pt-1 text-2xl"></i>
							<span class="block pb-1 text-xs">Abgeschlossen</span>
						</span>
					</a>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@import url(https://pro.fontawesome.com/releases/v5.10.0/css/all.css);
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;800&display=swap');
</style>
