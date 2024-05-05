import { defineStore } from 'pinia'

interface StateType {
  name: string
  email: string
  phone: string
  plan: number
  billing: string
  addOns: AddOnType[]
}

interface AddOnType {
  id: number
  name: string
  description: string
  price: number
}

export const useSubscriptionStore = defineStore('subscription', {
  state: (): StateType => ({
    name: '',
    email: '',
    phone: '',
    plan: 1,
    billing: 'monthly',
    addOns: [],
  }),
  actions: {
    setName(name: string) {
      this.name = name

      return true
    },
    setEmail(email: string) {
      this.email = email

      return true
    },
    setPhone(phone: string) {
      this.phone = phone

      return true
    },
    setPlan(plan: number) {
      this.plan = plan

      return true
    },
    setBilling(billing: string) {
      this.billing = billing

      return true
    },
    pushAddOn(addOn: AddOnType) {
      this.addOns.push(addOn)

      return true
    },
    removeAddOn(id: number) {
      this.addOns = this.addOns.filter((addOn) => addOn.id !== id)

      return true
    },
    addOnExist(id: number) {
      let exist = false

      this.addOns.forEach((addOn) => {
        if (addOn.id === id) {
          exist = true
        }
      })

      return exist
    },
  },
})
