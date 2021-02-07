<template>
  <nav-bar>
      <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
          <div v-for="(item,index) in titles" :key="index" class="title-item" :class="{active:index==crentIndex}" @click="activeClick(index)">{{item}}</div>
      </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'detailNavbar',
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            crentIndex:0
        }
    },
    components:{
        NavBar
    },
    methods:{
        activeClick(index){
            this.crentIndex=index
            this.$emit('itemClick',index)
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style>
.title{
    display: flex;
}
.title-item{
    flex: 1;
    font-size: 12px;
}
.active{
    color: var(--color-high-text);
}
.back{
    text-align: center;
}
.back img{
    margin-top: 12px;
}
</style>