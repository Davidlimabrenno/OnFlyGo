import { render, screen, fireEvent } from '@testing-library/vue'
import { defineComponent, ref } from 'vue'
import { describe, it, expect } from 'vitest'
import HotelCard from '@/components/HotelCard.vue'
import HotelDrawer from '@/components/HotelDrawer.vue'
import { Quasar } from 'quasar'
import type { Hotel } from '@/components/models'

const mockHotel: Hotel = {
  id: 1,
  name: 'Hotel Teste',
  stars: '5',
  images: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
  description: 'Descrição do Hotel Teste',
  address: {
    street: 'Rua Lavras',
    number: '150',
    district: 'Savassi',
    city: 'Belo Horizonte',
    state: 'MG',
    country: 'Brasil',
    zipCode: '30110-000',
    fullAddress: 'Rua Lavras, 150 – Belo Horizonte, MG – Brasil',
  },
  price: 785,
  thumb: 'https://example.com/thumb.jpg',
  amenities: [
    { label: 'Wi-Fi', key: 'wifi', icon: 'wifi' },
    { label: 'Piscina', key: 'pool', icon: 'pool' },
  ],
  favorite: false,
  hasBreakFast: true,
  hasRefundableRoom: true,
  hasAgreement: false,
  nonRefundable: 'false',
  roomsQuantity: 10,
}

const TestHotel = defineComponent({
  components: { HotelCard, HotelDrawer },
  setup() {
    const selectedHotel = ref<Hotel | null>(null)
    const drawerOpen = ref(false)
    const openDrawer = (h: Hotel) => {
      selectedHotel.value = h
      drawerOpen.value = true
    }
    return { hotel: mockHotel, selectedHotel, drawerOpen, openDrawer }
  },
  template: `
    <div>
      <HotelCard :hotel="hotel" @show-details="openDrawer" />
      <HotelDrawer v-if="selectedHotel" :hotel="selectedHotel" v-model="drawerOpen" @close="drawerOpen = false" />
    </div>
  `,
})

const globalStubs = {
  'q-layout': { template: `<div><slot /></div>` },
  'q-page-container': { template: `<div><slot /></div>` },
  'q-drawer': { template: `<div role="complementary"><slot /></div>` },
  'q-card': { template: `<div><slot /></div>` },
  'q-card-section': { template: `<div><slot /></div>` },
  'q-carousel': { template: `<div><slot /></div>` },
  'q-carousel-slide': { template: `<div><slot /></div>` },
  'q-img': { template: `<img :src="src" alt="imagem" />`, props: ['src'] },
  'q-rating': { template: `<div></div>` },
  'q-btn': {
    template: `<button v-bind="$attrs" @click="$emit('click')">{{ $attrs.label || '' }}</button>`,
  },
  'q-chip': { template: `<div><slot /></div>` },
  transition: false,
}

describe('HotelTest.spec.ts', () => {
  it('deve emitir evento ao clicar no botão selecionar e abrir o drawer', async () => {
    render(TestHotel, { global: { plugins: [Quasar], stubs: globalStubs } })
    const selectBtn = screen.getByRole('button', { name: /Selecionar/i })
    await fireEvent.click(selectBtn)
    const drawer = await screen.findByRole('complementary')
    expect(drawer.textContent).toMatch(/Hotel Teste/)
  })

  it('deve fechar o drawer ao clicar no botão de fechar', async () => {
    const { emitted } = render(HotelDrawer, {
      props: { hotel: mockHotel },
      global: { plugins: [Quasar], stubs: globalStubs },
    })
    const closeBtns = screen.getAllByTestId('close-button')
    await fireEvent.click(closeBtns[0]!)
    expect(emitted()).toHaveProperty('close')
  })
})
