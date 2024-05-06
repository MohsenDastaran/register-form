import { defineStore } from "pinia";

interface FormType {
	username: string;
	email: string;
	description: string;
}

export const useFormStore = defineStore("form", {
	state: (): FormType => ({
		username: "",
		email: "",
		description: "",
	}),
	actions: {
		setUsername(username: string) {
			this.username = username;
		},
		setEmail(email: string) {
			this.email = email;
		},
		setDescription(description: string) {
			this.description = description;
			console.log(this.description);
		},
	},
});
