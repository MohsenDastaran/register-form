<template>
	<div v-if="errorMessage" class="error-description">
		{{ errorMessage }}
	</div>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { computed } from "vue";
const errorMessage = computed(() => useFormStore()?.description);
</script>

<style scoped>
.error-description {
	color: red;
	font-size: 0.9rem;
	font-weight: bold;
	margin-top: 0.5rem;
	padding: 0.5rem;
	background-color: rgba(255, 0, 0, 0.1);
	border: 1px solid red;
	border-radius: 4px;
}
</style>
