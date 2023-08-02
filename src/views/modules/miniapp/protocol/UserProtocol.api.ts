import { defHttp } from '/@/utils/http/axios'
import { PageResult, Result } from '/#/axios'
import { BaseEntity } from '/#/web'

/**
 * 分页
 */
export function page(params) {
  return defHttp.get<Result<PageResult<UserProtocol>>>({
    url: '/user/protocol/page',
    params,
  })
}

/**
 * 查询全部
 */
export function findAll() {
  return defHttp.get<Result<UserProtocol[]>>({
    url: '/user/protocol/findAll',
  })
}

/**
 * 获取单条
 */
export function get(id) {
  return defHttp.get<Result<UserProtocol>>({
    url: '/user/protocol/findById',
    params: { id },
  })
}

/**
 * 添加
 */
export function add(obj: UserProtocol) {
  return defHttp.post({
    url: '/user/protocol/add',
    data: obj,
  })
}

/**
 * 更新
 */
export function update(obj: UserProtocol) {
  return defHttp.post({
    url: '/user/protocol/update',
    data: obj,
  })
}

/**
 * 删除
 */
export function del(id) {
  return defHttp.delete({
    url: '/user/protocol/delete',
    params: { id },
  })
}

/**
 * 用户协议
 */
export interface UserProtocol extends BaseEntity {
  // 编码
  code?: string
  // 内容
  content?: string
  // 备注
  remark?: string
}
