import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id: "userState",
    state: () => ({
        token: '',
        userInfo: {
            sid: '',
            username: '',
            storeId: ''
        }
    }),
    getters: {},
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setUserInfo(sid: string,username: string,storeId: string) {
            this.userInfo = {
                sid,
                username,
                storeId,
            }
        },
        getUserInfo() {
            return this.userInfo
        },
        reset() {
            this.token = ''
            this.userInfo = {
                sid: '',
                username: '',
                storeId: ''
            }
        }
    },
})
