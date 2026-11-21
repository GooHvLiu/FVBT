import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

type MessageType = 'success' | 'info' | 'warning' | 'error'

/** 统一入口，后续要换成自有通知组件只改这里 */
export function showMessage(message: string, type: MessageType = 'info'): void {
  ElMessage({
    message,
    type,
    duration: 2400,
    grouping: true,
  })
}
