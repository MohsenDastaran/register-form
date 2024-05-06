export const isValidEmail = (email: string): boolean =>
	/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const isValidUsername = (username: string): boolean => {
	if (username.length < 3) {
		return false;
	} else return true;
};
