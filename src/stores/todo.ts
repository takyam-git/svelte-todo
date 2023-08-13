import { storable } from './storeable';

export type TODO = {
	title: string;
	createdAt: Date;
};

export const todos = storable<TODO[]>('todos', []);

export const addNewTodo = (title: string) =>
	todos.update((list) => [...list, { title, createdAt: new Date() }]);
