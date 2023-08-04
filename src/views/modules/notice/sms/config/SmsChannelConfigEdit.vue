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
        <a-form-item label="" name="code">
          <a-input v-model:value="form.code" :disabled="showable" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="" name="name">
          <a-input v-model:value="form.name" :disabled="showable" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="" name="state">
          <a-input v-model:value="form.state" :disabled="showable" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="" name="accessKey">
          <a-input v-model:value="form.accessKey" :disabled="showable" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="" name="accessKeySecret">
          <a-input v-model:value="form.accessKeySecret" :disabled="showable" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="" name="templateId">
          <a-input v-model:value="form.templateId" :disabled="showable" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="" name="config">
          <a-input v-model:value="form.config" :disabled="showable" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="" name="remark">
          <a-input v-model:value="form.remark" :disabled="showable" placeholder="请输入" />
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
  import { add, get, update, SmsChannelConfig } from './SmsChannelConfig.api'
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
  let form = $ref<SmsChannelConfig>({
    id: null,
    code: null,
    name: null,
    state: null,
    accessKey: null,
    accessKeySecret: null,
    templateId: null,
    config: null,
    remark: null,
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
