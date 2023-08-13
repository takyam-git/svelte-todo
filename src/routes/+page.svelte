<script lang="ts">
	import dayjs from 'dayjs';
	import type { FormEventHandler } from 'svelte/elements';
	import type { TODO } from '../stores/todo';
	import { todos, addNewTodo, removeTodo } from '../stores/todo';
	import { onMount } from 'svelte';

	let input: HTMLInputElement | null = null;

	let newTodo = '';
	const onSubmitForm: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		event.stopPropagation();
		if (newTodo.trim() === '') {
			return;
		}
		addNewTodo(newTodo);
		newTodo = '';
	};

	let reversed: (TODO & { index: number })[];
	$: reversed = [...$todos].map((todo, index) => ({ ...todo, index })).reverse();

	onMount(() => {
		if (input) {
			input.focus();
		}
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<form class="todo-form" on:submit={onSubmitForm}>
		<input class="input-text" bind:value={newTodo} bind:this={input} />
		<button type="submit">save new TODO</button>
	</form>
	<ul class="todos">
		{#each reversed as todo}
			<li class="todo">
				<p class="title">{todo.title}</p>
				<p class="created-at">{dayjs(todo.createdAt).format('YYYY/MM/DD HH:mm:ss')}</p>
				<button class="remove" on:click={() => removeTodo(todo.index)}>X</button>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	.todos {
		max-width: 80%;

		.todo {
			list-style: none;
			display: flex;
			align-items: center;
			gap: 10px;

			p {
				margin: 0.2rem;

				&.title {
					flex: 1;
				}

				&.created-at {
					flex: 0 0 auto;
				}
			}

			.remove {
				flex: 0 0 auto;
				display: inline;
			}
		}
	}
</style>
