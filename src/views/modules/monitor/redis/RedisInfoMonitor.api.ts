import { defHttp } from '/@/utils/http/axios'
import { Result } from '/#/axios'

/**
 * 获取
 */
export const getRedisInfo = () => {
  return defHttp.get<Result<any>>({
    url: '/monitor/system/getRedisInfo',
  })
}
