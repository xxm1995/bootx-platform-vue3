<template>
  <basic-modal
    v-bind="$attrs"
    :loading="confirmLoading"
    :title="title"
    :width="modalWidth"
    :visible="visible"
    :mask-closable="showable"
    @cancel="handleCancel"
  >
    <a-form
      class="small-from-item"
      ref="formRef"
      :model="form"
      :rules="rules"
      :validate-trigger="['blur', 'change']"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="主键" name="id" :hidden="true">
        <a-input v-model:value="form.id" :disabled="showable" />
      </a-form-item>
      <a-form-item label="最大密码错误数" name="maxPwdErrorCount">
        <a-input v-model:value="form.maxPwdErrorCount" :disabled="showable" placeholder="请输入最大密码错误数" />
      </a-form-item>
      <a-form-item label="密码错误锁定时间(分钟)" name="errorLockTime">
        <a-input v-model:value="form.errorLockTime" :disabled="showable" placeholder="请输入密码错误锁定时间(分钟)" />
      </a-form-item>
      <a-form-item label="强制修改初始密码" name="requireChangePwd">
        <a-input v-model:value="form.requireChangePwd" :disabled="showable" placeholder="请输入强制修改初始密码" />
      </a-form-item>
      <a-form-item label="强制修改初始密码" name="defaultPassword">
        <a-input v-model:value="form.defaultPassword" :disabled="showable" placeholder="请输入强制修改初始密码" />
      </a-form-item>
      <a-form-item label="更新频率" name="updateFrequency">
        <a-input v-model:value="form.updateFrequency" :disabled="showable" placeholder="请输入更新频率" />
      </a-form-item>
      <a-form-item label="到期提醒(天数)" name="expireRemind">
        <a-input v-model:value="form.expireRemind" :disabled="showable" placeholder="请输入到期提醒(天数)" />
      </a-form-item>
      <a-form-item label="与登录名相同" name="sameAsLoginName">
        <a-input v-model:value="form.sameAsLoginName" :disabled="showable" placeholder="请输入与登录名相同" />
      </a-form-item>
      <a-form-item label="不能与近期多少次密码相同" name="recentPassword">
        <a-input v-model:value="form.recentPassword" :disabled="showable" placeholder="请输入不能与近期多少次密码相同" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space>
        <a-button key="cancel" @click="handleCancel">取消</a-button>
        <a-button v-if="!showable" key="forward" :loading="confirmLoading" type="primary" @click="handleOk">保存</a-button>
      </a-space>
    </template>
  </basic-modal>
</template>

<script lang="ts" setup>
  import { nextTick, reactive } from 'vue'
  import { $ref } from 'vue/macros'
  import useFormEdit from '/@/hooks/bootx/useFormEdit'
  import { add, get, update, PasswordSecurityConfig } from './PasswordSecurityConfig.api'
  import { FormInstance, Rule } from 'ant-design-vue/lib/form'
  import { FormEditType } from '/@/enums/formTypeEnum'
  import { BasicModal } from '/@/components/Modal'
  const {
    initFormEditType,
    handleCancel,
    search,
    labelCol,
    wrapperCol,
    modalWidth,
    title,
    confirmLoading,
    visible,
    editable,
    showable,
    formEditType,
  } = useFormEdit()
  // 表单
  const formRef = $ref<FormInstance>()
  let form = $ref<PasswordSecurityConfig>({
    id: null,
    maxPwdErrorCount: null,
    errorLockTime: null,
    requireChangePwd: null,
    defaultPassword: null,
    updateFrequency: null,
    expireRemind: null,
    sameAsLoginName: null,
    recentPassword: null,
  })
  // 校验
  const rules = reactive({} as Record<string, Rule[]>)
  // 事件
  const emits = defineEmits(['ok'])

  /**
   * 入口
   */
  function init(id, editType: FormEditType) {
    initFormEditType(editType)
    resetForm()
    getInfo(id, editType)
  }

  /**
   * 获取信息
   */
  function getInfo(id, editType: FormEditType) {
    if ([FormEditType.Edit, FormEditType.Show].includes(editType)) {
      confirmLoading.value = true
      get(id).then(({ data }) => {
        form = data
        confirmLoading.value = false
      })
    } else {
      confirmLoading.value = false
    }
  }

  /**
   * 保存
   */
  function handleOk() {
    formRef?.validate().then(async () => {
      confirmLoading.value = true
      if (formEditType.value === FormEditType.Add) {
        await add(form)
      } else if (formEditType.value === FormEditType.Edit) {
        await update(form)
      }
      confirmLoading.value = false
      handleCancel()
      emits('ok')
    })
  }

  /**
   * 重置表单
   */
  function resetForm() {
    nextTick(() => {
      formRef?.resetFields()
    })
  }
  defineExpose({
    init,
  })
</script>

<style lang="less" scoped></style>
