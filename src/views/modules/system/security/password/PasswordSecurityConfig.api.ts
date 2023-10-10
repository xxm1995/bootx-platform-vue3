import { defHttp } from '/@/utils/http/axios'
import { PageResult, Result } from '/#/axios'
import { BaseEntity } from '/#/web'

/**
 * 分页
 */
export function page(params) {
  return defHttp.get<Result<PageResult<PasswordSecurityConfig>>>({
    url: '/security/password/page',
    params,
  })
}

/**
 * 查询全部
 */
export function findAll() {
  return defHttp.get<Result<PasswordSecurityConfig[]>>({
    url: '/security/password/findAll',
  })
}

/**
 * 获取单条
 */
export function get(id) {
  return defHttp.get<Result<PasswordSecurityConfig>>({
    url: '/security/password/findById',
    params: { id },
  })
}

/**
 * 添加
 */
export function add(obj: PasswordSecurityConfig) {
  return defHttp.post({
    url: '/security/password/add',
    data: obj,
  })
}

/**
 * 更新
 */
export function update(obj: PasswordSecurityConfig) {
  return defHttp.post({
    url: '/security/password/update',
    data: obj,
  })
}

/**
 * 删除
 */
export function del(id) {
  return defHttp.delete({
    url: '/security/password/delete',
    params: { id },
  })
}

/**
 * 批量删除
 */
export function deleteBatch(ids) {
  return defHttp.delete({
    url: '/security/password/template/delete',
    data: ids,
  })
}

/**
 * 密码安全策略
 */
export interface PasswordSecurityConfig extends BaseEntity {
  // 最大密码错误数
  maxPwdErrorCount?: number
  // 密码错误锁定时间(分钟)
  errorLockTime?: number
  // 强制修改初始密码
  requireChangePwd?: boolean
  // 强制修改初始密码
  defaultPassword?: string
  // 更新频率
  updateFrequency?: number
  // 到期提醒(天数)
  expireRemind?: number
  // 与登录名相同
  sameAsLoginName?: boolean
  // 不能与近期多少次密码相同
  recentPassword?: number
}
