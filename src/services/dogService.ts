import api from '@/api'

interface AllBreedsResponse {
  message: {
    [key: string]: string[],
  }
}
interface BreedImgsResponse {
  message: string[]
}

export const DogsService = {
  getAllBreedsList: () => {
    return api.get<AllBreedsResponse>('breeds/list/all')
  },
  getBreedImgs: (breed: string, controller: AbortController) => {
    return api.get<BreedImgsResponse>(
      `breed/${breed}/images/random/3`,
      { signal: controller.signal },
    )
  },
  getSubBreedImgs: (breed: string, subbreed: string, controller: AbortController, ) => {
    return api.get<BreedImgsResponse>(
      `breed/${breed}/${subbreed}/images/random/3`,
      { signal: controller.signal },
    )
  },
}
