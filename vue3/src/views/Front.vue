
<template>
  <div>
    <div class="front-header">
      <div class="front-header-left">
        <img src="@/assets/imgs/logo.png" alt="">
        <div class="title">前台系统</div>
      </div>
      <div class="front-header-center">
        <el-menu :default-active="router.currentRoute.value.path" router mode="horizontal">
          <el-menu-item index="/front/home">首页</el-menu-item>
          <el-menu-item index="/front/person">个人中心</el-menu-item>
        </el-menu>
      </div>
      <div class="front-header-right">
        <div style="padding-right: 20px" v-if="!data.user.id">
          <el-button>登录</el-button>
          <el-button>注册</el-button>
        </div>
        <div v-else>
          <el-dropdown style="cursor: pointer">
            <div style="padding-right: 20px; display: flex; align-items: center">
              <img style="width: 40px; height: 40px; border-radius: 50%; "  src="@/assets/imgs/logo.png" alt="">
              <span style="margin-left: 5px">用户</span> <el-icon><arrow-down/></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="main-body">
      <RouterView/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import router from '@/router/index.js'
import {ArrowDown} from "@element-plus/icons-vue";
import {reactive} from "vue";
const data = reactive({
  user: {}
})
</script>

<style scoped>
  @import "@/assets/css/front.css";
</style>

