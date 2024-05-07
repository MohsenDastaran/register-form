<template>
	<customInput
		label="Email"
		name="email"
		@update:model-value="setEmail($event)"
	/>
</template>

<script setup lang="ts">
import customInput from "@/components/customInput.vue";
import useFormStore from "@/stores/form";
import { isValidEmail } from "@/utils/validator";

useFormStore?.setDescription("Invalid email address.");

const setEmail = (email: string) => {
	if (isValidEmail(email)) {
		useFormStore.setEmail(email);
		useFormStore?.setDescription("");
	} else {
		useFormStore.setEmail("");

		useFormStore?.setDescription("Invalid email address.");
	}
};
</script>

<style scoped></style>
