<template>
<div>
    <top-header title='首页'>
        <span slot="headRight"><van-icon name="search" slot="right" /></span>
    </top-header>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="container">
            <news-list ref="newsListRef"></news-list>
        </div>
    </van-pull-refresh>
    <bottom :current-tab="currentTab"></bottom>
</div>
</template>

<script>

import TopHeader from "../components/layout/TopHeader.vue";
import Bottom from "../components/layout/Bottom.vue";
import NewsList from '../components/commons/NewsList.vue';

export default {
    name: 'Home',
    components: {
        TopHeader,
        Bottom,
        NewsList
    },
    data: function () {
        return {
            currentTab: 0,
            isLoading: false
        }
    },
    methods: {
        onRefresh() {
            var _this = this;
            _this.$refs.newsListRef.refresh(function(){
                _this.isLoading = false;
            });
        }
    },
    beforeRouteLeave (to, from, next) {
        from.meta.isBack = true;
        next();
    }
}
</script>
