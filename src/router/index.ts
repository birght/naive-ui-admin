import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { RedirectRoute } from '@/router/base';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from './guards';

const routeFile = import.meta.env.VITE_APP_ROUTE_FILE;

console.log('Route File:', routeFile);

// 默认加载dashboard路由
const modulesDashboard = import.meta.glob<{ default: RouteRecordRaw[] }>('./modules/dashboard.ts', {
  eager: true,
});

console.log('Modules Dashboard:', modulesDashboard);

// 加载根据环境变量动态导入的路由
let modules: Record<string, { default: RouteRecordRaw[] }> = {};

if (routeFile === 'report') {
  modules = import.meta.glob<{ default: RouteRecordRaw[] }>('./modules/report.ts', {
    eager: true,
  });
} else if (routeFile === 'reportBuild') {
  modules = import.meta.glob<{ default: RouteRecordRaw[] }>('./modules/reportBuild.ts', {
    eager: true,
  });
}

console.log('Modules:', modules);

const routeModuleList: RouteRecordRaw[] = [];

// 加载默认dashboard路由
Object.keys(modulesDashboard).forEach((key) => {
  routeModuleList.push(...modulesDashboard[key].default);
});

// 加载根据环境变量动态导入的路由
Object.keys(modules).forEach((key) => {
  routeModuleList.push(...modules[key].default);
});

function sortRoute(a: RouteRecordRaw, b: RouteRecordRaw) {
  return Number(a.meta?.sort ?? 0) - Number(b.meta?.sort ?? 0);
}

routeModuleList.sort(sortRoute);

console.log('routeModuleList', routeModuleList);

export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录',
  },
};

// 需要验证权限的路由
export const asyncRoutes = [...routeModuleList];

// 普通路由，无需验证权限
export const constantRouter: RouteRecordRaw[] = [LoginRoute, RootRoute, RedirectRoute];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
