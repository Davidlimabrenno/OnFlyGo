import { mount } from '@vue/test-utils'
import HotelCard from '@/components/HotelCard.vue' // Certifique-se de que o caminho está correto
import { describe, it, expect } from 'vitest'

const mockHotel = {
  id: 1,
  name: 'Hotel Teste',
  stars: '5',
  images: ['url1.jpg', 'url2.jpg'],
  favorite: false,
  description: 'Ótimo hotel',
  thumb: 'url1.jpg',
  amenities: [
    { label: 'Wi-Fi', icon: 'wifi', key: 'wifi' },
    { label: 'Piscina', icon: 'pool', key: 'pool' },
    { label: 'Restaurante', icon: 'restaurant', key: 'restaurant' },
    { label: 'Estacionamento', icon: 'local_parking', key: 'local_parking' },
  ],
  hasBreakFast: true,
  hasRefundableRoom: false,
  hasAgreement: true,
  nonRefundable: 'true',
  address: {
    street: 'Rua Exemplo',
    number: '123',
    district: 'Centro',
    city: 'Belo Horizonte',
    state: 'MG',
    country: 'Brasil',
    zipCode: '30110-000',
    fullAddress: 'Rua Exemplo, 123 - Centro, Belo Horizonte - MG, Brasil',
  },
  price: 300,
  roomsQuantity: 50,
}

describe('HotelCard.vue', () => {
  it('deve renderizar corretamente', () => {
    const wrapper = mount(HotelCard, {
      props: { hotel: mockHotel },
    })
    expect(wrapper.text()).toContain('Hotel Teste')
    expect(wrapper.text()).toContain('Belo Horizonte')
    expect(wrapper.text()).toContain('5 estrelas')
    expect(wrapper.text()).toContain('R$ 300')
  })

  it('deve emitir evento ao clicar no botão selecionar', async () => {
    const wrapper = mount(HotelCard, {
      props: { hotel: mockHotel },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('show-details')).toBeTruthy()
  })
})
