<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form
          ref="queryForm"
          :model="queryParams"
          :inline="true"
          label-width="68px"
        >
          <el-form-item
            label="Email"
            prop="email"
          ><el-input
            v-model="queryParams.email"
            placeholder="请输入"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item
            label="Name"
            prop="name"
          ><el-input
            v-model="queryParams.name"
            placeholder="请输入"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>
          <el-form-item
            label="Amazon Order ID"
            prop="amazonID"
          ><el-input
            v-model="queryParams.amazonID"
            placeholder="请输入"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="handleQuery"
            >搜索</el-button>
            <el-button
              icon="el-icon-refresh"
              size="mini"
              @click="resetQuery"
            >重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:customer:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:customer:edit']"
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:customer:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除
            </el-button>
          </el-col>
        </el-row>

        <el-table
          v-loading="loading"
          :data="customerList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          /><el-table-column
            label="Email"
            align="center"
            prop="email"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="Name"
            align="center"
            prop="name"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="Amazon Order ID"
            align="center"
            prop="amazonID"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="Phone Number"
            align="center"
            prop="phoneNumber"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="Address1"
            align="center"
            prop="address1"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="Address2"
            align="center"
            prop="address2"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="City"
            align="center"
            prop="city"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="State"
            align="center"
            prop="state"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="Zip Code"
            align="center"
            prop="zipCode"
            :show-overflow-tooltip="true"
          /><el-table-column
            label="Country"
            align="center"
            prop="country"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要修改吗?"
                confirm-button-text="修改"
                @confirm="handleUpdate(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:customer:edit']"
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                >修改
                </el-button>
              </el-popconfirm>
              <el-popconfirm
                class="delete-popconfirm"
                title="确认要删除吗?"
                confirm-button-text="删除"
                @confirm="handleDelete(scope.row)"
              >
                <el-button
                  slot="reference"
                  v-permisaction="['admin:customer:remove']"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                >删除
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total > 0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

        <!-- 添加或修改对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="500px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email" placeholder="" />
            </el-form-item>
            <el-form-item label="Name" prop="name">
              <el-input v-model="form.name" placeholder="" />
            </el-form-item>
            <el-form-item label="Amazon Order ID" prop="amazonID">
              <el-input v-model="form.amazonID" placeholder="" />
            </el-form-item>
            <el-form-item label="Phone Number" prop="phoneNumber">
              <el-input v-model="form.phoneNumber" placeholder="" />
            </el-form-item>
            <el-form-item label="Address1" prop="address1">
              <el-input v-model="form.address1" placeholder="" />
            </el-form-item>
            <el-form-item label="Address2" prop="address2">
              <el-input v-model="form.address2" placeholder="" />
            </el-form-item>
            <el-form-item label="City" prop="city">
              <el-input v-model="form.city" placeholder="" />
            </el-form-item>
            <el-form-item label="State" prop="state">
              <el-input v-model="form.state" placeholder="" />
            </el-form-item>
            <el-form-item label="Zip Code" prop="zipCode">
              <el-input v-model="form.zipCode" placeholder="" />
            </el-form-item>
            <el-form-item label="Country" prop="country">
              <el-input v-model="form.country" placeholder="" />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import {
  addCustomer,
  delCustomer,
  getCustomer,
  listCustomer,
  updateCustomer
} from '@/api/admin/tb-customer'
export default {
  name: 'Customer',
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      isEdit: false,
      // 类型数据字典
      typeOptions: [],
      customerList: [],
      // 关系表类型
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        email: undefined,
        name: undefined,
        amazonID: undefined
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        email: [{ required: true, message: '不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        amazonID: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listCustomer(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.customerList = response.data.list
          this.total = response.data.count
          this.loading = false
        }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        email: undefined,
        name: undefined,
        amazonID: undefined,
        phoneNumber: undefined,
        address1: undefined,
        address2: undefined,
        city: undefined,
        state: undefined,
        zipCode: undefined,
        country: undefined
      }
      this.resetForm('form')
    },
    getImgList: function() {
      this.form[this.fileIndex] =
        this.$refs['fileChoose'].resultList[0].fullUrl
    },
    fileClose: function() {
      this.fileOpen = false
    },
    // 关系
    // 文件
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加Customer'
      this.isEdit = false
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getCustomer(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改Customer'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateCustomer(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addCustomer(this.form).then((response) => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      var Ids = (row.id && [row.id]) || this.ids

      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return delCustomer({ ids: Ids })
        })
        .then((response) => {
          if (response.code === 200) {
            this.msgSuccess(response.msg)
            this.open = false
            this.getList()
          } else {
            this.msgError(response.msg)
          }
        })
        .catch(function() {})
    }
  }
}
</script>
