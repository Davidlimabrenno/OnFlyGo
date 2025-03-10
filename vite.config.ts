import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin' // Importa o plugin do Quasar

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }, // Necessário para o Quasar
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass', // Ajuste o caminho conforme necessário
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Alias para o diretório src
    },
  },
  test: {
    globals: true, // Habilita variáveis globais como `describe`, `it`, `expect`, etc.
    environment: 'jsdom', // Configura o ambiente de teste para simular o DOM do navegador
    setupFiles: './tests/setup.ts', // Arquivo de configuração inicial para os testes
    deps: {
      inline: ['quasar'], // Garante que o Quasar seja corretamente interpretado nos testes
    },
  },
})
