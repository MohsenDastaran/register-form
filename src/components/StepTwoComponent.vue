

<template>
  <div class="flex flex-col justify-between w-full h-full">
    <div class="w-full">
      <div
        class="text-2xl md:text-4xl brand-bold text-brand-marine-blue mb-2 md:mb-3"
      >
        Select your plan
      </div>
      <div class="text-body brand-regular text-brand-cool-gray mb-9">
        You have the option of monthly or yearly billing.
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div
          v-for="plan in plans"
          :key="plan.id"
          :class="`w-full cursor-pointer border ${
            activePlan === plan.id
              ? 'border-brand-marine-blue bg-brand-magnolia'
              : 'border-brand-light-gray'
          } rounded-lg px-4 py-4 md:py-5`"
          @click="switchPlan(plan.id)"
        >
          <div class="w-full flex items-start md:flex-col gap-4 md:gap-10">
            <img
              :src="`/images/${plan.icon}`"
              :alt="plan.name"
              class="w-[40px]"
            />
            <div>
              <div
                class="text-body brand-medium text-brand-marine-blue capitalize"
              >
                {{ plan.name }}
              </div>
              <div
                v-if="billing === 'monthly'"
                class="text-sm brand-regular text-brand-cool-gray"
              >
                ${{ plan.price }}/mo
              </div>
              <div
                v-if="billing === 'yearly'"
                class="text-sm brand-regular text-brand-cool-gray mb-1"
              >
                ${{ plan.price * 10 }}/yr
              </div>
              <div
                v-if="billing === 'yearly'"
                class="text-sm brand-regular text-brand-marine-blue"
              >
                2 months free
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center items-center gap-6 w-full h-12 rounded-lg bg-brand-alabaster"
      >
        <div
          :class="`brand-regular capitalize brand-medium ${
            billing === 'monthly'
              ? 'text-brand-marine-blue '
              : 'text-brand-cool-gray'
          }`"
        >
          monthly
        </div>
        <button
          class="flex w-[40px] h-5 bg-brand-marine-blue rounded-full relative p-1"
          @click="switchBilling"
        >
          <div
            :class="`h-3 aspect-square rounded-full bg-brand-white transition-all duration-200 ease-in-out absolute top-1 ${
              billing === 'monthly' ? 'left-1' : 'left-6'
            }`"
          ></div>
        </button>
        <div
          :class="`brand-regular capitalize brand-medium ${
            billing === 'yearly'
              ? 'text-brand-marine-blue'
              : 'text-brand-cool-gray'
          }`"
        >
          yearly
        </div>
      </div>
    </div>
    <div
      class="flex justify-between items-center w-full absolute bottom-[-146px] right-0 pb-4 md:static"
    >
      <button
        class="text-sm md:text-body capitalize brand-medium text-brand-cool-gray"
        @click="$emit('change-step', 1)"
      >
        go back
      </button>
      <button
        class="h-10 md:h-12 px-4 md:px-6 capitalize brand-regular text-sm md:text-body text-brand-alabaster bg-brand-marine-blue rounded md:rounded-lg"
        @click="$emit('change-step', 3)"
      >
        next step
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useSubscriptionStore } from '@/stores/subscription'
import { computed } from '@vue/reactivity'

const activePlan = computed(() => useSubscriptionStore().plan)
const billing = computed(() => useSubscriptionStore().billing)

defineEmits(['change-step'])

const plans = [
  {
    id: 1,
    name: 'arcade',
    icon: 'icon-arcade.svg',
    price: 9,
  },
  {
    id: 2,
    name: 'advanced',
    icon: 'icon-advanced.svg',
    price: 12,
  },
  {
    id: 3,
    name: 'pro',
    icon: 'icon-pro.svg',
    price: 15,
  },
]

const switchBilling = () => {
  if (billing.value === 'monthly') {
    useSubscriptionStore().setBilling('yearly')
  } else {
    useSubscriptionStore().setBilling('monthly')
  }
}

const switchPlan = (planId: number) => {
  useSubscriptionStore().setPlan(planId)
}
</script>
