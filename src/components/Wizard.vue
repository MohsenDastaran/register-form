<template>
	<div
		class="container w-full max-w-[940px] h-full md:h-2/3 bg-white rounded-xl shadow-lg transition-all duration-500 ease-in-out flex flex-col md:flex-row"
		:style="{ backgroundColor: containerBackgroundColor }"
	>
		<div
			class="stepper w-full md:w-[280px] flex-1 md:flex-[0.3] h-full relative transition-all duration-300 ease-in-out"
		>
			<div class="flex flex-row md:flex-col gap-4 md:gap-8 h-full">
				<!-- Responsive gap and padding -->
				<div
					v-for="step in stepList"
					:key="step.id"
					class="cursor-pointer transition-colors duration-200 ease-in-out flex-1 flex items-center md:justify-start p-2"
					:class="{ 'bg-blue-300 rounded-md border': isActiveStep(step.id) }"
					@click="changeStep(step.id)"
				>
					<div class="flex items-center gap-2">
						<div
							:class="`step-circle w-6 h-6 md:w-8 md:h-8 rounded-full border ${
								isActiveStep(step.id) ? 'bg-blue-500' : 'bg-white'
							} transition-colors duration-300`"
						>
							<div
								class="w-full h-full flex justify-center items-center text-xs md:text-sm"
								:class="{
									'text-white font-bold': isActiveStep(step.id),
									'text-gray-700 font-medium': !isActiveStep(step.id),
								}"
							>
								{{ step.id }}
							</div>
						</div>
						<div>
							<div
								class="step-label text-xs text-gray-500 uppercase transition-colors duration-300"
							>
								Step {{ step.id }}
							</div>
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

		<div class="m-2 ml-5 content-area flex-1 transition-all duration-500">
			<!-- Smooth transitions and responsive padding -->
			<transition name="fade" mode="out-in" appear>
				<div
					class="content rounded-2xl shadow-lg bg-white px-4 flex flex-col justify-between w-full h-full transition-transform duration-500"
					:key="currentStep"
				>
					<!-- Responsive layout for different step components -->
					<StepOneComponent v-if="currentStep === 1" @change-step="changeStep" />
					<StepTwoComponent v-if="currentStep === 2" @change-step="changeStep" />
					<StepThreeComponent v-if="currentStep === 3" @change-step="changeStep" />
					<ConfirmComponent v-if="currentStep === 0" />
				</div>
			</transition>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import StepOneComponent from "./StepOneComponent.vue";
import StepTwoComponent from "./StepTwoComponent.vue";
import StepThreeComponent from "./StepThreeComponent.vue";
import ConfirmComponent from "./ConfirmComponent.vue";

const currentStep = ref(1);

const stepList = [
	{ id: 1, title: "Your Info" },
	{ id: 2, title: "Select Plan" },
	{ id: 3, title: "Add-Ons" },
];

const changeStep = (step: number) => {
	currentStep.value = step;
};

const isActiveStep = (stepId: number): boolean => currentStep.value === stepId;

const containerBackgroundColor = computed(() => {
	switch (currentStep.value) {
		case 1:
			return "#E3F2FD"; // Light blue
		case 2:
			return "#FFECB3"; // Light yellow
		case 3:
			return "#C8E6C9"; // Light green
		default:
			return "#FFFFFF"; // Default white
	}
});
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
</style>
