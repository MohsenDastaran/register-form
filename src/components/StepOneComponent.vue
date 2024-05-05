<template>
	<div
		class="container flex flex-col justify-between w-full h-full transition-all duration-500 ease-in-out"
	>
		<div class="header">
			<h1 class="title text-2xl md:text-4xl font-bold text-primary mb-2">
				Personal Details
			</h1>
			<p class="description text-base text-muted mb-6">
				Please enter your name, email, and phone number.
			</p>
		</div>

		<div class="form">
			<!-- Name Input -->
			<div class="form-group mb-6 transition-all duration-300 ease-in-out">
				<div
					class="label-container flex justify-between items-center mb-0.5 md:mb-2"
				>
					<label class="text-xs md:text-sm font-medium text-primary" for="name"
						>Name</label
					>
					<div
						v-if="!userName && showErrors"
						class="error-message text-xs font-bold text-danger"
					>
						Name is required
					</div>
				</div>
				<input
					v-model="userName"
					type="text"
					id="name"
					placeholder="e.g. John Doe"
					class="input-field text-body h-10 md:h-12 px-4 border border-gray-300 rounded w-full outline-none focus:border-primary transition-all"
					:class="{ 'border-danger': !userName && showErrors }"
					@change="updateUserName"
				/>
			</div>

			<!-- Email Input -->
			<div class="form-group mb-6 transition-all duration-300 ease-in-out">
				<div
					class="label-container flex justify-between items-center mb-0.5 md:mb-2"
				>
					<label class="text-xs md:text-sm font-medium text-primary" for="email"
						>Email Address</label
					>
					<div
						v-if="!userEmail && showErrors"
						class="error-message text-xs font-bold text-danger"
					>
						Email is required
					</div>
					<div
						v-if="invalidUserEmail"
						class="error-message text-xs font-bold text-danger"
					>
						Email is invalid
					</div>
				</div>
				<input
					v-model="userEmail"
					type="email"
					id="email"
					placeholder="e.g. john@example.com"
					class="input-field text-body h-10 md:h-12 px-4 border border-gray-300 rounded w-full outline-none focus:border-primary transition-all"
					:class="{ 'border-danger': !userEmail && showErrors }"
					@change="updateUserEmail"
				/>
			</div>

			<!-- Phone Input -->
			<div class="form-group mb-0 transition-all duration-300 ease-in-out">
				<div
					class="label-container flex justify-between items-center mb-0.5 md:mb-2"
				>
					<label class="text-xs md:text-sm font-medium text-primary" for="phone"
						>Phone Number</label
					>
					<div
						v-if="!userPhone && showErrors"
						class="error-message text-xs font-bold text-danger"
					>
						Phone is required
					</div>
				</div>
				<input
					v-model="userPhone"
					type="tel"
					id="phone"
					placeholder="e.g. +1 234 567 890"
					class="input-field text-body h-10 md:h-12 px-4 border border-gray-300 rounded w-full outline-none focus:border-primary transition-all"
					:class="{ 'border-danger': !userPhone && showErrors }"
					@change="updateUserPhone"
				/>
			</div>
		</div>

		<!-- Next Step Button -->
		<div
			class="footer flex justify-end w-full transition-all duration-300 ease-in-out"
		>
			<button
				class="button text-sm md:text-base px-4 md:px-6 bg-primary text-white rounded md:rounded-lg"
				@click="validateForm"
			>
				Next Step
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { isValidEmail } from "@/utils/validator";
import { useSubscriptionStore } from "@/stores/subscription";

const userName = ref("");
const userEmail = ref("");
const userPhone = ref("");
const showErrors = ref(false);
const invalidUserEmail = ref(false);

const emit = defineEmits(["change-step"]);

const updateUserName = () => {
	useSubscriptionStore().setName(userName.value);
};

const updateUserEmail = () => {
	useSubscriptionStore().setEmail(userEmail.value);
};

const updateUserPhone = () => {
	useSubscriptionStore().setPhone(userPhone.value);
};

const validateForm = () => {
	userName.value =
		typeof userName.value === "string" && userName.value.trim().length > 0
			? userName.value
			: "";
	userEmail.value =
		typeof userEmail.value === "string" && userEmail.value.trim().length > 0
			? userEmail.value
			: "";
	userPhone.value =
		typeof userPhone.value === "string" && userPhone.value.trim().length >= 10
			? userPhone.value
			: "";

	if (userName.value && userEmail.value && userPhone.value) {
		if (isValidEmail(userEmail.value)) {
			invalidUserEmail.value = false;
			emit("change-step", 2);
		} else {
			invalidUserEmail.value = true;
		}
	} else {
		showErrors.value = true;
	}
};
</script>

<style scoped>
.container {
	padding: 16px;
}

.header {
	transition: opacity 0.3s ease-in-out;
}

.form {
	transition: all 0.3s ease-in-out;
}

.input-field {
	transition: border 0.3s ease-in-out;
}

.button {
	transition: background-color 0.3s ease-in-out;
}

.button:hover {
	background-color: #003366;
}

.error-message {
	transition: opacity 0.3s ease-in-out;
}

.label-container {
	transition: all 0.3s ease-in-out;
}

.form-group {
	transition: all 0.3s ease-in-out;
}
</style>
