/// <reference types="vitest" />
/// <reference types="vite/client" />

import { configDefaults, defineConfig } from 'vitest/config'
import path from "path"

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: "src/tests/setup.ts",
        exclude:[
          ...configDefaults.exclude, 
          'integration/*'
        ]
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, './src')
        },
      },
})