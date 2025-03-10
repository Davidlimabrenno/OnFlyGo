import { render, screen, fireEvent } from '@testing-library/vue'
import HotelFiltros from '@/components/HotelFiltros.vue'

describe('HotelFiltros', () => {
  it('deve exibir os filtros corretamente', () => {
    render(HotelFiltros, {
      props: { filterOption: 'recommended' },
    })

    expect(screen.getByRole('option', { name: 'Recomendados' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Melhor Avaliados' })).toBeInTheDocument()
  })

  it('deve emitir evento ao selecionar um filtro', async () => {
    const { emitted } = render(HotelFiltros, {
      props: { filterOption: 'recommended' },
    })

    const select = screen.getByRole('combobox')
    await fireEvent.update(select, 'bestRated')
    expect(emitted()['filter-changed']).toBeTruthy()
  })
})
