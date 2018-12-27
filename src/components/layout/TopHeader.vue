<template>
<div id="header">
    <van-nav-bar
        :title='title'
        :left-text='leftText'
        :left-arrow='leftArrow'
        fixed
        :z-index='zIndex'
        @click-left="onClickLeft"
    >
        <van-icon name="search" slot="right" v-show="showSearch" />
    </van-nav-bar>
</div>
</template>

<script>
import { NavBar, Icon } from 'vant';

export default {
    name: "TopHeader",
    props: {
        title: {
            type: String,
            default: 'cnodeJs'
        },
        leftText: {
            type: String,
            default: ''
        },
        leftArrow: {
            type: Boolean,
            default: false
        },
        showSearch: {
            type: Boolean,
            default: false
        }
    },
    data: function(){
        return {
            zIndex: 10
        }
    },
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon
    },
    methods: {
        onClickLeft: function() {
            this.$router.goBack();
        },
        onClickRight: function(){

        } 
    }
}
</script>