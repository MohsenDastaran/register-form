import { longStackTraces } from "cypress/types/bluebird";

export const isValidEmail = (email: string): boolean =>
	/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const isValidUsername = (username: string): boolean => {
	const minLength = 3; // Minimum length for a valid username
	const validPattern = /^[a-zA-Z0-9_-]+$/; // Only allows letters, numbers, underscores, or hyphens

	// Check if the username is at least the minimum length
	if (username.length <= minLength) {
		return false;
	}

	// Check if the username contains only valid characters
	if (!validPattern.test(username)) {
		return false;
	}

	return true; // If it passes all checks, it's valid
};
