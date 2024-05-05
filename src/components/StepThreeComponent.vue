<script setup lang="ts">
import { useSubscriptionStore } from '@/stores/subscription'

defineEmits(['change-step'])

const addOns = [
  {
    id: 1,
    name: 'Online service',
    description: 'Access to multiplayer games',
    price: 1,
  },
  {
    id: 2,
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    price: 2,
  },
  {
    id: 3,
    name: 'Customizable profile',
    description: 'Custom theme on your profile',
    price: 2,
  },
]

const toggleAddOn = (id: number) => {
  if (!useSubscriptionStore().addOnExist(id)) {
    useSubscriptionStore().pushAddOn(addOns[id - 1])
  } else {
    useSubscriptionStore().removeAddOn(id)
  }
}
</script>

<template>
  <div class="flex flex-col justify-between w-full h-full">
    <div class="w-full">
      <div
        class="text-2xl md:text-4xl brand-bold text-brand-marine-blue mb-2 md:mb-3"
      >
        Pick add-ons
      </div>
      <div class="text-body brand-regular text-brand-cool-gray mb-6 md:mb-9">
        Add-ons help enhance your gaming experience.
      </div>
      <div class="w-full flex flex-col gap-3 md:gap-4">
        <div
          v-for="addOn in addOns"
          :key="addOn.id"
          :class="`w-full rounded-lg border cursor-pointer p-3 md:p-5 ${
            useSubscriptionStore().addOnExist(addOn.id)
              ? 'border-brand-purplish-blue bg-brand-magnolia'
              : 'border-brand-light-gray'
          }`"
          @click="toggleAddOn(addOn.id)"
        >
          <div class="w-full flex items-center justify-between">
            <div class="flex items-center gap-5">
              <div
                :class="`w-5 h-5 rounded border border-brand-light-gray ${
                  useSubscriptionStore().addOnExist(addOn.id) &&
                  'bg-brand-purplish-blue'
                }`"
              >
                <div
                  class="w-full h-full flex justify-center text-center text-brand-white text-sm brand-bold"
                >
                  &check;
                </div>
              </div>
              <div>
                <div
                  class="text-sm md:text-body brand-bold text-brand-marine-blue mb-0.5"
                >
                  {{ addOn.name }}
                </div>
                <div
                  class="text-xs md:text-sm brand-regular text-brand-cool-gray"
                >
                  {{ addOn.description }}
                </div>
              </div>
            </div>
            <div
              v-if="useSubscriptionStore().billing === 'monthly'"
              class="text-xs md:text-sm brand-medium text-brand-purplish-blue"
            >
              +${{ addOn.price }}/mo
            </div>
            <div
              v-if="useSubscriptionStore().billing === 'yearly'"
              class="text-xs md:text-sm brand-medium text-brand-purplish-blue"
            >
              +${{ addOn.price * 10 }}/yr
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex justify-between items-center w-full absolute bottom-[-136px] right-0 md:static"
    >
      <button
        class="text-sm md:text-body capitalize brand-medium text-brand-cool-gray"
        @click="$emit('change-step', 2)"
      >
        go back
      </button>
      <button
        class="h-10 md:h-12 px-4 md:px-6 capitalize brand-regular text-sm md:text-body text-brand-alabaster bg-brand-marine-blue rounded md:rounded-lg"
        @click="$emit('change-step', 4)"
      >
        next step
      </button>
    </div>
  </div>
</template>
