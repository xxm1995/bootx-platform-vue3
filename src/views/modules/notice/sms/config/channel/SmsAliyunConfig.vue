<template>
  <basic-drawer showFooter v-bind="$attrs" width="60%" :title="title" :visible="visible" :maskClosable="false" @close="handleCancel">
    <a-spin :spinning="confirmLoading">
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
        <a-form-item label="AppId" name="appId">
          <a-input v-model:value="form.appId" :disabled="showable" placeholder="请输入支付宝商户AppId" />
        </a-form-item>
        <a-form-item label="异步通知URL" name="notifyUrl">
          <a-input v-model:value="form.notifyUrl" :disabled="showable" placeholder="请输入异步通知URL" />
        </a-form-item>
        <a-form-item label="同步通知URL" name="returnUrl">
          <a-input v-model:value="form.returnUrl" :disabled="showable" placeholder="请输入同步通知URL" />
        </a-form-item>
        <a-form-item label="支付网关URL" name="serverUrl">
          <a-input v-model:value="form.serverUrl" :disabled="showable" placeholder="请输入支付网关URL" />
        </a-form-item>
        <a-form-item label="默认支付超时配置(分钟)" name="expireTime">
          <a-input-number
            :min="1"
            :max="12000"
            :step="1"
            :disabled="showable"
            placeholder="请输入超时配置"
            v-model:value="form.expireTime"
          />
        </a-form-item>
        <a-form-item label="支持支付方式" name="payWayList">
          <a-select
            allowClear
            mode="multiple"
            v-model:value="form.payWayList"
            :disabled="showable"
            :options="payWayList"
            style="width: 100%"
            placeholder="选择支付方式"
          />
        </a-form-item>
        <a-form-item label="沙箱环境" name="sandbox">
          <a-switch checked-children="是" un-checked-children="否" v-model:checked="form.sandbox" :disabled="showable" />
        </a-form-item>
        <a-form-item v-show="showable" label="是否启用" name="activity">
          <a-tag>{{ form.activity ? '启用' : '未启用' }}</a-tag>
        </a-form-item>
        <a-form-item label="认证方式" name="authType">
          <a-select allowClear :disabled="showable" v-model:value="form.authType" style="width: 100%" placeholder="选择认证方式">
            <a-select-option key="key">公钥模式</a-select-option>
            <a-select-option key="cart">证书模式</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="签名类型" name="signType">
          <a-select allowClear :disabled="showable" v-model:value="form.signType" style="width: 100%" placeholder="选择签名类型">
            <a-select-option key="RSA2">RSA2秘钥</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-show="form.authType === 'key'" label="支付宝公钥" name="alipayPublicKey">
          <a-textarea :rows="5" v-model:value="form.alipayPublicKey" :disabled="showable" placeholder="请输入支付宝公钥" />
        </a-form-item>
        <a-form-item v-show="form.authType === 'cart'" label="应用公钥证书" name="appCert">
          <a-upload
            v-if="!form.appCert"
            :disabled="showable"
            name="file"
            :multiple="false"
            :action="uploadAction"
            :headers="tokenHeader"
            :showUploadList="false"
            @change="(info) => handleChange(info, 'appCert')"
          >
            <a-button type="primary" preIcon="carbon:cloud-upload"> 应用证书上传 </a-button>
          </a-upload>
          <a-input v-else defaultValue="apiclient_cert" disabled>
            <template #addonAfter v-if="!showable">
              <a-tooltip>
                <template #title> 删除上传的证书文件 </template>
                <icon @click="form.appCert = ''" icon="ant-design:close-circle-outlined" :size="20" />
              </a-tooltip>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item v-show="form.authType === 'cart'" label="支付宝公钥证书" name="alipayCert">
          <!--          <a-textarea :rows="5" v-model:value="form.alipayCert" :disabled="showable" placeholder="请输入支付宝公钥证书内容" />-->
          <a-upload
            v-if="!form.alipayCert"
            :disabled="showable"
            name="file"
            :multiple="false"
            :action="uploadAction"
            :headers="tokenHeader"
            :showUploadList="false"
            @change="(info) => handleChange(info, 'alipayCert')"
          >
            <a-button type="primary" preIcon="carbon:cloud-upload"> 公钥证书上传 </a-button>
          </a-upload>
          <a-input v-else defaultValue="alipay.cert" disabled>
            <template #addonAfter v-if="!showable">
              <a-tooltip>
                <template #title> 删除上传的证书文件 </template>
                <icon @click="form.alipayCert = ''" icon="ant-design:close-circle-outlined" :size="20" />
              </a-tooltip>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item v-show="form.authType === 'cart'" label="支付宝CA根证书" name="alipayRootCert">
          <!--          <a-textarea :rows="5" v-model:value="form.alipayRootCert" :disabled="showable" placeholder="请输入支付宝CA根证书" />-->
          <a-upload
            v-if="!form.alipayRootCert"
            :disabled="showable"
            name="file"
            :multiple="false"
            :action="uploadAction"
            :headers="tokenHeader"
            :showUploadList="false"
            @change="(info) => handleChange(info, 'alipayRootCert')"
          >
            <a-button type="primary" preIcon="carbon:cloud-upload"> CA根证书上传 </a-button>
          </a-upload>
          <a-input v-else defaultValue="alipayRootCert" disabled>
            <template #addonAfter v-if="!showable">
              <a-tooltip>
                <template #title> 删除上传的证书文件 </template>
                <icon @click="form.alipayRootCert = ''" icon="ant-design:close-circle-outlined" :size="20" />
              </a-tooltip>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item label="应用私钥" name="privateKey">
          <a-textarea :rows="5" v-model:value="form.privateKey" :disabled="showable" placeholder="请输入应用私钥" />
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-textarea v-model:value="form.remark" :disabled="showable" placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </a-spin>
  </basic-drawer>
</template>

<script setup lang="ts">
  import useFormEdit from '/@/hooks/bootx/useFormEdit'
  import BasicDrawer from '/@/components/Drawer/src/BasicDrawer.vue'
  import { FormInstance } from 'ant-design-vue/lib/form'
  import { FormEditType } from '/@/enums/formTypeEnum'
  import { Rule } from '/@/components/Form'

  const {
    initFormEditType,
    handleCancel,
    search,
    diffForm,
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

  const formRef = $ref<FormInstance>()

  let editType = $ref<FormEditType>()
  let rawForm: any = null

  const rules = {} as Record<string, Rule[]>
  // 事件
  const emits = defineEmits(['ok'])
  /**
   * 入口
   */
  function init(){

  }
</script>

<style scoped lang="less"></style>
