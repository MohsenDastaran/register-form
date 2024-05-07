<template>
	<div class="review-step-container">
		<transition name="fade">
			<div class="review-content">
				<h2>Review Your Information</h2>
				<div class="user-info">
					<div class="info-item">
						<span class="info-value">{{
							`Username: ${useFormStore.formState.username}`
						}}</span>
					</div>
					<div class="info-item">
						<span class="info-value">{{
							`Email: ${useFormStore.formState?.email}`
						}}</span>
					</div>
				</div>
				<div class="action-buttons">
					<button @click="edit">Edit</button>
					<button @click="confirm">Confirm</button>
				</div>
			</div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import useFormStore from "@/stores/form";

const emit = defineEmits(["edit", "confirm"]);

const edit = () => {
	emit("edit");
};

const confirm = () => {
	alert("congratulations! You have confirmed your information!");
};
</script>

<style scoped>
.review-step-container {
	padding: 20px;
	background-color: white;
	border: 1px solid #ccc;
	border-radius: 10px;
	width: 400px;
	margin: 0 auto;
	transition: all 0.3s ease;
}
@media (max-width: 768px) {
	.review-step-container {
		width: 100%;
		margin-bottom: 10px;
	}
}

.review-content {
	text-align: left;
}

.user-info {
	margin-bottom: 20px;
}

.info-item {
	display: flex;
	justify-content: space-between;
	padding: 10px 0;
}

.info-value {
	color: #333;
}
.action-buttons {
	display: flex;
	justify-content: space-between;
}

.action-buttons button {
	padding: 10px 20px;
	border: none;
	border-radius: 5px;
	transition: all 0.3s ease;
}

.action-buttons button:hover {
	background-color: #e0e0e0;
}

.action-buttons button:active {
	background-color: #d0d0d0;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
