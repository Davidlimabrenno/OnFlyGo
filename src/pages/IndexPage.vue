<template>
  <q-page padding class="bg-grey-2">
    <div class="container">
      <!-- Cabeçalho com logo -->
      <div class="header">
        <img src="src/assets/main-logo.png" alt="OnFly Logo" class="logo" />
      </div>

      <!-- Seção de busca -->
      <div class="search-container">
        <h2>Reservar hotel</h2>

        <div class="search-bar">
          <DestinoAutocomplete
            v-model="selectedPlace"
            :places="places"
            :is-searching="isSearching"
            @search="onSearch"
            @clear-search="onClearSearch"
          />
        </div>

        <div class="filters">
          <HotelFiltros
            :filter-option="filterOption"
            @filter-changed="onFilterChanged"
            @name-changed="onNameFilterChanged"
          />
        </div>
      </div>

      <!-- Listagem de hotéis -->
      <div class="hotel-list">
        <div v-for="hotel in visibleHotels" :key="hotel.id" class="hotel-card">
          <HotelCard :hotel="hotel" @show-details="onShowDetails" />
        </div>
      </div>

      <!-- Mensagem de erro -->
      <div v-if="filteredHotels.length === 0" class="banner-error">
        Nenhum hotel encontrado para o destino pesquisado.
      </div>

      <!-- Infinite scroll corrigido -->
      <q-infinite-scroll
        v-if="visibleHotels.length < filteredHotels.length"
        :initial-load="false"
        @load="loadMoreHotels"
      />

      <!-- Drawer de detalhes -->
      <HotelDrawer v-if="selectedHotel" :hotel="selectedHotel" @close="selectedHotel = null" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import DestinoAutocomplete from 'src/components/DestinoAutocomplete.vue'
import HotelFiltros from 'src/components/HotelFiltros.vue'
import HotelCard from 'src/components/HotelCard.vue'
import HotelDrawer from 'src/components/HotelDrawer.vue'
import { useCidadeService } from 'src/services/cidadeService'
import { useHotelService } from 'src/services/hotelService'
import type { Cidade, Hotel } from 'src/components/models'

const { getAllCities } = useCidadeService()
const { getAllHotels, getHotelsByPlaceId } = useHotelService()

const places = ref<Cidade[]>([])
const hotels = ref<Hotel[]>([])
const filteredHotels = ref<Hotel[]>([])
const visibleHotels = ref<Hotel[]>([])

const selectedPlace = ref<Cidade | null>(null)
const selectedHotel = ref<Hotel | null>(null)
const isSearching = ref(false)

// Filtros
const filterOption = ref<'recommended' | 'bestRated' | null>('recommended')
const nameFilter = ref('')

// Carregar dados ao iniciar
onMounted(() => {
  places.value = getAllCities()
  hotels.value = getAllHotels()
  applyFilters()
  visibleHotels.value = filteredHotels.value.slice(0, 10)
})

// 🔹 **Corrigir nome duplicado na barra de pesquisa**
watch(selectedPlace, (newVal) => {
  if (newVal) {
    const city = places.value.find((p) => p.placeId === newVal.placeId)
    if (city) {
      selectedPlace.value = city
    }
  }
})

// 🔹 **Corrigida a busca correta pelo destino**
function onSearch(searchText: string) {
  isSearching.value = true

  if (!searchText.trim()) {
    selectedPlace.value = null
    hotels.value = getAllHotels()
  } else {
    const placeFound = places.value.find(
      (p) => formatCity(p).toLowerCase() === searchText.toLowerCase(),
    )

    if (placeFound) {
      selectedPlace.value = placeFound
      hotels.value = getHotelsByPlaceId(placeFound.placeId)
    } else {
      selectedPlace.value = null
      hotels.value = []
    }
  }

  applyFilters()
  visibleHotels.value = filteredHotels.value.slice(0, 10)
}

// 🔹 **Corrigida a lógica para restaurar todos os hotéis ao apagar o campo**
function onClearSearch() {
  isSearching.value = false
  selectedPlace.value = null
  hotels.value = getAllHotels()
  applyFilters()
  visibleHotels.value = filteredHotels.value.slice(0, 10)
}

// 🔹 **Funções de ordenação e busca por nome**
function onFilterChanged(newFilter: 'recommended' | 'bestRated' | null) {
  filterOption.value = newFilter
  applyFilters()
  visibleHotels.value = filteredHotels.value.slice(0, 10)
}

function onNameFilterChanged(newName: string) {
  nameFilter.value = newName
  applyFilters()
  visibleHotels.value = filteredHotels.value.slice(0, 10)
}

// 🔹 **Função `applyFilters` para corrigir o erro**
function applyFilters() {
  let temp = [...hotels.value]

  if (nameFilter.value) {
    temp = temp.filter((hotel) => hotel.name.toLowerCase().includes(nameFilter.value.toLowerCase()))
  }

  if (filterOption.value === 'recommended') {
    temp.sort((a, b) => a.price - b.price)
  } else if (filterOption.value === 'bestRated') {
    temp.sort((a, b) => Number(b.stars) - Number(a.stars))
  }

  filteredHotels.value = temp
}

// 🔹 **Correção da função `loadMoreHotels`**
function loadMoreHotels(index: number, done: (stop?: boolean) => void) {
  const currLength = visibleHotels.value.length
  const nextHotels = filteredHotels.value.slice(currLength, currLength + 10)

  if (nextHotels.length > 0) {
    visibleHotels.value.push(...nextHotels)
  }

  // Se não houver mais hotéis para carregar, parar o infinite scroll
  if (visibleHotels.value.length >= filteredHotels.value.length) {
    done(true)
  } else {
    done()
  }
}

// Exibe detalhes do hotel no drawer
function onShowDetails(hotel: Hotel) {
  selectedHotel.value = hotel
}

function formatCity(city: Cidade): string {
  return `${city.name}, ${city.state.shortname}`
}
</script>

<style scoped lang="scss">
@import './IndexPage.scss';
</style>
