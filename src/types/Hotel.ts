// src/types/Hotel.ts

export interface Amenity {
  key: string
  label: string
  icon?: string
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
  name: string
  description: string
  stars: string
  price: number
  images: string[]
  thumb: string
  amenities: Amenity[]
  address: Address
  favorite: boolean
  hasBreakFast: boolean
  hasRefundableRoom: boolean
  hasAgreement: boolean
  nonRefundable: string | null
  roomsQuantity: number
  deals?: unknown
}

export interface Cidade {
  placeId: number
  name: string
  state: {
    name: string
    shortname: string
  }
  fullAddress: string
}

// Tipos auxiliares para operações de busca
export interface HotelSearchParams {
  cidade: string
  checkIn: Date
  checkOut: Date
  hospedes: number
  ordenarPor?: 'preco' | 'estrelas' | 'recomendado'
}

export interface HotelResponse {
  success: boolean
  data: Hotel[]
  pagination: {
    currentPage: number
    totalPages: number
    itemsPerPage: number
  }
}

// Tipo para formulários de hotel
export interface HotelForm {
  cidadeDestino: Cidade | null
  datas: {
    checkIn: Date | null
    checkOut: Date | null
  }
  hospedes: number
}

export type HotelSortOption = 'recommended' | 'priceAsc' | 'priceDesc' | 'starsAsc' | 'starsDesc'

// Exportação padrão para compatibilidade
export type { Hotel as default }
