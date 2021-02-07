<template>
  <van-list
    class="vanlist"
    v-model="loading"
    :finished="finished"
    :offset="1"
    :immediate-check="false"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <div class="goodslist">
      <div class="goods-item" v-for="(item, index) in goodsdata" :key="index" @click="routerClick(item.iid)">
        <div class="im">
          <img v-lazy="item.image||item.show.img" alt="" />
        </div>
        <div>
          <p>
            {{ item.title }}
          </p>
          <p>
            <span>{{ item.price }}</span
            >{{ item.cfav }}
          </p>
        </div>
      </div>
    </div>
  </van-list>
</template>

<script>
import {getHomeGoods} from "network/home";
export default {
  name: "homegoods",
  props: {
    goodsdata: {
      type: Array,
      default: []
    },
    activeName:{
      type:String,
      default:''
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
    };
  },
  methods: {
    onLoad() {
     this.$bus.$emit('goodsLoad')
    },
    //获取商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
    //跳转到商品详情
    routerClick(id){
      this.$router.push('/detail/'+id)
      
    }
  }
};
</script>

<style lang="less" scoped>
.vanlist {
  // overflow: hidden;
  // padding-bottom: 50px;
}
.goodslist {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 5px;
  margin-top: 10px;
  .goods-item {
    width: 49%;
    .im {
      width: 100%;
      border-radius: 8px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    p {
      font-size: 12px;
      display: inline-block;
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 20px;
      span {
        color: var(--color-high-text);
      }
      span:after {
        content: "☆";
        color: #000;
      }
    }
  }
}
</style>
