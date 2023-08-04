import { defHttp } from '/@/utils/http/axios'
import { PageResult, Result } from '/#/axios'
import { BaseEntity } from '/#/web'

/**
 * 分页
 */
export function page(params) {
  return defHttp.get<Result<PageResult<SmsChannelConfig>>>({
    url: '/sms/page',
    params,
  })
}

/**
 * 查询全部
 */
export function findAll() {
  return defHttp.get<Result<SmsChannelConfig[]>>({
    url: '/sms/findAll',
  })
}

/**
 * 获取单条
 */
export function get(id) {
  return defHttp.get<Result<SmsChannelConfig>>({
    url: '/sms/findById',
    params: { id },
  })
}

/**
 * 添加
 */
export function add(obj: SmsChannelConfig) {
  return defHttp.post({
    url: '/sms/add',
    data: obj,
  })
}

/**
 * 更新
 */
export function update(obj: SmsChannelConfig) {
  return defHttp.post({
    url: '/sms/update',
    data: obj,
  })
}

/**
 * 删除
 */
export function del(id) {
  return defHttp.delete({
    url: '/sms/delete',
    params: { id },
  })
}

/**
 * 短信渠道配置
 */
export interface SmsChannelConfig extends BaseEntity {
  // 
  code?: string
  // 
  name?: string
  // 
  state?: string
  // 
  accessKey?: string
  // 
  accessKeySecret?: string
  // 
  templateId?: string
  // 
  config?: string
  // 
  remark?: string
}
