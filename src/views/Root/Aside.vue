<script setup lang="ts">
import { House, DataAnalysis, Setting } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>

<template>
  <el-scrollbar>
    <img src="@/assets/img/pinkpal.gif" style="width: 100%">
    <div class="system-name">
      <span>Pick-Pal商家发布平台</span>
    </div>
    <el-menu  background-color=" #b3e19d"
              text-color="white"
              router
              :default-active="route.path"
              style="border-right: none">
      <el-menu-item index="/home">
        <el-icon> <House/> </el-icon>
        <span>首页</span>
      </el-menu-item>

      <el-sub-menu index="/goods">
        <template #title>
          <el-icon> <DataAnalysis/> </el-icon>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/goodsAdd">商品上架</el-menu-item>
        <el-menu-item index="/goods/goodsManage">商品管理</el-menu-item>
      </el-sub-menu>

      <el-sub-menu index="/order">
        <template #title>
          <el-icon> <Setting/> </el-icon>
          <span>订单管理</span>
        </template>
        <el-menu-item index="/order/orderList">订单列表</el-menu-item>
      </el-sub-menu>

      <el-menu-item index="/user">
        <template #title>
          <el-icon> <House/> </el-icon>
          <span>个人管理</span>
        </template>
      </el-menu-item>

    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.el-scrollbar {
  width: 100%;
  background-color:  #b3e19d;
  .system-name {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      width: 100%;
      color: white;
      font-family: '飞波正点体', serif;
      font-size: 30px;
      text-align: center;
    }
  }
}
</style>