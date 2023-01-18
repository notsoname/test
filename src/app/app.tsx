import { useEffect, useRef, useState } from 'react'
import { AxiosError } from 'axios'

import { BreedsItems } from '@/components/breedsItems'
import { ModalError } from '@/components/modalError'
import { Breed } from '@/models/breed'
import { DogsService } from '@/services'

export const App = () => {
  const [breedsList, setBreedsList] = useState<Breed[]>([])
  const [dogImgs, setDogImgs] = useState<string[]>([])
  const [currentDog, setCurrentDog] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const abortControllerRef = useRef<null | AbortController>(null)

  const fetchBreedsList = async () => {
    try {
      const response = await DogsService.getAllBreedsList()
      Object.entries(response.data.message).forEach((breed) => {
        setBreedsList((prev) => [
          ...prev,
          { breed: breed[0], subbreed: breed[1] },
        ])
      })
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    fetchBreedsList()
  }, [])

  const getDogImgs = async (breed: string, subbreed = '') => {
    try {
      abortControllerRef.current = new AbortController()
      const controller = abortControllerRef.current
      setLoading(true)
      setDogImgs([])
      if (subbreed) {
        const response = await DogsService.getSubBreedImgs(breed, subbreed, controller)
        setDogImgs(response.data.message)
        setLoading(false)
        return
      }
      
      const response = await DogsService.getBreedImgs(breed, controller)
      setDogImgs(response.data.message)
      setLoading(false)

    } catch (error) {
      const err = error as AxiosError
      setLoading(false)
      if (err.name === 'CanceledError') {
        console.log('Запрос был отменен')
        return
      }
      setError(true)
    }
  }

  const cancelRequest = () => {
    if (abortControllerRef.current != null) {
      abortControllerRef.current.abort()
      setCurrentDog('')
    }
  }

  return (
    <div className='w-screen h-screen flex items-center flex-col container mx-auto'>
      <h1 className='text-5xl font-bold'>Dog API</h1>
      <div className='w-full pt-4 gap-4'>
        <BreedsItems
          breedsList={breedsList}
          getDogImgs={getDogImgs}
          dogImgs={dogImgs}
          loading={loading}
          cancelRequest={cancelRequest}
          setCurrentDog={setCurrentDog}
          currentDog={currentDog}
        />
      </div>
      {error && <ModalError setError={setError} />}
    </div>
  )
}
