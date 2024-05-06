<template>
	<customInput
		@update:model-value="setUsername($event)"
		label="Username"
		name="username"
	/>
</template>

<script setup lang="ts">
import customInput from "@/components/customInput.vue";
import { useFormStore } from "@/stores/form";
import { isValidUsername } from "@/utils/validator";
const setUsername = (username: string) => {
	if (isValidUsername(username)) {
		useFormStore()?.setUsername(username);
	} else {
		console.log("Invalid Username.");

		useFormStore()?.setDescription("Invalid Username.");
	}
};
</script>
