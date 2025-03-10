<template>
  <div class="filters">
    <q-select
      v-model="localFilter"
      :options="filterOptions"
      outlined
      label="Ordenar por"
      emit-value
      map-options
      class="filter-select"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import './HotelFiltros.scss' // Importa os estilos externos

const props = defineProps<{
  filterOption?: 'recommended' | 'bestRated' | null
}>()

const emits = defineEmits<{
  (e: 'filter-changed', filter: 'recommended' | 'bestRated' | null): void
}>()

const localFilter = ref<'recommended' | 'bestRated' | null>(props.filterOption ?? 'recommended')

const filterOptions = [
  { label: 'Recomendados', value: 'recommended' },
  { label: 'Melhor Avaliados', value: 'bestRated' },
]

watch(localFilter, (val) => {
  emits('filter-changed', val)
})
</script>
