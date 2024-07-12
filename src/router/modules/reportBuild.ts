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
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=d460bdc7deb52489',
        },
        component: IFrame,
      },
      {
        path: 'cosmetics-inspection',
        name: 'cosmetics-inspection-personnel',
        meta: {
          title: '化妆品检查人员统计',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=72a0e73dbd062e4d',
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
      title: '检查分析',
      icon: renderIcon(FileTextOutlined),
    },
    children: [
      {
        path: 'special-inspection-analysis',
        name: 'special-inspection-analysis',
        meta: {
          title: '专项检查分析',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=9cfa7793176c769c',
        },
        component: IFrame,
      },
      {
        path: 'enterprise-statistics',
        name: 'enterprise-statistics',
        meta: {
          title: '查处企业统计',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=70a70feb426ad850',
        },
        component: IFrame,
      },
      {
        path: 'inspection-item-list-analysis',
        name: 'inspection-item-list-analysis',
        meta: {
          title: '检查事项清单分析',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=519805e5d34b5598',
        },
        component: IFrame,
      },
      {
        path: 'inspection-item-log-analysis',
        name: 'inspection-item-log-analysis',
        meta: {
          title: '检查事项日志分析',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=94d0484e8443ad11',
        },
        component: IFrame,
      },
      {
        path: 'enforcement-personnel-analysis',
        name: 'enforcement-personnel-analysis',
        meta: {
          title: '执法人员分析',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=e48ef2834c182307',
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
      title: '抽检分析',
      icon: renderIcon(CheckCircleOutlined),
    },
    children: [
      {
        path: 'unqualified-product',
        name: 'unqualified-product-distribution',
        meta: {
          title: '不合格产品生产企业地域分布统计',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=b40a5f891bdee294',
        },
        component: IFrame,
      },
      {
        path: 'enterprise-sampling-coverage',
        name: 'enterprise-sampling-coverage',
        meta: {
          title: '企业抽检覆盖率统计',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=6a30aceafce62ab4',
        },
        component: IFrame,
      },
      {
        path: 'product-sampling-coverage',
        name: 'product-sampling-coverage',
        meta: {
          title: '品种抽检覆盖率统计',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=9c2a2814933e9028',
        },
        component: IFrame,
      },
      {
        path: 'sample-distribution',
        name: 'sample-distribution',
        meta: {
          title: '各市县抽样样本分布情况',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=62fa68be88e4c498',
        },
        component: IFrame,
      },
      {
        path: 'inspection-batch-statistics',
        name: 'inspection-batch-statistics',
        meta: {
          title: '检验机构检验批次/不合格批次统计',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=e14bd9859bddaa3b',
        },
        component: IFrame,
      },
      {
        path: 'repeatedly-unqualified-statistics',
        name: 'repeatedly-unqualified-statistics',
        meta: {
          title: '被抽样企业多次不合格统计',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=cce86ebc74acd0ad',
        },
        component: IFrame,
      },
      {
        path: 'sampling-data-ranking',
        name: 'sampling-data-ranking',
        meta: {
          title: '各药监局抽样数据排名统计',
          frameSrc: 'http://22.167.100.1/dataviz-web/src/q.html?s=d61a7c0250365720',
        },
        component: IFrame,
      },
    ],
  },
];

export default routes;
