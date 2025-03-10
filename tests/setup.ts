// tests/setup.ts
import '@testing-library/jest-dom'
import { config } from '@vue/test-utils'
import { afterEach, expect } from 'vitest'
import { cleanup } from '@testing-library/vue'
import * as matchers from '@testing-library/jest-dom/matchers'
import { Quasar } from 'quasar'

// Configurar componentes Quasar como stubs
config.global.components = {
  'q-drawer': { template: '<div><slot /></div>' },
  'q-card': { template: '<div><slot /></div>' },
  'q-card-section': { template: '<div><slot /></div>' },
  'q-carousel': { template: '<div><slot /></div>' },
  'q-carousel-slide': { template: '<div><slot /></div>' },
  'q-img': { template: '<img />' },
  'q-chip': { template: '<div><slot /></div>' },
  'q-btn': { template: '<button><slot /></button>' },
  'q-icon': { template: '<span />' },
}

// Adicionar plugin Quasar
config.global.plugins = [[Quasar, {}]]

// Adicionar mocks para diretivas do Quasar
config.global.directives = {
  'close-popup': () => {}, // Mock comum para diretivas do Quasar
}

// Extend Vitest com matchers do DOM
expect.extend(matchers)

// Limpeza do DOM
afterEach(() => {
  cleanup()
})
