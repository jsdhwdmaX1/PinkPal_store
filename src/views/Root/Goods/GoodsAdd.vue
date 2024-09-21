<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {getCategory} from "@/service/api/category";

import {ElMessage, UploadFile} from "element-plus";
import {useUserStore} from "@/store/modules/user.ts";
import {addGoods} from "@/service/api/goods";

let userStore = useUserStore();

let form = ref({
  name: '',
  storeId: '',
  categoryId: '',
  price: '',
  inventory: ''
});

interface Category {
  id: string;
  name: string;
}

let categories = ref([] as Category[]);

let image = ref('') as any;

let imageUrl = ref('');

onMounted(() => {
  // 获取商品分类列表
  getCategory().then(res => {
    if (res.data.code === 1) {
      categories.value = res.data.data;
    }
  });
});

function uploadFile(file: UploadFile) {
  image.value = file;
  console.log(image.value)
  imageUrl.value = URL.createObjectURL(file.raw as Blob);
}

function handleRemove() {
  image.value = '';
  imageUrl.value = '';
}

function onSubmit() {
  form.value.storeId = userStore.getUserInfo().storeId;
  addGoods(form.value,image.value).then(res => {
    if (res.data.code === 1) {
      ElMessage.success('添加商品成功');
    }
    form.value.categoryId = '';
    form.value.name = '';
    form.value.price = '';
    form.value.inventory = '';
    handleRemove()
  });
}
</script>

<template>
  <div class="box">
    <el-form :model="form" label-position="top" label-width="120px" size="large">

      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="商品分类">
        <el-select v-model="form.categoryId" placeholder="请选择">
          <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="价格">
        <el-input-number v-model="form.price" :precision="2" :step="10"  />
      </el-form-item>

      <el-form-item label="库存量">
        <el-input-number v-model="form.inventory" :step="1"  />
      </el-form-item>

      <el-form-item label="图片">
        <el-upload
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :multiple="false"
            :on-change="uploadFile"
            drag
            accept="image/jpg,image/jpeg,image/png">
          <i v-if="imageUrl" class="el-icon-circle-close deleteImg" @click.stop="handleRemove"></i>
          <img v-if="imageUrl" :src="imageUrl" class="el-upload--picture-car" alt="" />
          <div v-else>
            <i class="el-icon-picture" style="margin-top: 40px; font-size: 40px; color: #999a9c"></i>
            <div>上传图片</div>
            <div>格式为png、jpeg或jpg</div>
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<style scoped lang="scss">
.box {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px 10px;
  border: 1px rgba(0,0,0,0.1) solid;
  padding: 10px 10px;
  border-radius: 5px;
}
</style>