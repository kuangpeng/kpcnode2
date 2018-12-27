<template>
<div>
    <div class="newsList">
        <div class="nl">
            <news-item v-for="(item, index) in list" :key="index" :news="item"></news-item>
        </div>
    </div>
    <div class="pagination" v-if="!isInit">
        <van-button v-show="has_next" @click="getNext" type="primary" size="large" :loading="isLoading" :disabled="isLoading">下一页</van-button>
        <van-button v-show="!has_next" size="large" type="danger" disabled>没有下一页了！</van-button>
    </div>
</div>
</template>

<script>
import { Button, Toast } from 'vant';
import NewsItem from './NewsItem.vue';

export default {
    name: 'NewsList',
    components: {
        NewsItem,
        [Button.name]: Button,
        [Toast.name]: Toast
    },
    data: function() {
        return {
            list: [],
            has_next: true,
            current_page: 1,
            isLoading: false,
            isInit: true
        }
    },
    beforeCreate: function(){
        this.$route.meta.isBack = false;
    },
    created: function() {
        this.list = [];
    },
    methods: {
        getData: function(ck){
            var _this = this;
            let page = _this.current_page;

            fetch(_this.$urlConfig.cnodejs.hostUrl + '/topics?page=' + page + '&tab=all&limit=20')
            .then(function(response) {
                Toast.clear();
                return response.json();
            })
            .then(function(data) {
                if(data.success){
                    if( page == 1){
                        _this.list = [];
                    }
                    _this.list = _this.list.concat(data.data);
                    ck && ck();
                }
                else{
                    Toast.fail('加载失败！');
                }
                
            })
        },
        getNext: function(){
            var _this = this;
            _this.current_page += 1;
            
            _this.isLoading = true;
            _this.getData(function(){

                _this.isInit = false;
                _this.isLoading = false;
            });
        },
        refresh: function(ck){
            this.current_page = 1;
            this.getData(function(){
                ck && ck();
            });

        }
    },
    mounted: function(){
        Toast.loading({
            mask: true,
            message: '加载中...'
        });
    },
    activated(){
        if(!this.$route.meta.isBack){
            var _this = this;
            _this.getData(function(){
                _this.isInit = false;
            });
        }
    }
}
</script>

<style>
.newsList{
    padding-top: 5px;
}
.pagination{
    padding: 10px;
}
</style>

