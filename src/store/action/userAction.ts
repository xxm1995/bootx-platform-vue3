import { closeWebSocket, initWebSocket } from '/@/logics/websocket/UserGlobalWebSocker'
import { useUserStoreWithOut } from '/@/store/modules/user'

/**
 * 用户初始化等操作, 主要用在下列两种场景上
 * 1. 用户登陆后的操作
 * 2. 刷新页面时路由重新加载
 */
export function userInitAction() {
  const userStore = useUserStoreWithOut()
  // 初始化 websocket连接.
  initWebSocket().then()
  // 刷新登陆后用户信息
  userStore.refreshUserInfoAction().then()
}

/**
 * 用户后的操作
 */
export function userLogoutAction() {
  const userStore = useUserStoreWithOut()
  // 关闭websocket
  closeWebSocket()

  // 重置 Token和用户信息 需要放最后
  userStore.resetState()
}
