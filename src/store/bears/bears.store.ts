import { create } from 'zustand'

type Bear = {
  id: number
  name: string
}

interface BearState {
  blackBears: number
  polarBears: number
  pandaBears: number
  increaseBlackBearsPopulation: (by: number) => void
  increasePolarBearsPopulation: (by: number) => void
  increasePandaBearsPopulation: (by: number) => void

  bears: Bear[]
  addBear: () => void
  clearBears: () => void

  doNothing: () => void

  computedProperties: {
    totalBears: number
  }
}

export const useBearStore = create<BearState>((set, get) => ({
  blackBears: 0,
  polarBears: 0,
  pandaBears: 0,
  increasePolarBearsPopulation: (by: number) =>
    set(state => ({ polarBears: state.polarBears + by })),
  increasePandaBearsPopulation: (by: number) =>
    set(state => ({ pandaBears: state.pandaBears + by })),
  increaseBlackBearsPopulation: (by: number) =>
    set(state => ({ blackBears: state.blackBears + by })),

  bears: [{ id: 1, name: 'Oso 1' }],
  addBear: () =>
    set(state => ({
      bears: [
        ...state.bears,
        { id: state.bears.length + 1, name: `Oso ${state.bears.length + 1}` }
      ]
    })),
  clearBears: () => set({ bears: [] }),
  doNothing: () => set(state => ({ bears: [...state.bears] })),
  computedProperties: {
    get totalBears () {
      return (
        get().blackBears +
        get().polarBears +
        get().pandaBears +
        get().bears.length
      )
    }
  }
}))
