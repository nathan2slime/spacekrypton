import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['index.ts'],
  splitting: true,
  dts: true,
  outDir: 'dist',
  skipNodeModulesBundle: true,
  sourcemap: false,
  format: ['cjs', 'esm'],
  injectStyle: false,
  minify: true,
  tsconfig: 'tsconfig.json',
  clean: true,
});
