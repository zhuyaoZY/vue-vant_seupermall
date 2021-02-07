<template>
  <div>
    <!-- 顶部栏 -->
    <van-nav-bar fixed z-index="3">
      <template #title>
        <span>购物车({{ $store.getters.carNum }})</span>
      </template>
    </van-nav-bar>
    <!-- 商品信息 -->
    <div class="goodslist">
      <div class="cart-item" v-for="(item, index) in goodslist" :key="index">
        <van-checkbox
          checked-color="red"
          class="chebox"
          v-model="item.checked"
        ></van-checkbox>
        <van-card
          :num="item.count"
          :price="item.price"
          :desc="item.desc"
          :title="item.title"
          :thumb="item.image"
        />
      </div>
    </div>
    <!-- 结算栏 -->
    <van-submit-bar
      :price="totalPrice * 100"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox @click="ischecked" checked-color="red" v-model="isSelectAll"
        >全选</van-checkbox
      >
      <template #tip>
        你的收货地址不支持同城送,
        <span>修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: "shopcart",
  data() {
    return {
      checked: false,
      goodslist: []
    };
  },
  created() {
    this.goodslist = this.$store.state.carList;
    console.log(this.totalPrice);
  },
  computed: {
    totalPrice: function() {
      return this.goodslist
        .filter(item => {
          return item.checked;
        })
        .reduce((total, item) => {
          return total + item.price * item.count;
        }, 0);
    },
    isSelectAll: {
      //  return !(this.goodslist.filter((item)=>{!item.checked}).length)
      get() {
        if (this.goodslist.length !== 0) {
          return !this.goodslist.find(item => !item.checked);
        } else {
          return false;
        }
      },
      set() {
        if (this.goodslist.length !== 0) {
          return !this.goodslist.find(item => !item.checked);
        } else {
          return false;
        }
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit() {
      if(this.$store.state.carList.length==0){
          this.$toast('请添加商品')
      }else if(this.$store.state.carList.filter(item=>{return item.checked}).length==0){
          this.$toast('请选中商品')
      }else{
          this.$toast.success({ message: "提交成功！", duration: 1600 });
      }

      
    },
    ischecked() {
      if (this.isSelectAll) {
        //点击之后如果是选中状态将item全部不选中
        this.goodslist.forEach(item => {
          item.checked = false;
        });
      } else {
        this.goodslist.forEach(item => {
          item.checked = true;
        });
      }
      // this.goodslist.forEach(item => {
      //     item.checked = !item.checked;
      //   });
    }
  }
};
</script>
<style lang="less" scoped>
.van-nav-bar {
  background-color: var(--color-high-text);
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}
.goodslist {
  margin-top: 46px;
}
.cart-item {
  position: relative;
  padding-left: 20px;
  background-color: #fafafa;
  .chebox {
    position: absolute;
    top: 40px;
    left: 8px;
    z-index: 1;
  }
}
.van-submit-bar {
  margin-bottom: 50px;
  border-bottom: 1px solid #eee;
}
</style>
