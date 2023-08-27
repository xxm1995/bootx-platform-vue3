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
        <a-form-item label="问题分类" name="classify">
          <a-input v-model:value="form.classify" :disabled="showable" placeholder="请输入问题分类" />
        </a-form-item>
        <a-form-item label="时间" name="time">
          <a-input v-model:value="form.time" :disabled="showable" placeholder="请输入时间" />
        </a-form-item>
        <a-form-item label="联系方式" name="contact">
          <a-input v-model:value="form.contact" :disabled="showable" placeholder="请输入联系方式" />
        </a-form-item>
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="form.name" :disabled="showable" placeholder="请输入姓名" />
        </a-form-item>
        <a-form-item label="反馈用户ID" name="userId">
          <a-input v-model:value="form.userId" :disabled="showable" placeholder="请输入反馈用户ID" />
        </a-form-item>
        <a-form-item label="内容" name="content">
          <a-input v-model:value="form.content" :disabled="showable" placeholder="请输入内容" />
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
  import { add, get, update, FeedbackInfo } from './FeedbackInfo.api'
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
  let form = $ref<FeedbackInfo>({
    id: null,
    classify: null,
    time: null,
    contact: null,
    name: null,
    userId: null,
    content: null,
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
