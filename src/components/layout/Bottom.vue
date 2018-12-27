<template>
<div id="bottom">
    <van-tabbar 
    v-model="tabIndex"
    fixed
    :z-index='zIndex'
    >
        <van-tabbar-item icon="home-o" :to="{name:'home'}">首页</van-tabbar-item>
        <van-tabbar-item icon="user-o" :to="{name:'my'}">我的</van-tabbar-item>
    </van-tabbar>
</div>
</template>

<script>
import {
    Tabbar,
    TabbarItem
} from 'vant';

export default {
    name: "Bottom",
    props:{
        currentTab: {
            type: Number,
            default: 0
        }
    },
    data: function(){
        return {
            tabIndex: 0,
            zIndex: 10
        }
    },
    created: function(){
        this.tabIndex = this.currentTab;
    },
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    methods: {
        change: function(active) {
            
        }
    },
    activated: function() {
        this.tabIndex = this.currentTab;
    }
}
</script>
