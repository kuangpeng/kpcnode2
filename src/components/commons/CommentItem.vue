<template>
    <div class="c-item van-hairline--bottom">
        <div class="c-i-header clr">
            <div class="avatar">
                <router-link :to="{ name:'user', params: { username: author.loginname} }">
                    <img :src="author.avatar_url" />
                </router-link>
            </div>
            <p class="c-i-h-info">
                <router-link :to="{ name:'user', params: { username: author.loginname} }"><b>{{author.loginname}}</b></router-link>
                &nbsp;<span class="time">{{ create_at|formateTime }}</span>
                &nbsp;<van-tag type="success" v-if="authorname == author.loginname">作者</van-tag>
            </p>
            <div class="pull-right f14">
                <van-icon class-prefix="fa" name="thumbs-o-up" color="#666" size="16px" />&nbsp;{{reply_count}}
            </div>
        </div>
        <div v-html="formateContent" class="c-i-detail"></div>
    </div>
</template>

<script>
import { Icon, Tag } from 'vant';
export default {
    name: 'CommentItem',
    components:{
        [Icon.name]: Icon,
        [Tag.name]: Tag
    },
    props: {
        /** artical author */
        authorname: {
            type: String
        },
        authorid: {
            type: String
        },
        author: {
            type: Object
        },
        content: {
            type: String
        },
        create_at: {
            type: String
        },
        id: {
            type: String
        },
        ups: {
            type: Array
        }
    },
    data: function(){
        return {

        }
    },
    computed: {
        reply_count: function(){
            return this.ups?this.ups.length:0;
        },
        formateContent: function(){
            let f = this.content.replace(/href="\/user\//g, 'href="#/user/');
            return f;
        }
    },

    filters: {
        formateTime: function(value) {
            if(!value) return '';
            let t = new Date(value);
            return t.getFullYear() + '-' + t.getMonth() + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes();
        }
    }
}
</script>

<style>
.c-item{
    padding: 10px;
}
.c-item .c-i-header{
    font-size: 0;
}
.c-item .c-i-header .avatar{
    display: inline-block;
    width: 30px;
    height: 30px;
    overflow: hidden;
    margin-right: 10px;
    vertical-align: top;
    border-radius: 3px;
}
.c-item .c-i-header .avatar img{
    width: 100%;
    max-height: 30px;
}
.c-item .c-i-header .c-i-h-info{
    display: inline-block;
    font-size: 14px;
    color: #666;
    line-height: 1.2;
    vertical-align: top;
    margin: 0;
}
.c-item .c-i-header .c-i-h-info .time{
    color: #08c;
    font-size: 12px;
}

.c-item .c-i-detail{
    padding-top: 8px;
}


</style>


