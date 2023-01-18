import { BreedsItem } from '@/components/breedsItem'
import { Breed } from '@/models/breed'

interface Props {
  breedsList: Breed[]
  getDogImgs: (breed: string, subbreed?: string) => void
  dogImgs: string[]
  loading: boolean
  cancelRequest: () => void
  currentDog: string
  setCurrentDog: (value: string) => void
}

export const BreedsItems = ({
  breedsList,
  getDogImgs,
  dogImgs,
  loading,
  cancelRequest,
  currentDog,
  setCurrentDog,
}: Props) => {
  return (
    <>
      {breedsList.map((breedItem) => (
        <BreedsItem
          key={breedItem.breed}
          breedItem={breedItem}
          getDogImgs={getDogImgs}
          dogImgs={dogImgs}
          loading={loading}
          cancelRequest={cancelRequest}
          setCurrentDog={setCurrentDog}
          currentDog={currentDog}
        />
      ))}
    </>
  )
}
