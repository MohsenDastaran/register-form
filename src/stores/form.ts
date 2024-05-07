import { reactive, toRefs } from "vue";

// Define a reactive object to represent your form state
const formState = reactive({
	username: "",
	email: "",
	description: "",
});

// Functions to manipulate the state
const setUsername = (username: string) => {
	formState.username = username;
};

const setEmail = (email: string) => {
	formState.email = email;
};

const setDescription = (description: string) => {
	formState.description = description;
};

// Expose the state and action functions as required
const { username, email, description } = toRefs(formState);

// The exported module exposes the state and action methods
export default {
	formState,

	setUsername,
	setEmail,
	setDescription,
};
