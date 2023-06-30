import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/', 'index.ts'],
  splitting: true,
  dts: true,
  outDir: 'dist',
  skipNodeModulesBundle: true,
  sourcemap: false,
  injectStyle: false,
  minify: true,
  tsconfig: 'tsconfig.json',
  clean: true,
});
