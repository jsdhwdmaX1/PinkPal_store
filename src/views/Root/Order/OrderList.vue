<script setup lang="ts">
import {onMounted, ref} from "vue";
import { goodsSearch } from "@/service/api/goods";
import {useUserStore} from "@/store/modules/user.ts";
import {ElMessage} from "element-plus";
import {orderSearch} from "@/service/api/order";

let userStore = useUserStore();

interface Order {
  id: string | null;
  userId: string | null;
  goodsId: string | null;
  storeId: String | null;
  createTime: Date | null;
  state: number | null;
  goods: Goods | null
}
interface Goods {
  id: string |null;
  name: string | null;
  storeId: string | null;
  categoryId: string | null;
  createTime: Date | null;
  price: string | null;
  state: boolean | null;
  inventory: number | null;
  salesCount: number | null;
  picture: string | null;
}

const tableData = ref([{} as Order])
// 表格数据更新标志
const isUpdate = ref(false)

const orderSearchForm = ref({
  id:'',
  createTime: null,
  goodsId:'',
  storeId:'',
  page: 1, // 当前页
  pageSize: 12, // 每页显示条数
})

const orderFocus = ref({} as Order)

const lookConfirm = ref(false)


onMounted(()=>{
  orderSearchForm.value.storeId = userStore.getUserInfo().storeId
  refreshOrder()
})

function refreshOrder(){
  orderSearch(orderSearchForm.value.storeId).then(res => {
    if(res.data.code === 1) {
      tableData.value = res.data.data
      tableData.value.forEach(item => {
        goodsSearch({id: item.goodsId}).then(res => {
          item.goods = res.data.data.rows[0]
        })
      });
      console.log(tableData.value)
    }else{
      ElMessage.error("获取商品列表失败:"+res.data.message)
    }
  })
  isUpdate.value = !isUpdate
}

function getOrder(row: any) {
  goodsSearch({id:row.id}).then(res => {
    if(res.data.code === 1) {
      orderFocus.value = res.data.data.rows[0]
    }else {
      ElMessage.error("获取商店信息失败:"+res.data.message)
    }
  })
}

function handleLook(row: any) {
  getOrder(row)
  lookConfirm.value = true
}

function handleDeliver(row: any) {
  getOrder(row)
}

</script>

<template>
  <el-card >
    <el-table
        border stripe fit
        height= "auto"
        :data="tableData"
        :key="isUpdate"
        style="width: 100%;"
        size="large"
    >
      <el-table-column prop="id" label="订单号" width="150" align="center" />
      <el-table-column prop="userId" label="用户ID" width="150" align="center" />
      <el-table-column prop="goods.name" label="商品名" width="180" align="center"/>
      <el-table-column prop="goods.picture" label="图片" width="200" align="center">
        <template v-slot="{ row }">
          <el-image style="width: 100px; height: 100px" :src="row.goods.picture" fit="cover"/>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="180" align="center"/>
      <el-table-column label="状态" width="100" align="center">
        <template v-slot="{ row }">
          <el-tag v-if="row.state === 1" type="primary">待付款</el-tag>
          <el-tag v-else-if="row.state === 2" type="success">未发货</el-tag>
          <el-tag v-else-if="row.state === 3" type="warning">已发货</el-tag>
          <el-tag v-else-if="row.state === 4" type="info">已完成</el-tag>
          <el-tag v-else-if="row.state === 0" type="danger">已取消</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="240" align="center">
        <template v-slot="{ row }">
          <el-button type="primary" @click="handleLook(row)">
            查看
          </el-button>
          <el-button v-if="row.state === 2" type="info" @click="handleDeliver(row)">
            去发货
          </el-button>
          <el-button v-else type="info" @click="handleLook(row)">
            去查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="lookConfirm" width="500" style="display: flex;justify-content: center">
    <el-card style="max-width: 480px;">

    </el-card>
  </el-dialog>
</template>

<style scoped lang="scss">

.search_box {
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.el-dialog span {
  font-size: 20px;
  font-family: "三极行楷简体-粗", serif;
  display: block;
  margin: 10px 0;
}

</style>
