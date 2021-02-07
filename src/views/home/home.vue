<template>
  <div class="home" ref="home">
    <!-- 标题栏 -->
    <van-nav-bar class="navbar" fixed title="猪猪商城" />
    <van-notice-bar left-icon="volume-o" text="恭喜猪猪商城成功上线使用！吼吼吼~~ 吼吼吼~~ 吼吼吼~~ 吼吼吼~~" />
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in banners" :key="index">
          <a :href="image.link">
            <img v-lazy="image.image" />
          </a>
        </van-swipe-item>
      </van-swipe>
      <!-- 宫格 -->
      <van-grid :border="false" :column-num="4">
        <van-grid-item v-for="(item, index) in recommends" :key="index">
          <a :href="item.link">
            <van-image :src="item.image" />
            <div class="tit">{{ item.title }}</div>
          </a>
        </van-grid-item>
      </van-grid>
      <!-- 标签页 -->
      <van-tabs v-model="activeName" sticky offset-top="46">
        <van-tab title="流行" name="pop">
          <goods-list ref="goods" :goodsdata="showGoods"></goods-list>
        </van-tab>
        <van-tab title="新款" name="new">
          <goods-list ref="goods" :goodsdata="showGoods"></goods-list>
        </van-tab>
        <van-tab title="精选" name="sell">
          <goods-list ref="goods" :goodsdata="showGoods"></goods-list>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <!-- 返回顶部标签 -->
    <home-top v-show="btnFlag" @click.native="backtop"></home-top>
  </div>
</template>

<script>
import homeTop from "components/backTop";
import goodsList from "../../components/goodsList";
import { getHomeMutidata, getHomeGoods } from "network/home";
export default {
  name: "home",
  data() {
    return {
      banners: [],
      recommends: [],
      isLoading: false,
      activeName: "pop",
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      btnFlag: false,
      scorllY: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.activeName].list;
    }
  },
  components: {
    goodsList,
    homeTop
  },
  created() {
    //请求轮播数据
    this.getHomeMutidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  destroyed() {
    //销毁滚动事件
    window.removeEventListener("scroll", this.scrollToTop);
  },

  mounted() {
    //添加滚动事件
    window.addEventListener("scroll", this.scrollToTop);
    //接收子组件上拉加载事件
    this.$bus.$on("goodsLoad", () => {
      setTimeout(() => {
        this.getHomeGoods(this.activeName);
        this.$refs.goods.loading = false;
      }, 1000);
    });
    // //为页面添加scorll事件
    // document.addEventListener("scroll", function() {
    //   console.log(document.documentElement.scrollTop);
    // });
  },
  activated() {
    console.log("进入页面");
  },
  deactivated() {
    console.log("离开页面");
  },
  methods: {
    //请求轮播图数据
    getHomeMutidata() {
      getHomeMutidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        console.log(this.banners);
        console.log(this.recommends);
      });
    },
    //获取商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
    // 下拉刷新
    onRefresh() {
      console.log(123);
      setTimeout(() => {
        // this.$toast('刷新成功');
        this.$router.go(0);
        this.isLoading = false;
      }, 1000);
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
    }
  }
};
</script>
<style lang="less" scoped>
.van-notice-bar{
  margin-top: 46px;
}
.my-swipe {
  img {
    width: 100%;
  }
  height: 200px;
}
.van-nav-bar {
  background-color: var(--color-high-text);
  /deep/.van-nav-bar__title {
    color: #fff;
  }
}
.tit {
  font-size: 14px;
  line-height: 30px;
  text-align: center;
}
.van-pull-refresh {
  // margin-top: 46px;
}
</style>
