<script setup>
import Wizard from "@/components/Wizard.vue";
</script>

<template>
	<div
		class="animated-header w-full h-screen bg-gray-100 transition-colors duration-500 ease-in-out flex justify-center items-center p-4"
	>
		<Wizard />
	</div>
</template>
<style scoped>
@keyframes changeBackground {
	0% {
		background-color: #486ccda6; /* Deep blue */
	}
	20% {
		background-color: #2d4179a6; /* Deep blue */
	}
	40% {
		background-color: #274492a6; /* Lighter blue */
	}
	50% {
		background-color: #5f7ac6a6; /* Light green */
	}
	75% {
		background-color: #479db72c; /* Yellow */
	}
	100% {
		background-color: #486ccda6; /* Deep blue (cycle back) */
	}
}

.animated-header {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	background-size: cover; /* Ensures the background spans the whole area */
	animation: changeBackground 40s infinite; /* Animation that changes background color over time */
	transition: all 1s ease-in-out; /* Smooth transition */
}
</style>
