import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'

const system: AppRouteModule = {
  path: '/system1',
  name: 'System1',
  component: LAYOUT,
  redirect: '/system1/client',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: '系统管理1',
  },
  children: [
    {
      path: 'client',
      name: 'ClientList',
      component: () => import('/@/views/modules/system/client/ClientList.vue'),
      meta: {
        title: '终端管理',
      },
    },
    {
      path: 'loginType',
      name: 'LoginTypeList',
      component: () => import('/@/views/modules/system/loginType/LoginTypeList.vue'),
      meta: {
        title: '登录方式',
      },
    },
  ],
}

export default system
