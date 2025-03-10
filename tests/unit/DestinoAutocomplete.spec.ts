import { render, screen, fireEvent } from '@testing-library/vue'
import DestinoAutocomplete from '@/components/DestinoAutocomplete.vue'
import type { Cidade } from '@/types/Cidade'

const mockCities: Cidade[] = [
  {
    placeId: 1,
    name: 'Belo Horizonte',
    state: { name: 'Minas Gerais', shortname: 'MG' },
    fullAddress: 'Belo Horizonte, MG',
  },
]

describe('DestinoAutocomplete', () => {
  it('deve mostrar opções ao digitar', async () => {
    render(DestinoAutocomplete, {
      props: {
        places: mockCities,
        modelValue: null,
        isSearching: false,
      },
    })

    const input = screen.getByTestId('destination-select')
    await fireEvent.update(input, 'Belo Horizonte')

    expect(screen.getAllByTestId('select-option')).toHaveLength(1)
    expect(screen.getByTestId('select-option')).toHaveTextContent('Belo Horizonte, MG')
  })

  it('deve emitir evento de busca ao clicar no botão', async () => {
    const { emitted } = render(DestinoAutocomplete, {
      props: {
        places: mockCities,
        modelValue: null,
        isSearching: false,
      },
    })

    await fireEvent.click(screen.getByTestId('search-button'))
    expect(emitted().search).toBeTruthy()
  })
})
