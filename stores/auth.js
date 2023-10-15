import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        login(token, profile) {
            this.token = token;
            this.user = profile;
        },
        logout() {
            this.token = null;
            this.user = null;
        },
        isLoggedIn() {
            return !!this.token;
        }
    }
});