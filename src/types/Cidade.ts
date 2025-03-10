// src/models/Cidade.ts
export interface Cidade {
  name: string
  state: {
    name: string
    shortname: string
  }
  placeId: number
  fullAddress: string
}
