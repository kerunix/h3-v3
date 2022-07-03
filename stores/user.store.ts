interface UserStore {
  currentUser: Models.User | null
}

export const useUserStore = defineStore('userStore', {
  state: (): UserStore => ({
    currentUser: null,
  }),
  actions: {
    setCurrentUser(user: Models.User) {
      this.currentUser = user
    },
  },
  getters: {
    getCurrentUser(): Models.User {
      return this.currentUser
    },
    getCurrentUserId(): number | null {
      return this.getCurrentUser?.id || null
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
