import { storable } from './storeable';

export type TODO = {
	title: string;
	createdAt: Date;
};

export const todos = storable<TODO[]>('todos', []);

export const addNewTodo = (title: string) =>
	todos.update((list) => [...list, { title, createdAt: new Date() }]);

export const removeTodo = (index: number) =>
	todos.update((list) => {
		console.log(list, index);
		const newList = [...list];
		newList.splice(index, 1);
		return newList;
	});
