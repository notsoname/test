/* eslint-disable @typescript-eslint/no-var-requires */
import react from '@vitejs/plugin-react'
import dns from 'dns'
import { defineConfig } from 'vite'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  plugins: [react()],
  server: {
    port: 3000,
  },
})
