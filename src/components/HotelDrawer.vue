<template>
  <!-- QDrawer com overlay (película escura) -->
  <q-drawer
    v-model="drawerOpen"
    side="right"
    overlay
    :width="800"
    transition-show="fade"
    transition-hide="fade"
    class="hotel-drawer"
  >
    <q-card v-if="hotel" flat>
      <!-- Botão de fechar, no topo do Drawer -->
      <div class="drawer-close-btn">
        <q-btn flat round icon="close" size="md" @click="closeDrawer" />
      </div>
      <!-- Botão de fechar com data-testid -->
      <div class="drawer-close-btn">
        <q-btn data-testid="close-button" flat round icon="close" size="md" @click="closeDrawer" />
      </div>

      <!-- Seção de título e endereço (opcional) -->
      <q-card-section class="hotel-header-section">
        <div class="hotel-name">{{ hotel.name }}</div>
        <div class="hotel-address">
          {{ formatFullAddress(hotel) }}
        </div>
      </q-card-section>

      <!-- Carrossel de imagens -->
      <q-carousel
        v-if="hotel.images && hotel.images.length > 0"
        v-model="slide"
        animated
        swipeable
        transition-prev="slide-right"
        transition-next="slide-left"
        :arrows="true"
        arrow-visibility="hover"
        arrow-prev-icon="chevron_left"
        arrow-next-icon="chevron_right"
        control-color="white"
        height="400px"
        class="hotel-carousel"
      >
        <q-carousel-slide v-for="(img, idx) in hotel.images" :key="idx" :name="idx">
          <q-img v-if="img" :src="resolveImageUrl(img)" fit="cover" class="carousel-image" />
          <!-- Contador de imagens -->
          <div class="carousel-counter">{{ idx + 1 }} / {{ hotel.images.length }}</div>
        </q-carousel-slide>
      </q-carousel>
      <q-card-section v-else>
        <q-img src="/assets/no-image.png" fit="cover" class="carousel-image" />
      </q-card-section>

      <!-- Conteúdo principal (facilidades, descrição, detalhes) -->
      <q-card-section class="hotel-info">
        <!-- Facilidades -->
        <div class="hotel-facilities">
          <div class="facilities-title">Facilidades do hotel</div>
          <div v-if="hotel.amenities && hotel.amenities.length">
            <div class="hotel-amenities-line">
              <q-chip
                v-for="(amenity, index) in displayedAmenities"
                :key="index"
                :icon="getAmenityIcon(amenity.label)"
                color="white"
                text-color="dark"
                class="facilities-chip q-mr-sm q-mb-sm"
              >
                {{ amenity.label }}
              </q-chip>
            </div>
            <div class="facilities-btn-container">
              <q-btn
                v-if="hotel.amenities.length > 4"
                outline
                color="primary"
                :label="
                  showAllAmenities ? 'Mostrar menos facilidades' : 'Mostrar todas as facilidades'
                "
                class="facilities-btn"
                @click="toggleAmenities"
              />
            </div>
          </div>
        </div>

        <!-- Descrição -->
        <div class="hotel-description">
          <div class="description-title">Conheça um pouco mais</div>
          <p>{{ hotel.description }}</p>
        </div>

        <!-- Detalhes (preço, estrelas, cidade) -->
        <div class="hotel-details">
          <span class="price">Preço: R$ {{ hotel.price }}</span>
          <span class="sep">|</span>
          <span class="stars">Estrelas: {{ hotel.stars }}</span>
          <span class="sep">|</span>
          <span class="city">Cidade: {{ hotel.address.city }}</span>
        </div>
      </q-card-section>
    </q-card>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch, defineExpose } from 'vue'
import type { Hotel } from 'src/components/models'
import './HotelDrawer.scss'

const props = defineProps<{ hotel: Hotel | null }>()
const emits = defineEmits<{ (e: 'close'): void }>()

const drawerOpen = ref(false)
const slide = ref(0)
const showAllAmenities = ref(false)

/* Exibe apenas 4 facilidades ou todas, conforme showAllAmenities */
const displayedAmenities = computed(() => {
  return showAllAmenities.value ? props.hotel?.amenities : props.hotel?.amenities?.slice(0, 4)
})

watch(
  () => props.hotel,
  (newVal) => {
    if (newVal) {
      slide.value = 0
      drawerOpen.value = true
      showAllAmenities.value = false
    }
  },
  { immediate: true },
)

function closeDrawer() {
  drawerOpen.value = false
  emits('close')
}

function toggleAmenities() {
  showAllAmenities.value = !showAllAmenities.value
}

function resolveImageUrl(imgPath: string): string {
  if (!imgPath) return '/assets/no-image.png'
  if (imgPath.startsWith('http')) return imgPath
  return `/src/data/${imgPath}`
}

function formatFullAddress(h: Hotel): string {
  // Ajuste conforme a estrutura real do seu objeto address
  return `${h.address.street}, ${h.address.number} – ${h.address.city}, ${h.address.state} – ${h.address.country}`
}

function getAmenityIcon(label: string): string {
  const iconMap: Record<string, string> = {
    Internet: 'wifi',
    'Café da manhã': 'free_breakfast',
    Estacionamento: 'local_parking',
    Restaurante: 'restaurant',
    Lavanderia: 'local_laundry_service',
    Academia: 'fitness_center',
    Piscina: 'pool',
    Spa: 'spa',
    'Ar condicionado': 'ac_unit',
  }
  return iconMap[label] || 'check_circle'
}

defineExpose({ drawerOpen })
</script>
