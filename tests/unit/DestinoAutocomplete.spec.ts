import { render, screen, fireEvent, within } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import DestinoAutocomplete from '@/components/DestinoAutocomplete.vue'
import { Quasar } from 'quasar'
import { defineComponent, ref } from 'vue'

const qSelectStub = defineComponent({
  name: 'q-select-stub',
  props: {
    modelValue: { type: String, default: '' },
    label: { type: String, default: '' },
  },
  setup(props, { emit }) {
    const options = [
      { label: 'Belo Horizonte', value: 'BH' },
      { label: 'São Paulo', value: 'SP' },
    ]
    const localValue = ref(props.modelValue)
    const onInput = (e: Event) => {
      const target = e.target as HTMLInputElement
      localValue.value = target.value
      emit('update:modelValue', localValue.value)
    }
    return { options, localValue, onInput }
  },
  template: `<div data-testid="destination-select">
    <label>{{ label }}</label>
    <input aria-label="Destino" role="combobox" :value="localValue" @input="onInput" />
    <ul role="listbox">
      <li v-for="opt in options" :key="opt.value" role="option">{{ opt.label }}</li>
    </ul>
  </div>`,
})

const qBtnStub = {
  template: `<button data-testid="search-button" @click="$emit('click')"><slot /></button>`,
}

const globalStubs = {
  'q-select': qSelectStub,
  'q-btn': qBtnStub,
  transition: false,
}

describe('DestinoAutocomplete.vue', () => {
  it('deve mostrar opções ao digitar', async () => {
    render(DestinoAutocomplete, {
      global: { plugins: [Quasar], stubs: globalStubs },
    })
    const select = screen.getByTestId('destination-select')
    const input = within(select).getByRole('combobox', { name: 'Destino' })
    await fireEvent.update(input, 'Belo')
    const option = await screen.findByRole('option', {
      name: (content: string) => content.replace(/\s/g, '').includes('BeloHorizonte'),
    })
    expect(option).toBeInTheDocument()
  })

  it('deve emitir evento de busca ao clicar no botão', async () => {
    const { emitted } = render(DestinoAutocomplete, {
      global: { plugins: [Quasar], stubs: globalStubs },
    })
    const searchBtn = screen.getByTestId('search-button')
    await fireEvent.click(searchBtn)
    expect(emitted()).toHaveProperty('clearSearch')
  })
})
