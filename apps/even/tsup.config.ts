import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/'],
  splitting: false,
  dts: true,
  outDir: 'dist',
  format: ['esm', 'cjs'],
  skipNodeModulesBundle: true,
  sourcemap: false,
  tsconfig: 'tsconfig.json',
  clean: true,
});
