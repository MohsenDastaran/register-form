<template>
	<div
		class="container w-full max-w-[940px] h-full md:h-2/3 bg-white rounded-xl shadow-lg transition-all duration-500 ease-in-out flex flex-col md:flex-row"
		:style="{ backgroundColor: currentComponent.backgroundColor }"
	>
		<div
			class="stepper w-full md:w-[280px] flex-1 md:flex-[0.3] h-full relative transition-all duration-300 ease-in-out"
		>
			<div class="flex flex-col gap-4 md:gap-8 h-full p-2">
				<!-- Responsive gap and padding -->
				<div
					v-for="step in stepList"
					:key="step.id"
					class="transition-colors duration-200 ease-in-out flex-1 flex items-center justify-center md:justify-start p-2"
				>
					<div class="flex items-center gap-2">
						<div class="transition-colors duration-300">
							<div
								class="step-number h-full flex justify-center items-center text-xs md:text-sm font-medium text-gray-700"
								:class="{ 'step-number-active': currentStep === step.id }"
							>
								{{ step.id }}
							</div>
						</div>
						<div>
							<div
								class="step-title text-sm font-bold text-gray-900 uppercase transition-colors duration-300"
							>
								{{ step.title }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex-1 transition-all duration-500">
			<!-- Smooth transitions and responsive padding -->
			<transition name="fade" mode="out-in" appear>
				<div
					class="content rounded-2xl shadow-lg bg-white px-4 flex flex-col justify-between w-full h-full transition-transform duration-500"
					:key="currentStep"
				>
					<div
						class="container flex flex-col justify-between w-full h-full transition-all duration-500 ease-in-out"
					>
						<div class="header">
							<h1 class="title text-2xl md:text-4xl font-bold text-primary mb-2">
								Step: {{ currentComponent.title }}
							</h1>
							<p class="description text-base text-muted mb-6">
								{{ currentComponent.description }}
							</p>
						</div>
						<component
							:key="currentStep"
							:is="currentComponent.component"
							@edit="currentStep = 1"
						/>
						<ErrorMessage />
						<Description />
						<div class="flex justify-between items-center w-full pb-4 md:static">
							<button
								:class="{ disabled: currentStep === 1 }"
								:disabled="currentStep === 1"
								class="text-sm md:text-body capitalize brand-medium text-emerald-700 font-semibold"
								@click="currentStep !== 1 && currentStep--"
								id="btn-prev"
							>
								previous
							</button>
							<button
								:class="{
									'disabled bg-neutral-400':
										currentStep === 3 || Boolean(useFormStore.formState.description),
								}"
								:disabled="currentStep === 3"
								class="h-10 md:h-12 px-4 md:px-6 capitalize brand-regular text-sm md:text-body text-brand-alabaster bg-emerald-700 rounded md:rounded-lg"
								@click="
									currentStep !== 3 &&
										!Boolean(useFormStore.formState.description) &&
										currentStep++
								"
								id="btn-next"
							>
								{{ useFormStore.formState.description || "next" }}
							</button>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import usernameComponent from "../views/usernameComponent.vue";
import emailComponent from "../views/emailComponent.vue";
import reviewComponent from "@/views/review.vue";
// import Description from "./Description.vue";
import useFormStore from "@/stores/form";
import ErrorMessage from "./errorMessage.vue";
import Description from "./Description.vue";

const currentStep = ref(1);
const currentComponent = computed(() => {
	return stepList.find((step) => step.id === currentStep.value);
});
const stepList = [
	{
		id: 1,
		title: "Username",
		description: "Please enter your Username:",
		component: usernameComponent,
		backgroundColor: "#E3F2FD",
	}, // Light blue
	{
		id: 2,
		title: "Email",
		description: "Please enter your Email:",
		component: emailComponent,
		backgroundColor: "#C8E6C9",
	}, // Light green
	{
		id: 3,
		title: "Review",
		description: "Step: review",
		component: reviewComponent,
		backgroundColor: "#FFECB3",
	}, // Light yellow
];

const changeStep = (step: number) => {
	currentStep.value = step;
};
</script>

<style scoped>
.container {
	padding: 16px;
	background-color: white;
}

.step-circle {
	border: 2px solid #ccc;
	transition: border-color 0.3s ease-in-out;
}

.step-circle:hover {
	border-color: #888;
}

.content-area {
	transition: all 0.3s ease-in-out;
}

.step-label,
.step-title {
	transition: color 0.3s ease-in-out;
}
.step-title {
	margin-left: 30px;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0.3;
	translate: -10px 0;
}

@media (max-width: 768px) {
	.stepper {
		flex-direction: row; /* Horizontal layout for stepper on smaller screens */
	}

	.step-circle {
		width: 6px;
		height: 6px;
	}

	.content-area {
		padding: 8px;
	}
}
.step-number {
	scale: 10;
	translate: 5px;
	opacity: 50%;
	width: 35px;
	transition: all 0.3s;
}
.step-number-active {
	opacity: 80%;
}
button.disabled {
	color: #010101;
	cursor: not-allowed;
}
</style>
