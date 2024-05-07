<template>
	<customInput
		@update:model-value="setUsername($event)"
		label="Username"
		name="username"
	/>
</template>

<script setup lang="ts">
import customInput from "@/components/customInput.vue";
import useFormStore from "@/stores/form";
import { isValidUsername } from "@/utils/validator";

useFormStore?.setDescription("Invalid Username.");
const setUsername = (username: string) => {
	if (isValidUsername(username)) {
		useFormStore.setUsername(username);
		useFormStore?.setDescription(null);
	} else {
		useFormStore.setUsername("");
		useFormStore?.setDescription("Invalid Username.");
	}
};
</script>
