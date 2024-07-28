import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })
export default {
  plugins: [
    vue(),
    VitePWA({ 
      registerType: 'autoUpdate', // or 'prompt'
      manifest: {
        name: 'WNL Chingo',
        short_name: 'Chingo',
        description: 'WNL Chingo',
        theme_color: '#ffffff',
        icons: [
          {
            src: './src/assets/wnl-icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          // ...other icon sizes
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
};
