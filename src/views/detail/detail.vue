<template>
  <div>
    <!-- 顶部栏 -->
    <van-nav-bar left-arrow fixed placeholder @click-left="onClickLeft">
      <template #title>
        <span
          :class="{ active: crentIndex == index }"
          v-for="(item, index) in titles"
          :key="index"
          @click="titleClick(index)"
          >{{ item }}</span
        >
      </template>
    </van-nav-bar>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in topImages" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>

    <detail-base-info :goods="this.goods" />
    <detail-shop-info :shop="this.shop" />
    <detail-goods-info :detailInfo="this.detailInfo" />
    <detail-param-info ref="param" :paramInfo="this.detailParameter" />
    <detail-comment-info ref="comment" :commentInfo="this.commentInfo" />
    <!-- 推荐内容 -->
    <goods-list ref="goods" :goodsdata="recommends"></goods-list>
    <!-- 底部购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button @click="adddoods" type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>

    <back-top v-show="btnFlag" @click.native="backtop" />
  </div>
</template>

<script>
import backTop from "components/backTop";
//引入商品信息组件
import detailBaseInfo from "./detailComps/DetailBaseInfo";
import detailShopInfo from "./detailComps/DetailShopInfo";
import detailGoodsInfo from "./detailComps/DetailGoodsInfo";
import detailParamInfo from "./detailComps/DetailParamInfo";
import detailCommentInfo from "./detailComps/DetailCommentInfo";
import GoodsList from "components/goodsList";
import { getDtail, Goods, Shop, ParaMeter, getRecommend } from "network/detail";
import {mapActions} from 'vuex'
export default {
  name: "detail",
  components: {
    detailBaseInfo,
    detailShopInfo,
    detailGoodsInfo,
    detailParamInfo,
    detailCommentInfo,
    GoodsList,
    backTop
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      crentIndex: 0,
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      detailParameter: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      btnFlag: false
    };
  },
  created() {
    //接受路由的动态传参
    this.iid = this.$route.params.id;
    getDtail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //保存商品详情信息
      this.detailInfo = data.detailInfo;
      //获取商品参数信息
      this.detailParameter = new ParaMeter(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取商品评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        console.log(this.commentInfo);
      }
    });
    //获取详情页推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
      console.log(this.recommends);
    });
    //
    this.scrollTops();
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  updated() {
    this.themeTopYs = [];
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.param.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.goods.$el.offsetTop);
  },
  methods: {
    ...mapActions(['addCart']),
    onClickLeft() {
      this.$router.go(-1);
    },
    titleClick(index) {
      this.crentIndex = index;
      //设置距离顶部的距离
      document.documentElement.scrollTop = this.themeTopYs[index];
    },
    scrollTops() {
      window.addEventListener(
        "scroll",
        () => {
          const scrolltop = document.documentElement.scrollTop;
          if (scrolltop > 0 && scrolltop < this.themeTopYs[1]) {
            this.crentIndex = 0;
          } else if (
            scrolltop > this.themeTopYs[1] &&
            scrolltop < this.themeTopYs[2]
          ) {
            this.crentIndex = 1;
          } else if (
            scrolltop > this.themeTopYs[2] &&
            scrolltop < this.themeTopYs[3]
          ) {
            this.crentIndex = 2;
          } else if (scrolltop > this.themeTopYs[3]) {
            this.crentIndex = 3;
          }
        },
        true
      );
    },
    //点击返回顶部
    backtop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
    //点击添加购物车
    adddoods(){
        //1.获取购物车需要展示的信息
        const product ={}
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        //2.将商品添加到购物车
        this.addCart(product).then(res=>{
          this.$toast(res)
        })
    }
  }
};
</script>

<style lang="less" scoped>
.van-nav-bar span {
  margin: 0 5px;
}
.active {
  color: var(--color-high-text);
}
.van-swipe {
  height: 375px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.van-goods-action{
  z-index: 2;
  box-shadow: 0 -2px 2px rgba(0,0,0,.1);
}
</style>
