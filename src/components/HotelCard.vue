//HotelCard.vue
<template>
  <q-card class="hotel-card" flat>
    <div class="hotel-card-row">
      <!-- Coluna da imagem (carrossel) -->
      <div class="hotel-card-img-col">
        <q-carousel
          v-model="slideIndex"
          :arrows="true"
          arrow-visibility="hover"
          arrow-prev-icon="chevron_left"
          arrow-next-icon="chevron_right"
          transition-prev="slide-right"
          transition-next="slide-left"
          class="hotel-card-carousel"
          height="300px"
        >
          <q-carousel-slide v-for="(img, idx) in hotel.images" :key="idx" :name="idx">
            <q-img v-if="img" :src="img" fit="cover" class="hotel-card-img" />
          </q-carousel-slide>
        </q-carousel>
      </div>

      <!-- Coluna das informações principais -->
      <div class="hotel-card-info-col">
        <div class="hotel-card-header">
          {{ hotel.name }}
        </div>
        <div class="hotel-card-location">
          {{ hotel.address.city }}, {{ hotel.address.state }}. A 2,97 km do centro
        </div>

        <div class="row items-center hotel-card-stars">
          <div class="col-auto">
            <q-rating v-model="stars" max="5" size="16px" color="primary" readonly />
          </div>
          <div class="col-auto text-caption q-ml-xs">
            {{ starRatingText }}
          </div>
        </div>

        <div v-if="hotel.hasRefundableRoom" class="hotel-card-tag">Reembolsável</div>
      </div>

      <!-- Coluna do preço e botão -->
      <div class="hotel-card-price-col">
        <div class="hotel-card-price-title">A partir de R$ {{ formatPrice(hotel.price) }}</div>
        <div class="hotel-card-subprice">R$ 444,00/noite – Impostos incluídos</div>

        <q-btn
          label="Selecionar"
          color="primary"
          class="hotel-card-select-btn"
          @click="onSelectHotel"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Hotel } from 'src/components/models'
import './HotelCard.scss'

const props = defineProps<{ hotel: Hotel }>()
const emits = defineEmits<{ (e: 'show-details', hotel: Hotel): void }>()

const stars = ref(Number(props.hotel.stars) || 0)
const slideIndex = ref(0)

const starRatingText = computed(() => {
  return `${stars.value} estrela${stars.value > 1 ? 's' : ''}`
})

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function onSelectHotel() {
  emits('show-details', props.hotel)
}
</script>
