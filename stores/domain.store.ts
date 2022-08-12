interface DomainStore {
  currentDomain: Models.Domain | null
}

export const useDomainStore = defineStore('domainStore', {
  state: (): DomainStore => ({
    currentDomain: null,
  }),
  actions: {
    setCurrentDomain(domain: Models.Domain) {
      this.currentDomain = domain
    },
  },
  getters: {
    getCurrentDomain(): Models.Domain {
      return this.currentDomain
    },
    getCurrentDomainId(): number | null {
      return this.getCurrentDomain?.id || null
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDomainStore, import.meta.hot))
}
