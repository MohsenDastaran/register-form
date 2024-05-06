import { defineStore } from "pinia";

interface StateType {
	username: string;
	email: string;
}

export const formStore = defineStore("form", {
	state: (): StateType => ({
		username: "",
		email: "",
	}),
	actions: {
		setUserName(username: string) {
			this.username = username;
		},
		setEmail(email: string) {
			this.email = email;
		},
	},
});
