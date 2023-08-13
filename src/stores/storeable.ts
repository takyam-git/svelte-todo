import { get, writable } from 'svelte/store';

export function storable<T>(localStorageKey: string, initialData: T) {
	const store = writable(initialData);
	const { subscribe, set, update } = store;
	const isBrowser = typeof window !== 'undefined';

	const storedData = isBrowser ? localStorage.getItem(localStorageKey) : null;
	if (storedData !== null) {
		set(JSON.parse(storedData));
	}

	const saveSet = (value: T) => {
		if (isBrowser) {
			localStorage.setItem(localStorageKey, JSON.stringify(value));
		}
		set(value);
	};

	return {
		subscribe,
		set: saveSet,
		update: (callback: (current: T) => T) => {
			saveSet(callback(get(store)));
		}
	};
}
