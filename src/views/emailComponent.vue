<template>
	<customInput
		label="Email"
		name="email"
		@update:model-value="setEmail($event)"
	/>
</template>

<script setup lang="ts">
import customInput from "@/components/customInput.vue";
import { useFormStore } from "@/stores/form";
import { isValidEmail } from "@/utils/validator";

const setEmail = (email: string) => {
	if (isValidEmail(email)) {
		useFormStore()?.setEmail(email);
	} else {
		console.log("Invalid email");
	}
};
</script>

<style scoped></style>
