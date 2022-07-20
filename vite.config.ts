import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite';
import PurgeIcons from 'vite-plugin-purge-icons';
import { minifyHtml, injectHtml } from 'vite-plugin-html';
// https://vitejs.dev/config/
const resolve = (p: string) => {
  return path.resolve(__dirname, p);
};
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': resolve('src'),
    },
    extensions: ['.ts', '.js', '.mjs', '.vue'],
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    minifyHtml(),
    injectHtml({
      data: {
        title: '多用户导航系统',
        injectScript: '',
      },
    }),
    PurgeIcons({
      /* PurgeIcons Options */
      content: [
        '**/*.html',
        // '**/*.js',
        '**/*.vue', // scan for .vue file as well
      ],
    }),
  ],
  build: {
    assetsDir: 'static/img/',
    rollupOptions: {
      // external: ['vue'],
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
      },
    },
    outDir: 'public',
    minify: 'terser', // 混淆器，terser构建后文件体积更小
    brotliSize: false, // 不统计
    sourcemap: false,
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://api2.ujuji.com',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  //   cors: true,
  // },
});
