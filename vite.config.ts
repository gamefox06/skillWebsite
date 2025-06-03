import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '5173-inc7u5sabe5806ndxixw0-d0eaed76.manusvm.computer',
      '5175-i2x4yy3jijttupvp5pgtb-d0eaed76.manusvm.computer',
      'all'
    ]
  }
})
