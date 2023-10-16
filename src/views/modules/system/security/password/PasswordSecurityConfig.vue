<template>
  <div>
    <div class="m-3 p-3 bg-white">
      <a-spin :spinning="loading">
        <a-form ref="formRef" :validate-trigger="['blur', 'change']" :label-col="2" :model="form" :rules="rules">
          <a-row>
            <a-col :offset="5" :span="6">
              <a-form-item label="最大密码错误数" class="w-400px" name="name">
                <a-input-number placeholder="请输入排序，可以是小数" :precision="0" v-model:value="form.maxPwdErrorCount" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="密码错误锁定时间(分钟)" class="w-400px" name="name">
                <a-input-number placeholder="请输入排序，可以是小数" :precision="0" v-model:value="form.maxPwdErrorCount" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :offset="5" :span="6">
              <a-form-item label="最大密码错误数" class="w-400px" name="name">
                <a-input-number placeholder="请输入排序，可以是小数" :precision="0" v-model:value="form.maxPwdErrorCount" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="密码错误锁定时间(分钟)" class="w-400px" name="name">
                <a-input-number placeholder="请输入排序，可以是小数" :precision="0" v-model:value="form.maxPwdErrorCount" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :push="8">
              <a-button :disabled="edit" type="primary" @click="addOrUpdate">保存信息</a-button>
              <a-button style="margin-left: 50px" :disabled="!edit" @click="edit = true">编辑信息</a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-spin>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive } from 'vue'
  import { getDefault, PasswordSecurityConfig } from './PasswordSecurityConfig.api'
  import { $ref } from 'vue/macros'
  import { FormInstance, Rule } from 'ant-design-vue/lib/form'
  import useFormEdit from '/@/hooks/bootx/useFormEdit'
  import CollapseContainer from '/@/components/Container/src/collapse/CollapseContainer.vue'

  const { labelCol, wrapperCol } = useFormEdit()

  let form = $ref<PasswordSecurityConfig>({})
  let loading = $ref(false)
  const formRef = $ref<FormInstance>()
  let edit = $ref(false)

  const rules = reactive({} as Record<string, Rule[]>)

  onMounted(() => initData)

  /**
   * 初始化数据
   */
  function initData() {
    loading = true
    getDefault().then(({ data }) => {
      form = data
      loading = true
    })
  }

  /**
   * 保存或配置
   */
  async function addOrUpdate() {
    await formRef?.validate()
    createConfirm({
      iconType: 'warning',
      title: '警告',
      content: '是否更新用户基础信息',
      onOk: async () => {
        confirmLoading = true
        await updateBaseInfo(form)
        createMessage.success('更新用户信息成功')
        await userStore.refreshUserInfoAction()
        confirmLoading = false
      },
    })
  }
</script>

<style lang="less" scoped></style>
