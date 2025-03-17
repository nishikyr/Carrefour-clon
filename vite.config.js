import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  css:{
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['import', 'global-builtin'],
      }
    }
  }, //<---- para eliminar woarnings de scss y sass de bootstrap al ejecutar proyecto vite...
  plugins: [react()],
})