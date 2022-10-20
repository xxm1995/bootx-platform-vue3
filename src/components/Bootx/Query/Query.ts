// 数字
import { LabeledValueType } from 'ant-design-vue/lib/vc-tree-select/TreeSelect'

export const NUMBER = 'number'
// 字符串
export const STRING = 'string'
// 布尔
export const BOOLEAN = 'boolean'
// 日期
export const DATE = 'date'
// 时间
export const TIME = 'time'
// 日期时间
export const DATE_TIME = 'date_time'
// 列表
export const LIST = 'list'

/**
 * 查询属性
 */
export interface QueryField {
  //类型
  type: 'number' | 'string' | 'boolean' | 'date' | 'time' | 'date_time' | 'list'
  // 提示
  placeholder?: string
  // 字段名称
  field: string
  // 栅格宽度
  md: number
  // 显示名称
  name: string
  // 精度
  precision?: number | null
  // 查询列表
  selectList?: LabeledValueType[] | null
  // 时间格式化
  format?: string | null
}