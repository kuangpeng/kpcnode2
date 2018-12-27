<template>
<div id="my" v-if="isUserInfo">
    <top-header :title='userInfo.loginname' :left-arrow="showNavArrow" :left-text="navLeftText">
    </top-header>
    <div class="container">
        <person 
        :userInfo="userInfo"></person>
    </div>
</div>
</template>

<script>
import {
    Row,
    Col,
    Toast
} from 'vant';
import Person from "../components/commons/Person.vue";
import TopHeader from '../components/layout/TopHeader.vue';

export default {
    name: 'My',
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Toast.name]: Toast,
        TopHeader,
        Person
    },
    data: function () {
        return {
            showNavArrow: true,
            navLeftText: '返回',
            userInfo: null,
            isUserInfo: false
        }
    },
    created: function () {
        Toast.loading({
            mask: true,
            message: '加载中...'
        });

        var _this = this;

        var loginname = _this.$route.params.username;

        fetch(_this.$urlConfig.cnodejs.hostUrl + '/user/' + loginname)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.success) {
                    _this.setUserInfo(data.data);
                } else {
                    setTimeout(function () {
                        Toast.fail('请求数据失败！');
                    }, 500);
                }
                Toast.clear();
            });
    },
    methods: {
        setUserInfo: function (data) {
            this.userInfo = data;
            this.isUserInfo = true;
        }
    }
}
</script>

<style scoped>
.user{
    padding-top: 1px;
}
</style>
