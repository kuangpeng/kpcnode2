<template>
<div class="item van-hairline--bottom" :id="news.id">
    <router-link :to="{name:'newsDetail', params: {id: news.id}}">
        <div class="media">
            <div class="media-left">
                <img :src="news.author.avatar_url" class="media-object img-rounded"/>
            </div>
            <div class="media-body">
                <h4 class="tit"><van-tag type="success" v-show="news.top">置顶</van-tag><van-tag plain v-show="!news.top">{{ news.tab| newsType }}</van-tag> {{ news.title|short }}</h4>
                <p class="desc">{{ labelStr }} | <van-icon class-prefix="fa" name="comments-o" color="#666" size="12px" />&nbsp;{{news.reply_count}}&nbsp;&nbsp;<van-icon name="eye-o" color="#666" size="12px" />&nbsp;{{news.visit_count}}</p>
            </div>
        </div>
    </router-link>
</div>
</template>

<script>
import { Row, Col, Cell, Tag, Icon } from 'vant';

export default {
    name: 'NewsItem',
    props: {
        news: {
            type: Object
        }
    },
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Cell.name]: Cell,
        [Tag.name]: Tag,
        [Icon.name]: Icon
    },
    computed: {
        labelStr: function() {
            return this.formateTime(this.news.create_at) + ' ' + this.news.author.loginname;
        }
    },
    methods: {
        formateTime: function(value) {
            if(!value) return '';
            let t = new Date(value);
            return t.getFullYear() + '-' + t.getMonth() + '-' + t.getDate();
        }
    },
    filters: {
        short: function(value) {
            if(value.length <= 40) return value;
            return value.substr(0, 40);
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

<style>
.van-icon{
    vertical-align: middle;
}
.item {
    position: relative;
    padding: 5px 3px;
    background-color: #fff;
}

.item .media-left img {
    display: block;
    width: 60px;
    height: 60px;
}

.item .tit {
    width: 100%;
    font-size: 15px;
    line-height: 1.3;
    margin-top: 0;
}

.item .desc {
    font-size: 12px;
    color: #c1c1c1;
    margin-top: 5px;
}
</style>
