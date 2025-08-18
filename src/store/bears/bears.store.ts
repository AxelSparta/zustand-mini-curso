import { create } from 'zustand'

interface BearState {
  blackBears: number
  polarBears: number
  pandaBears: number
  increaseBlackBearsPopulation: (by: number) => void
  increasePolarBearsPopulation: (by: number) => void
  increasePandaBearsPopulation: (by: number) => void
}

export const useBearStore = create<BearState>(set => ({
  blackBears: 0,
  polarBears: 0,
  pandaBears: 0,
  increasePolarBearsPopulation: (by: number) =>
    set(state => ({ polarBears: state.polarBears + by })),
  increasePandaBearsPopulation: (by: number) =>
    set(state => ({ pandaBears: state.pandaBears + by })),
  increaseBlackBearsPopulation: (by: number) =>
    set(state => ({ blackBears: state.blackBears + by }))
}))
