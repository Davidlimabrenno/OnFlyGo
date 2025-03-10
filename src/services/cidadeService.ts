// src/services/cidadeService.ts

import placeData from 'src/data/place.json'
import type { Cidade } from 'src/components/models'

export function useCidadeService() {
  function getAllCities(): Cidade[] {
    return placeData
  }
  return { getAllCities }
}
