import { BreedImgsItem } from '@/components/breedImgsItem'
import { Breed } from '@/models/breed'

interface Props {
  breedItem: Breed
  getDogImgs: (breed: string, subbreed?: string) => void
  currentDog: string
  dogImgs: string[]
  loading: boolean
  cancelRequest: () => void
  setCurrentDog: (value: string) => void
}

export const BreedsItem = ({ 
  breedItem, 
  getDogImgs, 
  currentDog, 
  setCurrentDog,
  dogImgs, 
  loading, 
  cancelRequest,
}: Props) => {
  console.log(breedItem)
  const { breed, subbreed } = breedItem

  return (
    <div className='flex flex-col items-start pb-2'>
      <div className='flex items-center gap-1 pb-2'>
        <h2 className='text-lg'>
          {breed}
        </h2>
        {currentDog == breed && 
          loading 
            ? 
              <button
                onClick={() => cancelRequest()} 
                className='p-2 border rounded'
              >
              Отмена
              </button> 
            : <button
                onClick={() => {
                  getDogImgs(breed) 
                  setCurrentDog(breed)
                }}
                className='p-2 border rounded'
              >
                {currentDog == breed ? 'Обновить' : 'Показать'}
              </button>
        }
      </div>
      <BreedImgsItem
        currentDog={currentDog}
        breed={breed}
        dogImgs={dogImgs}
      />

      {subbreed.map((subbreed) => (
        <div className='flex flex-col pb-2' key={`${breed}${subbreed}`}>
          <div className='flex gap-1 items-center'>
            <h2 className='text-lg'>
              {`${breed} ${subbreed}`}
            </h2>
            {currentDog == breed+subbreed && 
              loading 
                ? 
                  <button 
                    onClick={() => cancelRequest()} 
                    className='p-2 border rounded'
                  >
                  Отмена
                  </button> 
                : <button
                    onClick={() => {
                      getDogImgs(breed, subbreed)
                      setCurrentDog(`${breed}${subbreed}`)
                    }}
                    className='p-2 border rounded'
                  >
                    {currentDog == `${breed}${subbreed}` ? 'Обновить' : 'Показать'}
                  </button>
              }
          </div>
          <BreedImgsItem
            currentDog={currentDog}
            breed={breed+subbreed}
            dogImgs={dogImgs}
          />
        </div>
      ))}
    </div>
  )
}