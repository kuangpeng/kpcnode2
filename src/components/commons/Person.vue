<template>
<div class="user van-hairline--bottom">
    <div class="avatar">
        <img :src="userInfo.avatar_url" />
    </div>
    <h4 class="mb20 text-center">{{userInfo.loginname}}</h4>
    <div class="info text-center">
        <van-row type="flex" justify="space-around">
            <van-col span="6">
                
                    <span>{{num_topic}}</span><br>文章
                
            </van-col>
            <van-col span="6">
                <span>{{num_reply}}</span><br>回复
            </van-col>
            <van-col span="6">
                <span>{{userInfo.score}}</span><br>积分
            </van-col>
        </van-row>
    </div>
</div>
</template>

<script>
import {
    Row,
    Col,
    Toast
} from 'vant';

export default {
    name: 'Person',
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Toast.name]: Toast
    },
    props: {
        userInfo: {
            avatar_url: {
                type: String
            },
            loginname: '',
            recent_topics: {
                type: Array,
                default: []
            },
            recent_replies: {
                type: Array,
                default: []
            },
            score: {
                type: Number,
                default: 0
            }
        }
    },
    data: function(){
        return {
            
        }
    },
    computed: {
        num_topic: function(){
            return this.userInfo&&(this.userInfo.recent_topics?this.userInfo.recent_topics.length:0);
        },
        num_reply: function(){
            return this.userInfo&&(this.userInfo.recent_replies?this.userInfo.recent_replies.length:0);
        }
    },
    watch: {
    }
}
</script>

<style>
.user {
    padding: 10px 10px 30px;
    background-color: #fff;
}
.user .avatar {
    width: 40%;
    max-width: 300px;
    margin: 0 auto;
    margin-top: 25px;
    margin-bottom: 35px;
    overflow: hidden;
    border-radius: 50%;
    background-color: #fff;
}

.user .avatar img {
    display: block;
    width: 100%;
}

.user .info {
    color: #999;
    font-size: 14px;
}

.user .info span{
    color: #000;
    font-size: 16px;
}
</style>
