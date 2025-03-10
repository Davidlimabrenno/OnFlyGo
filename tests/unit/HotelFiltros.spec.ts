import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import HotelFiltros from '@/components/HotelFiltros.vue'
import { Quasar } from 'quasar'

const qSelectStub = {
  template: `<div class="filter-select">
    <label>{{ label }}</label>
    <input aria-label="Ordenar por" readonly :value="modelValue" role="combobox" />
    <ul role="listbox">
      <li role="option" v-for="opt in options" :key="opt.value" @click="$emit('update:modelValue', opt.value)">
        {{ opt.label }}
      </li>
    </ul>
  </div>`,
  props: ['modelValue', 'options', 'label'],
}

const globalStubs = {
  'q-select': qSelectStub,
  'q-btn': { template: `<button @click="$emit('click')"><slot /></button>` },
  transition: false,
}

describe('HotelFiltros.vue', () => {
  it('deve exibir os filtros corretamente', async () => {
    render(HotelFiltros, {
      props: { filterOption: 'recommended' },
      global: { plugins: [Quasar], stubs: globalStubs },
    })
    const option = await screen.findByRole('option', { name: 'Recomendados' })
    expect(option).toBeInTheDocument()
  })

  it('deve emitir evento ao selecionar um filtro', async () => {
    const { emitted } = render(HotelFiltros, {
      props: { filterOption: 'recommended' },
      global: { plugins: [Quasar], stubs: globalStubs },
    })
    const option = await screen.findByRole('option', { name: 'Melhor Avaliados' })
    await fireEvent.click(option)
    expect(emitted()).toHaveProperty('filter-changed')
    expect(emitted()['filter-changed']?.[0]).toEqual(['bestRated'])
  })
})
