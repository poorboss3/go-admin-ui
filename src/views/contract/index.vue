<!-- eslint-disable vue/max-attributes-per-line -->

<template>
  <div>
    <!-- logo -->
    <div v-show="isFirst" class="admin">
      <div class="top">
        <!-- images -->
        <div class="images"><img src="@/assets/customer/images/3d-render-gift-box-with-ribbon-present-package.jpg" alt=""></div>
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
    </div>
    <div v-show="!isFirst" class="box">
      <div class="top">
        <p>Thanks for signing up!</p>
        <p>Share your address for gift delivery</p>
      </div>
      <div class="title-1">Select the giveaway</div>
      <div class="commodity">
        <div class="img">
          <img src="@/assets/customer/images/746d3033b467e562fc29c7072a34eaa.png" alt="">
        </div>
        <div class="particulars">
          <div class="name" />
          <div class="describe">laptop bag</div>
          <div class="price" />
        </div>
      </div>
      <div class="title-2">Delivery</div>
      <div class="foot">
        <el-form ref="form" :model="form" class="sign">
          <div class="name"><span>*</span>Phone</div>
          <input v-model="form.phoneNumber" type="text" placeholder="Phone" class="input1">
          <div class="id"><span>*</span>Address1</div>
          <textarea v-model="form.address1" name="" cols="20" rows="5" placeholder="Address1" class="Address1" />
          <div class="id"><span>*</span>Address2</div>
          <textarea v-model="form.address2" name="" cols="20" rows="5" placeholder="Address2" class="Address2" />
          <div class="flex">
            <div class="flex-box">
              <div class="City"><span>*</span>City</div>
              <input v-model="form.city" type="text" value="" placeholder="City" class="input2">
            </div>
            <div class="flex-box">
              <div class="State"><span>*</span>State</div>
              <input v-model="form.state" type="text" value="" placeholder="State" class="input2">
            </div>
            <div class="flex-box">
              <div class="Zip-code"><span>*</span>Zip code</div>
              <input v-model="form.zipCode" type="text" value="" placeholder="Zip code" class="input2">
            </div>
            <div class="flex-box">
              <div class="Country"><span>*</span>Country</div>
              <input v-model="form.country" type="text" value="" placeholder="Country" class="input2">
            </div>
            <div style="text-align: center;">
              <el-button type="primary" class="submitbt" @click="submitAddressForm">submit</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <!-- foot -->
  </div>
</template>

<script>
import '@/assets/customer/style.css'
import '@/assets/customer/commodity.css'
import { addCustomer, updateCustomer } from '@/api/admin/tb-customer'
// import { getEmailTemplate } from '@/api/admin/tb-email-template'

export default {
  name: 'Contract',
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
      },
      isFirst: true
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
              this.isFirst = false
              this.form.id = response.data
            } else {
              this.msgError(response.msg)
            }
          })
        }
      })
      // this.sendEmail()
    },
    submitAddressForm: function() {
      updateCustomer(this.form).then(response => {
        if (response.code === 200) {
          this.$message('Successful')
        } else {
          this.msgError(response.msg)
        }
      })
    }
  }
}
</script>
