import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { OUTPUT_DIR } from './build/constant';
import { createProxy } from './build/vite/proxy';
import pkg from './package.json';
import { format } from 'date-fns';
import { getConfigFileName } from './build/getConfigFileName';
import topLevelAwait from 'vite-plugin-top-level-await'; // 导入插件

const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
};

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_GLOB_PROD_MOCK, VITE_PROXY, VITE_APP_ROUTE_FILE } =
    viteEnv;
  const prodMock = VITE_GLOB_PROD_MOCK;
  const ENV_NAME = getConfigFileName(viteEnv); // 获取配置文件名
  const isBuild = command === 'build';
  console.log('viteEnv----shi', viteEnv);

  return defineConfig({
    base: VITE_PUBLIC_PATH,
    esbuild: {},
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
        {
          find: '@',
          replacement: pathResolve('src') + '/',
        },
      ],
      dedupe: ['vue'],
    },
    plugins: [
      ...createVitePlugins(viteEnv, isBuild, prodMock),
      topLevelAwait(), // 添加插件
    ],
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      'process.env.VITE_APP_ROUTE_FILE': JSON.stringify(VITE_APP_ROUTE_FILE),
      // 将环境变量暴露给 window 对象
      [`window.${ENV_NAME}`]: JSON.stringify(viteEnv),
    },
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    optimizeDeps: {
      include: [],
      exclude: ['vue-demi'],
    },
    build: {
      target: 'esnext', // 设置目标环境为 esnext 以支持顶层 await
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      reportCompressedSize: true,
      chunkSizeWarningLimit: 2000,
    },
  });
};
