const useLocalStorage = () => {
	const setItem = (name, value) => {
		localStorage.setItem(name, value);
	};

	const getItem = (name) => {
		try {
			return localStorage.getItem(name);;
		} catch {
			return null;
		}
	};

	const removeItem = (name) => {
		localStorage.removeItem(name);
	};

	const clear = () => {
		localStorage.clear();
	};

	return { setItem, getItem, removeItem, clear };
};

export default useLocalStorage;
