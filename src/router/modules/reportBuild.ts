import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';
import * as Icons from '@vicons/antd'; // 导入所有图标

const IFrame = () => import('@/views/iframe/index.vue');

const fetchRoutes = async (): Promise<Array<RouteRecordRaw>> => {
  try {
    const response = await fetch('./reportBuild.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    const routes = await Promise.all(
      data.map(async (route: any) => {
        if (route.children) {
          route.children = await Promise.all(
            route.children.map(async (child: any) => {
              if (child.component === 'IFrame') {
                child.component = IFrame;
              }
              return child;
            })
          );
        }
        if (route.meta && route.meta.icon) {
          const icon = (Icons as any)[route.meta.icon];
          if (icon) {
            route.meta.icon = renderIcon(icon);
          } else {
            console.warn(`Icon not found: ${route.meta.icon}`);
          }
        }
        if (route.component === 'Layout') {
          route.component = Layout;
        }
        return route;
      })
    );

    return routes;
  } catch (error) {
    console.error('Failed to load routes:', error);
    return [];
  }
};

const routes: Array<RouteRecordRaw> = await fetchRoutes();

export default routes;
