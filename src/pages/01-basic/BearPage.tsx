import { useShallow } from 'zustand/shallow'
import { WhiteCard } from '../../components'
import { useBearStore } from '../../store'

export const BearPage = () => {
  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        <BlackBears />
        <PolarBears />
        <PandaBears />
        <Bears />
      </div>
    </>
  )
}

export function BlackBears () {
  const blackBears = useBearStore(state => state.blackBears)
  const increaseBlackBearsPopulation = useBearStore(
    state => state.increaseBlackBearsPopulation
  )

  return (
    <WhiteCard centered>
      <h2>Osos Negros</h2>

      <div className='flex flex-col md:flex-row'>
        <button onClick={() => increaseBlackBearsPopulation(+1)}> +1</button>
        <span className='text-3xl mx-2 lg:mx-10'> {blackBears} </span>
        <button onClick={() => increaseBlackBearsPopulation(-1)}> -1</button>
      </div>
    </WhiteCard>
  )
}

export function PolarBears () {
  const polarBears = useBearStore(state => state.polarBears)
  const increasePolarBearsPopulation = useBearStore(
    state => state.increasePolarBearsPopulation
  )

  return (
    <WhiteCard centered>
      <h2>Osos Polares</h2>

      <div className='flex flex-col md:flex-row'>
        <button onClick={() => increasePolarBearsPopulation(+1)}> +1</button>
        <span className='text-3xl mx-2 lg:mx-10'> {polarBears} </span>
        <button onClick={() => increasePolarBearsPopulation(-1)}> -1</button>
      </div>
    </WhiteCard>
  )
}

export function PandaBears () {
  const pandaBears = useBearStore(state => state.pandaBears)
  const increasePandaBearsPopulation = useBearStore(
    state => state.increasePandaBearsPopulation
  )

  return (
    <WhiteCard centered>
      <h2>Osos Pandas</h2>

      <div className='flex flex-col md:flex-row'>
        <button onClick={() => increasePandaBearsPopulation(+1)}> +1</button>
        <span className='text-3xl mx-2 lg:mx-10'> {pandaBears} </span>
        <button onClick={() => increasePandaBearsPopulation(-1)}> -1</button>
      </div>
    </WhiteCard>
  )
}

export function Bears () {
  const bears = useBearStore(useShallow(state => state.bears))
  // Do nothing hace un rerender a pesar de que no cambia el estado, si queremos que no se renderice cuando tiene el mismo valor, podemos usar shallow
  // const bears = useBearStore(state => state.bears, shallow)
  const doNothing = useBearStore(state => state.doNothing)
  const addBear = useBearStore(state => state.addBear)
  const clearBears = useBearStore(state => state.clearBears)

  return (
    <WhiteCard>
      <h2>Osos</h2>
      <button onClick={addBear}>Add Bear</button>
      <button onClick={clearBears}>Clear Bears</button>
      <button onClick={doNothing}>Do nothing</button>
      <pre>
        {JSON.stringify(bears, null, 2)}
      </pre>
    </WhiteCard>
  )
}