import { create, StateCreator } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

const customStorage: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    console.log(name, 'getItem called')
    return null
  },
  setItem: function (name: string, value: string): unknown | Promise<unknown> {
    console.log(name, 'setItem called with value:', value)
    return null
  },
  removeItem: function (name: string): unknown | Promise<unknown> {
    console.log(name, 'removeItem called')
    return null
  }
}

const storeAPI: StateCreator<PersonState & Actions> = set => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value })
})

export const usePersonStore = create<PersonState & Actions>()(
  persist(storeAPI, {
    name: 'person-storage', // unique name
    storage: createJSONStorage(() => customStorage) // (optional) by default, 'localStorage' is used
  })
)
