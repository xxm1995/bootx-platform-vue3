import { defHttp } from '/@/utils/http/axios'
import { PageResult, Result } from '/#/axios'
import { BaseEntity } from '/#/web'

/**
 * 分页
 */
export function page(params) {
  return defHttp.get<Result<PageResult<FeedbackInfo>>>({
    url: '/feedbackinfo/page',
    params,
  })
}

/**
 * 查询全部
 */
export function findAll() {
  return defHttp.get<Result<FeedbackInfo[]>>({
    url: '/feedbackinfo/findAll',
  })
}

/**
 * 获取单条
 */
export function get(id) {
  return defHttp.get<Result<FeedbackInfo>>({
    url: '/feedbackinfo/findById',
    params: { id },
  })
}

/**
 * 添加
 */
export function add(obj: FeedbackInfo) {
  return defHttp.post({
    url: '/feedbackinfo/add',
    data: obj,
  })
}

/**
 * 更新
 */
export function update(obj: FeedbackInfo) {
  return defHttp.post({
    url: '/feedbackinfo/update',
    data: obj,
  })
}

/**
 * 删除
 */
export function del(id) {
  return defHttp.delete({
    url: '/feedbackinfo/delete',
    params: { id },
  })
}

/**
 * 批量删除
 */
export function deleteBatch(ids) {
  return defHttp.delete({
    url: '/feedbackinfo/template/delete',
    data: ids,
  })
}

/**
 * 用户反馈信息
 */
export interface FeedbackInfo extends BaseEntity {
  // 问题分类
  classify?: string
  // 时间
  time?: string
  // 联系方式
  contact?: string
  // 姓名
  name?: string
  // 反馈用户ID
  userId?: string
  // 内容
  content?: string
}
