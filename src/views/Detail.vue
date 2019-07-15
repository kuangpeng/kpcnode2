<template>
<div>
    <top-header :title="detail.title" :left-arrow="showNavArrow" :left-text="navLeftText">
        <span slot="headRight"><van-icon name="search" slot="right" /></span>
    </top-header>
    <div class="container">
        <div class="news_detail mb15" v-show="isShowDetail">
            <div class="news_header">
                <h4 class="news_title">{{detail.title}}</h4>
                <div class="news_info">
                    <span>&nbsp;{{detail.create_at|formateTime}}</span>
                    <span>&nbsp;{{detail.author.loginname}}</span>
                    <span>&nbsp;{{detail.visit_count}}次浏览</span>
                    <span>&nbsp;栏目 [{{detail.tab|newsType}}]</span>
                </div>
            </div>
            <div class="news_body">
                <div v-html="detail.content" class="detail_content"></div>
            </div>            
        </div>
        <div id="commentContainer">
            <comments :comment-list="commentList" :authorname="detail.author.loginname" v-if="isShowComment"></comments>
        </div>
    </div>
</div>
</template>

<script>
import {Toast} from 'vant'
import TopHeader from '../components/layout/TopHeader.vue';
import Comments from '../components/commons/Comments.vue';

export default {
    name: 'Detail',
    components: {
        [Toast.name]: Toast,
        TopHeader,
        Comments
    },
    data: function () {
        return {
            newsId: '',
            showNavArrow: true,
            navLeftText: '返回',
            detail: {
                title: '',
                author: {
                    loginname: ''
                }
            },
            isShowDetail: false,
            commentList: [],
            isShowComment: false
        }
    },
    created: function () {
        var _this = this;
        _this.newsId = _this.$route.params.id;

        _this.updateDetail();

    },
    mounted: function(){
        
    },
    updated: function(){
        this.resetScroll();
    },
    methods: {
        updateDetail: function(){
            Toast.loading({
                mask: true,
                message: '加载中...'
            });

            var _this = this;
            let accesstoken = _this.$store.getters.getToken;

            fetch(_this.$urlConfig.cnodejs.hostUrl + '/topic/' + _this.newsId + '?mdrender=true&accesstoken=' + accesstoken)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.success) {
                    _this.newsId = data.data.id;
                    _this.detail = data.data;
                    _this.commentList = data.data.replies;
                    _this.isShowDetail = true;
                    _this.isShowComment = true;
                }
                else{
                    setTimeout(function(){
                        Toast.fail('请求数据失败！');
                    },500);
                }
                Toast.clear();
            });
        },
        resetScroll: function(){
            //TODO:
            // var hash = window.location.hash.slice(1);
            // var scrollMap = JSON.parse(localStorage.getItem('scrollMap'));

            // let path = hash.replace(/\//g, '$');
            // if(scrollMap[path]){
            //     document.documentElement.scrollTop = scrollMap[path];
            //     window.pageYOffset = scrollMap[path];
            //     document.body.scrollTop = scrollMap[path];
            // }
        }
    },
    watch: {
        
    },
    filters: {
        formateTime: function(value) {
            if(!value) return '';
            let t = new Date(value);
            return t.getFullYear() + '-' + t.getMonth() + '-' + t.getDate();
        },
        newsType: function(val) {
            if(!val) return '';
            return {
                good: '精华',
                share: '分享',
                ask: '问答',
                job: '招聘'
            }[val];
        }
    }
}
</script>

<style scoped>
.container{
    padding: 5px;
    margin-bottom: 20px;
}
</style>

<style>
.news_detail {
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
}

.news_detail .news_header{
    padding: 0 10px 10px;
    border-bottom: 1px solid #ccc;
}
.news_detail .news_header .news_title{
    line-height: 1.5;
    margin-top: 0;
    font-weight: 800;
}

.news_detail .news_info{
    color: #838383;
    font-size: 12px;
}
.news_detail .news_info span{
    margin-right: 7px;
}
.news_detail .news_info span::before{
    content: '•';
}

.news_body{
    padding: 10px;
}

.detail_content{
    white-space: normal;
    word-break: break-all;
}
.detail_content a{
    text-decoration: underline;
}

.markdown-text p, .preview p {
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    line-height: 2em;
    margin: 1em 0;
}

pre.prettyprint {
    font-size: 14px;
    border-radius: 0;
    padding: 0 15px;
    border: none;
    margin: 20px -10px;
    border-width: 1px 0;
    background: #f7f7f7;
    -o-tab-size: 4;
    -moz-tab-size: 4;
    tab-size: 4;
}
pre code {
    color: inherit;
    white-space: pre-wrap;
    background-color: transparent;
}

</style>
