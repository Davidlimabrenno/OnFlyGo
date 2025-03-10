import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
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

const globalStubs = {
  'q-layout': { template: `<div><slot /></div>` },
  'q-page-container': { template: `<div><slot /></div>` },
  'q-drawer': { template: `<div role="complementary"><slot /></div>` },
  'q-card': { template: `<div><slot /></div>` },
  'q-card-section': { template: `<div><slot /></div>` },
  'q-carousel': { template: `<div><slot /></div>` },
  'q-carousel-slide': { template: `<div><slot /></div>` },
  'q-img': { template: `<img :src="src" alt="imagem" />`, props: ['src'] },
  'q-btn': {
    template: `<button data-testid="close-button" v-bind="$attrs" @click="$emit('click')"><slot /></button>`,
  },
  'q-chip': { template: `<div><slot /></div>` },
  transition: false,
}

describe('HotelDrawer', () => {
  it('deve exibir informações do hotel quando aberto', async () => {
    render(HotelDrawer, {
      props: { hotel: mockHotel },
      global: { plugins: [Quasar], stubs: globalStubs },
    })
    const drawer = screen.getByRole('complementary')
    expect(drawer.textContent).toMatch(/Hotel Teste/)
    expect(drawer.textContent).toMatch(/Rua Lavras, 150 – Belo Horizonte, MG – Brasil/)
    expect(drawer.textContent).toMatch(/Descrição do Hotel Teste/)
    expect(drawer.textContent).toMatch(/R\$ 785/)
    expect(drawer.textContent).toMatch(/Estrelas:\s*5/)
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

  it('exibe o carrossel de imagens corretamente', async () => {
    render(HotelDrawer, {
      props: { hotel: mockHotel },
      global: { plugins: [Quasar], stubs: globalStubs },
    })
    const drawer = screen.getByRole('complementary')
    expect(drawer.textContent).toMatch(/1\s*(\/|de)\s*2/)
    const imgs = screen.getAllByRole('img')
    expect(imgs).toHaveLength(2)
  })
})
