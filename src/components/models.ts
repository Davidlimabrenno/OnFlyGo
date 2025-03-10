// src/components/models.ts

export interface Todo {
  id: number
  content: string
}

export interface Meta {
  totalCount: number
}

export interface Cidade {
  name: string
  state: {
    name: string
    shortname: string
  }
  placeId: number
}

export interface Amenity {
  icon: string
  key: string
  label: string
}

export interface Address {
  street: string
  number: string
  district: string
  city: string
  state: string
  country: string
  zipCode: string | null
  fullAddress: string
}

export interface Hotel {
  id: number
  favorite: boolean
  name: string
  description: string
  stars: string
  thumb: string
  amenities: Amenity[] | null
  hasBreakFast: boolean
  hasRefundableRoom: boolean
  hasAgreement: boolean
  nonRefundable: string | null
  address: Address
  images: string[]
  deals?: unknown
  roomsQuantity: number
  price: number
  show?: boolean //
}
export interface Cidade {
  name: string
  state: {
    name: string
    shortname: string
  }
  placeId: number
  fullAddress: string
}
