
<template>
    <div>
      <div class="card" style="margin-bottom: 5px">
        <el-input v-model="data.name" prefix-icon="Search" placeholder="请输入内容" style="width: 200px; margin-right: 10px">

        </el-input>
        <el-button type="info" plain @click="load">查询</el-button>
        <el-button type="warning" plain style="margin-left: 5px" @click="reset">重载</el-button>
      </div>
      <div class="card" style="margin-bottom: 5px">
        <el-button type="primary" plain @click="handleAdd">新增</el-button>

      </div>

      <div class="card" style="margin-bottom: 5px">
        <el-table stripe :data="data.tableDate">
          <el-table-column prop="username" label="账号"></el-table-column>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="avatar" label="头像"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column prop="phone" label="电话"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template v-slot="scope" >
              <el-button type="primary" circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>
              <el-button type="danger" circle :icon="Delete" @click="del(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="card" v-if="data.total">
        <el-pagination @current-change="load" background layout="prev, pager, next" :page-size="data.pageSize" v-model:current-page="data.pageNum"  :total="data.total"/>
      </div>

      <el-dialog title="管理员信息" v-model="data.formVisible" width="40%" destroy-on-close>
        <el-form ref="form" :model="data.form" label-width="70px" style="padding: 20px">

          <el-form-item prop="username" label="用户名">
            <el-input v-model="data.form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="avatar" label="头像">
            <el-input v-model="data.form.avatar" placeholder="请输入头像"></el-input>
          </el-form-item>
          <el-form-item prop="name" label="姓名">
            <el-input v-model="data.form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item prop="phone" label="电话">
            <el-input v-model="data.form.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="data.form.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>

        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="data.formVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import  request  from "@/utils/request.js";
import {ElMessage} from "element-plus";
import {Delete, Edit} from "@element-plus/icons-vue";

const data = reactive({
  formVisible: false,
  form: {},
  tableDate: [],
  pageNum: 1,
  pageSize: 2,
  total: 0,
  name: null,
})

const handleAdd = () => {
    data.form = {}
    data.formVisible = true
}

const load = () => {
  request.get('/admin/selectPage', {
  params: {
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    name: data.name
  }
  }).then(res => {
    if (res.code === '200') {
      data.tableDate = res.data?.list || []
      data.total = res.data?.total
    }
  })
}

const add = () => {
  request.post('/admin/add', data.form).then(res => {
    if (res.code === '200') {
      ElMessage.success('操作成功')
      data.formVisible = false
      load()
    } else {
      ElMessage.error(res.message)
    }
  })
}

const reset = () => {
  data.name = null
  load()
}

const save = () => {
  add()
}

load()
</script>