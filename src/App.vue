<template>
  <div id="app">
    <keep-alive exclude="detail">
      <router-view/>
   </keep-alive>
    <!-- tabbar -->
    <van-tabbar v-model="active" active-color="#ff5777" route fixed placeholder>
      <van-tabbar-item
        :to="item.to"
        v-for="(item, index) in icon"
        :key="index"
      >
        <template #icon="props">
          <img :src="props.active ? item.active : item.inactive" />
        </template>
        <span>{{ item.title }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'app',
  data() {
    return {
      active: 0,
      icon: [
        {
          active: require("./assets/img/tabbar/home_active.svg"),
          inactive: require("./assets/img/tabbar/home.svg"),
          title: "首页",
          to: "/home"
        },
        {
          active: require("./assets/img/tabbar/category_active.svg"),
          inactive: require("./assets/img/tabbar/category.svg"),
          title: "分类",
          to: "/category"
        },
        {
          active: require("./assets/img/tabbar/shopcart_active.svg"),
          inactive: require("./assets/img/tabbar/shopcart.svg"),
          title: "购物车",
          to: "/shopcart"
        },
        {
          active: require("./assets/img/tabbar/profile_active.svg"),
          inactive: require("./assets/img/tabbar/profile.svg"),
          title: "我的",
          to: "/profile"
        }
      ]
    };
  }
};
</script>
<style lang="less">
@import url("assets/css/base.css");
</style>
