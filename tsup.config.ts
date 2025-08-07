import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  target: 'node16',
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
})
