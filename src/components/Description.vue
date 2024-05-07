<template>
	<div>
		<input
			id="description"
			v-model="description"
			@input="onInputChange"
			placeholder="Enter your description here..."
		/>
		<p>{{ message }}</p>
	</div>
</template>

<script>
export default {
	data() {
		return {
			description: "", // Reactive variable for the input
			message: "", // Message for the user
			debounceTimer: null, // Timer to manage debouncing
		};
	},
	methods: {
		// Function to check if the text has balanced special characters
		isBalanced(text) {
			const stack = [];
			const pairs = {
				"(": ")",
				"[": "]",
				"{": "}",
			};

			for (const char of text) {
				if (char in pairs) {
					stack.push(char);
				} else if (Object.values(pairs).includes(char)) {
					const expectedOpen = Object.keys(pairs).find((key) => pairs[key] === char);
					const lastOpen = stack.pop();
					if (lastOpen !== expectedOpen) {
						return false;
					}
				}
			}

			return stack.length === 0; // Text is balanced if stack is empty
		},

		// Debounced method to update the message based on balance status
		checkBalance() {
			const balanced = this.isBalanced(this.description);
			this.message = balanced
				? "The text is balanced."
				: "The text is not balanced.";
		},

		// Handler for the input event with debounce logic
		onInputChange() {
			// Clear any existing debounce timer
			if (this.debounceTimer) {
				clearTimeout(this.debounceTimer);
			}

			// Set a new timer to call checkBalance after 1 second
			this.debounceTimer = setTimeout(() => {
				this.checkBalance();
			}, 1000); // 1-second debounce
		},
	},
};
</script>
<style scoped>
input {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
	outline: none;
	transition: all 0.3s ease;
}

input:focus {
	border-color: #3b82f6; /* Tailwind's blue-500 color */
}
</style>
