<template>
<div id="my">
    <div class="container">
        <person 
        :userInfo="userInfo" 
        v-if="isUserInfo"></person>
    </div>
    <bottom :current-tab="tab"></bottom>
</div>
</template>

<script>
import {
    Row,
    Col,
    Toast
} from 'vant';
import Person from "../components/commons/Person.vue";
import Bottom from "../components/layout/Bottom.vue";

export default {
    name: 'My',
    components: {
        [Row.name]: Row,
        [Col.name]: Col,
        [Toast.name]: Toast,
        Bottom,
        Person
    },
    data: function () {
        return {
            tab: 1,
            userInfo: null,
            isUserInfo: false
        }
    },
    mounted: function () {
        Toast.loading({
            mask: true,
            message: '加载中...'
        });

        var _this = this;
        var loginUser = _this.$store.getters.getLoginUser;

        let users = _this.$store.getters.getUsers;

        if (loginUser && users && users[loginUser.id]) {
            _this.setUserInfo(users[loginUser.id]);
            return true;
        }

        var loginname = loginUser.loginname;

        fetch(_this.$urlConfig.cnodejs.hostUrl + '/user/' + loginname)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.success) {
                    data.data['id'] = loginUser.id;
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
#my .container {
    margin-top: 0;
}
</style>
