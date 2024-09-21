import { defineStore } from "pinia";

export const useCategoryStore = defineStore({
    id: "categoryState",
    state: () => ({
        category: [{}]
    }),
    getters: {},
    actions: {
        setCategory(category: Array<object>) {
            this.category = category
        },
        reset() {
            this.category = [{}]
        }
    },
})
