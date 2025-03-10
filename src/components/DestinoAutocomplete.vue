<template>
  <div class="search-input-container">
    <!-- Campo de busca com autocomplete -->
    <q-select
      v-model="selectedPlaceId"
      :options="searchResults"
      use-input
      fill-input
      emit-value
      map-options
      option-label="label"
      option-value="value"
      label="Destino"
      hint="Digite ou selecione um destino"
      behavior="menu"
      clearable
      class="search-input"
      @model-value="inputText"
      @filter="onFilter"
      @update:model-value="onSelect"
      @update:input-value="onInputChange"
    />

    <!-- Botão de busca -->
    <q-btn
      class="search-btn"
      :label="isSearching ? 'Alterar busca' : 'Buscar'"
      color="primary"
      @click="onButtonClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Cidade } from 'src/components/models'
import './DestinoAutocomplete.scss' // Importa o arquivo de estilo externo

const props = defineProps<{
  places: Cidade[]
  modelValue: Cidade | null
  isSearching: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', city: Cidade | null): void
  (e: 'search', searchText: string): void
  (e: 'clearSearch'): void
}>()

const inputText = ref<string>(props.modelValue ? formatCity(props.modelValue) : '')
const selectedPlaceId = ref<number | null>(props.modelValue ? props.modelValue.placeId : null)
const searchResults = ref<{ label: string; value: number }[]>([])

const uniquePlaces = computed(() => {
  const uniqueMap = new Map()
  props.places.forEach((city) => {
    uniqueMap.set(city.placeId, {
      label: formatCity(city),
      value: city.placeId,
    })
  })
  return Array.from(uniqueMap.values())
})

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      inputText.value = formatCity(newVal)
      selectedPlaceId.value = newVal.placeId
    } else {
      inputText.value = ''
      selectedPlaceId.value = null
    }
  },
)

function onInputChange(value: string) {
  inputText.value = value
}

function onFilter(val: string, update: (fn: () => void) => void) {
  update(() => {
    const searchTerm = val.toLowerCase()
    searchResults.value = uniquePlaces.value.filter((city) =>
      city.label.toLowerCase().includes(searchTerm),
    )
  })
}

function formatCity(city: Cidade): string {
  return `${city.name}, ${city.state.shortname}`
}

function onSelect(placeId: number | null) {
  const selectedCity = props.places.find((city) => city.placeId === placeId) || null
  selectedPlaceId.value = placeId
  inputText.value = selectedCity ? formatCity(selectedCity) : ''
  emits('update:modelValue', selectedCity)
}

function onButtonClick() {
  if (!inputText.value.trim()) {
    emits('clearSearch')
    selectedPlaceId.value = null
    inputText.value = ''
  } else {
    emits('search', inputText.value.trim())
  }
}
</script>
