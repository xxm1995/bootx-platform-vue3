<template>
  <div>
    <div class="m-3 p-3 bg-white">
      <a-textarea v-model:value="sql" show-count allow-clear placeholder="请输入要查询的SQL" :auto-size="{ minRows: 3, maxRows: 10 }" />
      <a-space style="margin-top: 1.5em">
        <a-button type="primary" @click="query">查询</a-button>
        <a-button @click="reset">重置</a-button>
      </a-space>
    </div>
    <div class="m-3 p-3 bg-white">
      <vxe-toolbar ref="xToolbar" custom />
      <vxe-table ref="xTable" :data="records" :loading="loading">
        <vxe-column type="seq" width="60" />
        <vxe-column v-for="o in fields" :key="o" :field="o" :title="o" />
      </vxe-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { $ref } from 'vue/macros'
  import { querySql } from '/@/views/modules/develop/query/SqlQuery.api'
  import { VxeTableInstance, VxeToolbarInstance } from 'vxe-table'
  import { onMounted } from 'vue'

  let sql = $ref<string>('')
  let loading = $ref(false)
  let records = $ref<object[]>([])

  let fields = $ref<string[]>(['字段1', '字段2', '字段3', '字段4', '字段5', '字段6', '字段7'])

  const xTable = $ref<VxeTableInstance>()
  const xToolbar = $ref<VxeToolbarInstance>()

  onMounted(() => {
    vxeBind()
  })

  function vxeBind() {
    xTable?.connect(xToolbar as VxeToolbarInstance)
  }

  function query() {
    loading = true
    querySql(sql).then(({ data }) => {
      fields = data.fields
      records = data.data
      loading = false
    })
  }

  /**
   * 重置
   */
  function reset() {
    loading = false
    records = []
    fields = ['字段1', '字段2', '字段3', '字段4', '字段5', '字段6', '字段7']
  }
</script>

<style lang="less" scoped></style>
