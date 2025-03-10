import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import HotelDrawer from '@/components/HotelDrawer.vue'
import { QLayout, QPageContainer, Quasar } from 'quasar'
import type { Hotel } from '@/types/Hotel'

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

describe('HotelDrawer', () => {
  it('deve exibir informações do hotel quando aberto', async () => {
    render(
      {
        components: { QLayout, QPageContainer, HotelDrawer },
        template: `
          <q-layout>
            <q-page-container>
              <hotel-drawer :hotel="hotel" :model-value="true" />
            </q-page-container>
          </q-layout>
        `,
        props: { hotel: mockHotel },
      },
      { global: { plugins: [Quasar] } },
    )
    expect(await screen.findByText('Hotel Teste')).toBeInTheDocument()
    expect(screen.getByText('Rua Lavras, 150 – Belo Horizonte, MG – Brasil')).toBeInTheDocument()
    expect(screen.getByText('Descrição do Hotel Teste')).toBeInTheDocument()
    expect(screen.getByText(/R\$ 785/)).toBeInTheDocument()
    expect(screen.getByText('★★★★★')).toBeInTheDocument()
  })

  it('deve fechar o drawer ao clicar no botão de fechar', async () => {
    const { emitted } = render(
      {
        components: { QLayout, QPageContainer, HotelDrawer },
        template: `
          <q-layout>
            <q-page-container>
              <hotel-drawer :hotel="hotel" :model-value="true" />
            </q-page-container>
          </q-layout>
        `,
        props: { hotel: mockHotel },
      },
      { global: { plugins: [Quasar] } },
    )
    const closeBtn = screen.queryByText('Fechar')
    expect(closeBtn).not.toBeNull()
    if (closeBtn) {
      await fireEvent.click(closeBtn)
      expect(emitted()).toHaveProperty('close')
    }
  })

  it('exibe o carrossel de imagens corretamente', async () => {
    render(
      {
        components: { QLayout, QPageContainer, HotelDrawer },
        template: `
          <q-layout>
            <q-page-container>
              <hotel-drawer :hotel="hotel" :model-value="true" />
            </q-page-container>
          </q-layout>
        `,
        props: {
          hotel: {
            ...mockHotel,
            images: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
          },
        },
      },
      { global: { plugins: [Quasar] } },
    )
    expect(await screen.findByText(/1\s*\/\s*2/)).toBeInTheDocument()
    const imgs = screen.getAllByRole('img')
    expect(imgs).toHaveLength(2)
  })
})
