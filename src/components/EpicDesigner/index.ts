// 引入k-designer样式
import 'epic-designer/dist/style.css'
import { pluginManager, setupAntd } from 'epic-designer'

export function registerEpicDesigner() {
  // 使用Antd UI
  setupAntd(pluginManager)
}
