import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';
import * as Icons from '@vicons/antd';

const IFrame = () => import('@/views/iframe/index.vue');

const dynamicImportIcon = (iconName: string) => {
  const icon = Icons[iconName];
  if (!icon) {
    console.warn(`Icon not found: ${iconName}`);
  }
  return icon;
};

const fetchRoutes = async (): Promise<Array<RouteRecordRaw>> => {
  try {
    const response = await fetch('/report.json');
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
          const icon = dynamicImportIcon(route.meta.icon);
          if (icon) {
            route.meta.icon = renderIcon(icon);
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

const initializeRoutes = async () => {
  const routes: Array<RouteRecordRaw> = await fetchRoutes();
  return routes;
};

const routes = await initializeRoutes();
export default routes;
