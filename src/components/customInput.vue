<template>
	<div class="input-container">
		<label :class="{ 'has-content': textValue }" :for="name" class="input-label">
			{{ label }}
		</label>
		<input
			:id="name"
			:name="name"
			type="text"
			v-model="textValue"
			@focus="onFocus"
			@blur="onBlur"
			class="input-field"
		/>
		<transition name="highlight">
			<div v-if="isFocused" class="highlight-line"></div>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isFocused = ref(false);

defineProps({
	label: String,
	name: String,
});

const textValue = defineModel();

function onFocus() {
	isFocused.value = true;
}

function onBlur() {
	isFocused.value = Boolean(textValue.value);
}
</script>

<style scoped>
.input-container {
	position: relative;
	margin: 1rem 0;
	transition: all 0.3s ease;
}

.input-field {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	outline: none;
	transition: all 0.3s ease;
}

.input-field:focus {
	border-color: #3b82f6; /* Tailwind's blue-500 color */
}

.input-label {
	position: absolute;
	top: 50%;
	left: 0.5rem;
	transform: translateY(-50%);
	transition: all 0.3s ease;
	color: #666;
}

.input-label.has-content,
.input-label:focus {
	top: -1rem;
	font-size: 0.8rem;
	color: #010c1c;
}

.highlight-line {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 2px;
	transform: scaleX(0);
	transform-origin: left;
	transition: transform 0.3s ease;
}

.highlight-enter-active {
	transform: scaleX(1);
}

.highlight-leave-active {
	transform: scaleX(0);
}
</style>
