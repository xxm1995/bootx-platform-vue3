<template>
  <sms-aliyun-config v-if="" />
</template>

<script lang="ts" setup>
  import { $ref } from 'vue/macros'
  import { SmsChannelConfig } from './SmsChannelConfig.api'
  import { smsChannelEnum } from '/@/enums/notice/smsChannelEnum'
  import SmsAliyunConfig from './channel/SmsAliyunConfig.vue'

  // 事件
  const emits = defineEmits(['ok'])

  /**
   * 打开
   */
  function show(record: SmsChannelConfig) {
    switch (record.code) {
      case smsChannelEnum.ALIBABA: {
        break
      }
    }
  }
  /**
   * 操作完成回调
   */
  function ok() {
    emits('ok')
  }
  defineExpose({
    show,
  })
</script>

<style lang="less" scoped></style>
