<template>
  <div>
    <div class="m-3 p-3 pt-5 bg-white">
      <b-query :query-params="model.queryParam" :fields="fields" @query="queryPage" @reset="resetQueryParams" />
    </div>
    <div class="m-3 p-3 bg-white">
      <vxe-toolbar ref="xToolbar" custom :refresh="{ query: queryPage }">
        <template #buttons>
          <a-space>
            <a-button type="primary" pre-icon="ant-design:plus-outlined" @click="add">新建</a-button>
            <a-dropdown v-if="batchOperateFlag">
              <a-button post-icon="ant-design:down-outlined"> 批量操作 </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a @click="assignRolesBatch()">角色分配</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="assignDeptBatch()">部门分配</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="assignDataScopeBatch()">数据权限分配</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="lockUserConfirmBatch(true)">锁定账号</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="lockUserConfirmBatch(false)">解锁账号</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-space>
        </template>
      </vxe-toolbar>
      <vxe-table
        show-overflow
        ref="xTable"
        size="medium"
        @checkbox-all="selectAllEvent"
        @checkbox-change="selectChangeEvent"
        :loading="loading"
        :data="pagination.records"
      >
        <vxe-column type="checkbox" width="50" />
        <vxe-column field="name" title="姓名" />
        <vxe-column field="username" title="账号" />
        <vxe-column field="phone" title="手机号" />
        <vxe-column field="email" title="邮箱" />
        <vxe-column field="admin" title="是否管理员">
          <template #default="{ row }">
            <a-tag v-if="row.admin" color="green">是</a-tag>
            <a-tag v-else color="red">否</a-tag>
          </template>
        </vxe-column>
        <vxe-column field="status" title="用户状态">
          <template #default="{ row }">
            {{ dictConvert('UserStatusCode', row.status) }}
          </template>
        </vxe-column>
        <vxe-column field="registerTime" title="注册时间" />
        <vxe-column fixed="right" width="170" :showOverflow="false" title="操作">
          <template #default="{ row }">
            <a href="javascript:" @click="show(row)">查看</a>
            <a-divider type="vertical" />
            <a href="javascript:" @click="edit(row)">编辑</a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a> 更多 <icon icon="ant-design:down-outlined" :size="12" /> </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a @click="assignRoles(row)">角色分配</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="assignDept(row)">部门分配</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="assignDataScope(row)">数据权限分配</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a @click="resetPwd(row)">重置密码</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a v-if="row.status === 1" @click="lockUserConfirm(row.id, true)">锁定账号</a>
                    <a v-if="row.status === 3" @click="lockUserConfirm(row.id, false)">解锁账号</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </vxe-column>
      </vxe-table>
      <vxe-pager
        size="medium"
        :loading="loading"
        :current-page="pagination.current"
        :page-size="pagination.size"
        :total="pagination.total"
        @page-change="handleTableChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BQuery from '/@/components/Bootx/Query/BQuery.vue'
  import useTablePage from '/@/hooks/bootx/useTablePage'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { onMounted, ref } from 'vue'
  import { QueryField, STRING } from '/@/components/Bootx/Query/Query'
  import { $ref } from 'vue/macros'
  import { VxeTableInstance, VxeToolbarInstance } from 'vxe-table'
  import { lockUser, lockUserBatch, page, unlockUser, unlockUserBatch } from './UserInfo.api'
  import { useDict } from '/@/hooks/bootx/useDict'
  import Icon from '/@/components/Icon/src/Icon.vue'

  // 使用hooks
  const { handleTableChange, pageQueryResHandel, resetQueryParams, pagination, pages, model, loading, batchOperateFlag } =
    useTablePage(queryPage)
  const { createMessage, createConfirm } = useMessage()
  const { dictConvert } = useDict()

  // 查询条件
  const fields = [
    { field: 'username', type: STRING, name: '账号', placeholder: '请输入要查询的账号' },
    { field: 'name', type: STRING, name: '姓名', placeholder: '请输入要查询的姓名' },
  ] as QueryField[]
  let xTable = $ref<VxeTableInstance>()
  let xToolbar = $ref<VxeToolbarInstance>()

  onMounted(() => {
    vxeBind()
    queryPage()
  })
  function vxeBind() {
    xTable.connect(xToolbar)
  }

  // 分页查询
  function queryPage() {
    loading.value = true
    page({
      ...model.queryParam,
      ...pages,
    }).then(({ data }) => {
      pageQueryResHandel(data)
    })
  }
  // 选中全部
  function selectAllEvent() {
    const records = xTable.getCheckboxRecords()
    batchOperateFlag.value = !!records.length
  }
  // 选中事件
  function selectChangeEvent() {
    const records = xTable.getCheckboxRecords()
    batchOperateFlag.value = !!records.length
  }
  /**
   * 锁定/解锁用户
   * @param userId 用户id
   * @param type true 锁定, false 解锁
   */
  function lockUserConfirm(userId, type: boolean) {
    createConfirm({
      iconType: 'warning',
      title: '警告',
      content: type ? '是否锁定选中的用户' : '是否解锁选中的用户',
      onOk: async () => {
        if (type) {
          await lockUser(userId)
        } else {
          await unlockUser(userId)
        }
        queryPage()
      },
    })
  }
  /**
   * 批量锁定/解锁用户
   * @param type true 锁定, false 解锁
   */
  function lockUserConfirmBatch(type) {
    const userIds = xTable.getCheckboxRecords().map((o) => o.id)
    createConfirm({
      iconType: 'warning',
      title: '警告',
      content: type ? '是否锁定选中的用户' : '是否解锁选中的用户',
      onOk: async () => {
        if (type) {
          await lockUserBatch(userIds)
        } else {
          await unlockUserBatch(userIds)
        }
        queryPage()
      },
    })
  }
</script>

<style scoped></style>