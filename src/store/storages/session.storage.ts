import { createJSONStorage, StateStorage } from 'zustand/middleware'

const storageApi: StateStorage = {
  getItem: function (name: string): string | null | Promise<string | null> {
    const data = sessionStorage.getItem(name)
    console.log(data, 'getItem called for', name)
    return data
  },
  setItem: function (name: string, value: string): void {
    sessionStorage.setItem(name, value)
    console.log(value, 'setItem called for', name)
  },
  removeItem: function (name: string): unknown | Promise<unknown> {
    console.log(name, 'removeItem called')
    return null
  }
}

export const customSessionStorage = createJSONStorage(() => storageApi)
