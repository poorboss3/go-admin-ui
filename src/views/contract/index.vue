<!-- eslint-disable vue/max-attributes-per-line -->

<template>
  <div class="admin">
    <!-- logo -->
    <div class="top">
      <!-- images -->
      <div class="images"><img src="@/assets/customer/images/3d-render-gift-box-with-ribbon-present-package.png" alt=""></div>
      <!-- images -->

      <!-- main -->
      <div class="main">
        <div class="text01">
          <p>Unlock intimate delight with your complimentary gift</p>
        </div>
        <div class="text02">Claim your FREE Laotop bag to match the screen protector to protect your laptop</div>
      </div>
    </div>
    <!-- foot -->
    <div class="foot">
      <el-form ref="form" :model="form" :rules="rules" class="sign">
        <p>Sign up to receive </p>
        <div class="name"><span>*</span>Name</div>
        <input id="name" v-model="form.name" type="text" placeholder="Name">
        <div class="email"><span>*</span>Email Address</div>
        <input id="email" v-model="form.email" type="email" placeholder="Email Address">
        <div class="id"><span>*</span>Amazon Order ID</div>
        <input id="id" v-model="form.amazonID" type="text" class="number" placeholder="Amazon Order ID">
        <div class="find">*Find your order ID in your Amazon order history.</div>
        <div style="text-align: center;">
          <el-button type="primary" style="background-color: aliceblue;padding: 5px;" @click="submitForm">submit</el-button>
        </div>
      </el-form>
    </div>
    <!-- foot -->
  </div>
</template>

<script>
import '@/assets/customer/style.css'
import { addCustomer } from '@/api/admin/tb-customer'
// import { getEmailTemplate } from '@/api/admin/tb-email-template'

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
      rules: { email: [{ required: true, message: 'Please input Email', trigger: ['blur', 'change'] }],
        name: [{ required: true, message: 'Please input your name', trigger: ['blur', 'change'] }],
        amazonID: [{ required: true, message: 'Please input amazon order ID', trigger: ['blur', 'change'] }]
      },
      emailTemplate: {
        subject: '',
        context: '',
        address: ''
      }
    }
  },
  created() {
    // getEmailTemplate(3).then(response => {
    //   this.emailTemplate = response.data
    // })
  },
  methods: {
    sendEmail() {
      const mailToLink = `mailto:${this.emailTemplate.address}?subject=${encodeURIComponent(this.emailTemplate.subject)}&body=${encodeURIComponent(this.emailTemplate.context)}`
      window.open(mailToLink)
    },
    /** 提交按钮 */
    submitForm: function() {
      if (!this.form.name || this.form.name === '') {
        this.msgError('Please input your name')
        return
      }
      if (!this.form.email || this.form.email === '') {
        this.msgError('Please input your Email address')
        return
      }
      if (!this.form.amazonID || this.form.amazonID === '') {
        this.msgError('Please input Amazon Order ID')
        return
      }
      this.$refs['form'].validate(valid => {
        if (valid) {
          addCustomer(this.form).then(response => {
            if (response.code === 200) {
              this.$message('Successful')
            } else {
              this.msgError(response.msg)
            }
          })
        }
      })
      // this.sendEmail()
    }
  }
}
</script>
