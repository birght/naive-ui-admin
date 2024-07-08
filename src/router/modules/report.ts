import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { renderIcon } from '@/utils/index';
import { DashboardOutlined, FileTextOutlined, CheckCircleOutlined } from '@vicons/antd';

const IFrame = () => import('@/views/iframe/index.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/comprehensive-regulation',
    name: 'ComprehensiveRegulation',
    component: Layout,
    redirect: '/comprehensive-regulation/drug-production',
    meta: {
      title: '综合监管',
      icon: renderIcon(DashboardOutlined),
    },
    children: [
      {
        path: 'drug-production',
        name: 'drug-production-daily-inspection',
        meta: {
          title: '药品生产企业日常检查统计',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=2ea562a3c39c629b',
        },
        component: IFrame,
      },
      {
        path: 'cosmetics-inspection',
        name: 'cosmetics-inspection-personnel',
        meta: {
          title: '化妆品检查人员统计',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=429b36c14755a4c5',
        },
        component: IFrame,
      },
    ],
  },
  {
    path: '/standardized-supervision',
    name: 'StandardizedSupervision',
    component: Layout,
    redirect: '/standardized-supervision/special-inspection-analysis',
    meta: {
      title: '标准化监督检查分析',
      icon: renderIcon(FileTextOutlined),
    },
    children: [
      {
        path: 'special-inspection-analysis',
        name: 'special-inspection-analysis',
        meta: {
          title: '专项检查分析',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=e97a723973a865cd',
        },
        component: IFrame,
      },
      {
        path: 'enterprise-statistics',
        name: 'enterprise-statistics',
        meta: {
          title: '查处企业统计',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=616b167dfb53d578',
        },
        component: IFrame,
      },
      {
        path: 'inspection-item-list-analysis',
        name: 'inspection-item-list-analysis',
        meta: {
          title: '检查事项清单分析',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=2a48d6f3f1490299',
        },
        component: IFrame,
      },
      {
        path: 'inspection-item-log-analysis',
        name: 'inspection-item-log-analysis',
        meta: {
          title: '检查事项日志分析',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=863104b73b2eb410',
        },
        component: IFrame,
      },
      {
        path: 'enforcement-personnel-analysis',
        name: 'enforcement-personnel-analysis',
        meta: {
          title: '执法人员分析',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=f836ed6168e94f7c',
        },
        component: IFrame,
      },
    ],
  },
  {
    path: '/sampling-management',
    name: 'SamplingManagement',
    component: Layout,
    redirect: '/sampling-management/unqualified-product',
    meta: {
      title: '两品一械抽检管理统计分析',
      icon: renderIcon(CheckCircleOutlined),
    },
    children: [
      {
        path: 'unqualified-product',
        name: 'unqualified-product-distribution',
        meta: {
          title: '不合格产品生产企业地域分布统计',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=91a7e48f8658ce7b',
        },
        component: IFrame,
      },
      {
        path: 'enterprise-sampling-coverage',
        name: 'enterprise-sampling-coverage',
        meta: {
          title: '企业抽检覆盖率统计',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=100943679b03c0d6',
        },
        component: IFrame,
      },
      {
        path: 'product-sampling-coverage',
        name: 'product-sampling-coverage',
        meta: {
          title: '品种抽检覆盖率统计',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=eeba4aa4af5a191b',
        },
        component: IFrame,
      },
      {
        path: 'sample-distribution',
        name: 'sample-distribution',
        meta: {
          title: '各市县抽样样本分布情况',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=83f685e0ae09c8d4',
        },
        component: IFrame,
      },
      {
        path: 'inspection-batch-statistics',
        name: 'inspection-batch-statistics',
        meta: {
          title: '检验机构检验批次/不合格批次统计',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=9641e65adb778171',
        },
        component: IFrame,
      },
      {
        path: 'repeatedly-unqualified-statistics',
        name: 'repeatedly-unqualified-statistics',
        meta: {
          title: '被抽样企业多次不合格统计',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=26d4377f43ef896a',
        },
        component: IFrame,
      },
      {
        path: 'sampling-data-ranking',
        name: 'sampling-data-ranking',
        meta: {
          title: '各药监局抽样数据排名统计',
          frameSrc: 'http://10.4.129.55:8080/dataviz-web/src/q.html?s=5d3733558542e91d',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
