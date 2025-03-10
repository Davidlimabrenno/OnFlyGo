// src/services/hotelService.ts

import hotelData from 'src/data/hotel.json'
import type { Hotel } from 'src/components/models'

export function useHotelService() {
  // Retorna todos os hotéis de todos os grupos (sem filtrar por cidade)
  function getAllHotels(): Hotel[] {
    // hotelData é um array onde cada item possui:
    // { "hotels": [ ... ], "placeId": number }
    return (hotelData as { hotels: Hotel[]; placeId: number }[]).flatMap(
      (group) => group.hotels || [],
    )
  }

  // Retorna somente os hotéis do grupo cuja placeId seja o informado
  function getHotelsByPlaceId(placeId: number): Hotel[] {
    const group = (hotelData as { hotels: Hotel[]; placeId: number }[]).find(
      (g) => g.placeId === placeId,
    )
    return group ? group.hotels || [] : []
  }

  return { getAllHotels, getHotelsByPlaceId }
}
