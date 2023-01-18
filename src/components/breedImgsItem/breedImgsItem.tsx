interface Props {
  currentDog: string
  breed: string
  dogImgs: string[]
}

export const BreedImgsItem = ({ currentDog, breed, dogImgs, }: Props) => {
  return (
    <div className='flex justify-center flex-wrap gap-4'>
      {currentDog == breed &&
        dogImgs.map((img) => (
          <img
            key={img}
            src={img}
            alt={breed}
            className='w-72 h-72 pt-2 rounded-2xl'
          />
        ))
      }
    </div>
  )
}
