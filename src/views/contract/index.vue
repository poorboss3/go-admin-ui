<!-- eslint-disable vue/max-attributes-per-line -->

<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <label for="name">姓名:</label>
      <input id="name" v-model="form.name" type="text" placeholder="Please input your name" required>

      <label for="email">邮箱:</label>
      <input id="email" v-model="form.email" type="email" placeholder="Please input your email" required>

      <label for="id">Amazon Order ID:</label>
      <input id="id" v-model="form.amazonID" type="text" placeholder="Please input your Amazon Order ID" required>

      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
import { addCustomer } from '@/api/admin/tb-customer'
import { getEmailTemplate } from '@/api/admin/tb-email-template'

export default {
  name: 'Customer',
  components: {
  },
  data() {
    // 表单参数
    return {
      form: {
      },
      // 表单校验
      rules: { email: [{ required: true, message: 'Please input Email', trigger: 'blur' }],
        name: [{ required: true, message: 'Please input your name', trigger: 'blur' }],
        amazonID: [{ required: true, message: 'Please input amazon order ID', trigger: 'blur' }]
      },
      emailTemplate: {
        subject: '',
        context: '',
        address: ''
      }
    }
  },
  created() {
    getEmailTemplate(3).then(response => {
      this.emailTemplate = response.data
    })
  },
  methods: {
    sendEmail() {
      const mailToLink = `mailto:${this.emailTemplate.address}?subject=${encodeURIComponent(this.emailTemplate.subject)}&body=${encodeURIComponent(this.emailTemplate.context)}`
      window.open(mailToLink)
    },
    /** 提交按钮 */
    submitForm: function() {
      this.sendEmail()
      this.$refs['form'].validate(valid => {
        if (valid) {
          addCustomer(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess(response.msg)
              this.open = false
              this.getList()
            } else {
              this.msgError(response.msg)
            }
          })
        }
      })
    }
  }
}
</script>
