import { get, writable } from 'svelte/store';
import axios from 'axios';

export type TODO = {
	id: number;
	title: string;
	body: string;
	createdAt: string;
	updatedAt: string;
};

export const todos = writable<TODO[]>([]);

export const addNewTodo = async (title: string) => {
	await axios.post('/todos', { title, body: '' });
	await fetchAll();
};

export const removeTodo = async (index: number) => {
	const todo = get(todos)[index] ?? null;
	if (!todo) {
		return;
	}
	await axios.delete(`/todos/${todo.id}`);
	await fetchAll();
};

export const fetchAll = async () => {
	const res = await axios.get('/todos');
	todos.set(res.data);
};
