import { create, StateCreator } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { customSessionStorage } from '../storages/session.storage'

interface PersonState {
  firstName: string
  lastName: string
}

interface Actions {
  setFirstName: (value: string) => void
  setLastName: (value: string) => void
}

const storeAPI: StateCreator<PersonState & Actions> = set => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set({ firstName: value }),
  setLastName: (value: string) => set({ lastName: value })
})

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(storeAPI, {
      name: 'person-storage', // unique name
      storage: customSessionStorage // (optional) by default, 'localStorage' is used
    })
  )
)
