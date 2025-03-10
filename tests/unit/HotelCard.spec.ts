import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import HotelCard from '@/components/HotelCard.vue'
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

const globalStubs = {
  'q-card': { template: `<div><slot /></div>` },
  'q-carousel': { template: `<div><slot /></div>` },
  'q-carousel-slide': { template: `<div><slot /></div>` },
  'q-img': { template: `<img :src="src" alt="imagem" />`, props: ['src'] },
  'q-rating': { template: `<div></div>` },
  'q-btn': {
    template: `<button data-testid="select-btn" v-bind="$attrs" @click="$emit('click')"><slot /></button>`,
  },
}

describe('HotelCard.vue', () => {
  it('deve emitir evento ao clicar no botão selecionar', async () => {
    const { emitted } = render(HotelCard, {
      props: { hotel: mockHotel },
      global: { plugins: [Quasar], stubs: globalStubs },
    })
    const selectBtn = screen.getByTestId('select-btn')
    await fireEvent.click(selectBtn)
    expect(emitted()).toHaveProperty('show-details')
    expect(emitted()['show-details']?.[0]).toEqual([mockHotel])
  })
})
