import { defineConfig } from "vite";
import path from 'path'

const resolvePath = (...args: string[]) => path.resolve(__dirname, ...args)

export default defineConfig({
  build: {
    target: 'es2020',
    outDir: "./dist",
    minify: false,
    lib: {
      entry: resolvePath("./packages/vue/src/index.ts"),
      name: "MiniVue",
      formats: ["es", "cjs", "umd", "iife"],
      fileName: (format) => `mini-vue.${format}.js`
    }
  },
  resolve: {
    alias: [
      {
        find: /@mini-vue\/(.+)/i,
        replacement: resolvePath("packages", "$1/src"),
      }
    ]
  }
})