<template>
<div id="login">

    <div class="loginBox">
        <div class="logo">
            <img src="https://cnodejs.org/public/images/cnodejs.svg" />
        </div>
        <div class="input-group mb20">
            <label class="control-label">请输入登录token</label>
            <input type="text" class="form-control" name="token" v-model="value" placeholder="请输入登录token" />
        </div>
        <van-row type="flex" justify="space-between">
            <van-col span="10">
                <van-button size="large" type="warning" @click="scanToLogin">扫码登录</van-button>
            </van-col>
            <van-col span="10">
                <van-button size="large" type="primary" @click="toLogin">登录</van-button>
            </van-col>
        </van-row>
    </div>
    <div class="scanBox" v-show="isQrcodeToLogin">
        <component v-bind:is="qrcodeComp" v-if="isQrcodeToLogin" @scan-complete="getQRcode" @scan-cancel="getQRcodeCancel"></component>
    </div>
</div>
</template>

<script>
import {
    Field,
    Button,
    CellGroup,
    Row,
    Col,
    Toast
} from 'vant';

import QRcodeScan from '../components/commons/QRcodeScan.vue';

export default {
    name: 'Login',
    components: {
        [Field.name]: Field,
        [Button.name]: Button,
        [CellGroup.name]: CellGroup,
        [Row.name]: Row,
        [Col.name]: Col,
        [Toast.name]: Toast
    },
    data: function () {
        return {
            value: '',
            qrCode: '',
            qrcodeComp: QRcodeScan,
            isQrcodeToLogin: false
        }
    },
    methods: {
        getQRcode: function(v){
            this.isQrcodeToLogin = false;
            this.value = v;
            this.login();
        },
        getQRcodeCancel: function() {
            this.isQrcodeToLogin = false;
        },
        scanToLogin: function () {
            this.isQrcodeToLogin = true;
        },
        toLogin: function () {
            if (!this.value) {
                Toast('请输入登录token');
                return false;
            }
            this.login();
        },
        login: function () {
            var _this = this;

            Toast.loading({
                mask: true,
                message: '登录中...'
            });
            fetch(_this.$urlConfig.cnodejs.hostUrl + '/accesstoken', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'accesstoken=' + _this.value
                })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    Toast.clear();
                    if (data.success) {
                        Toast.success('登录成功！', {
                            duration: 800
                        });
                        data = Object.assign({}, data, {
                            accesstoken: _this.value
                        });
                        _this.saveToken(data);
                        setTimeout(function () {
                            let redirect = _this.$route.query.redirect;
                            _this.$router.replace({
                                path: redirect
                            });
                        }, 1000);
                    } else {
                        setTimeout(function () {
                            Toast.fail('登录失败, 请确认token输入正确！');
                        }, 500);
                    }
                });

        },
        saveToken: function (data) {
            let user = {
                id: data.id,
                loginname: data.loginname,
                avatar: data.avatar_url,
                accesstoken: data.accesstoken
            }

            this.$store.commit('updateLoginUser', user);
            this.$store.commit('updateToken', data.accesstoken);
        }
    }
}
</script>

<style scoped>
.loginBox {
    width: 85%;
    margin: 50px auto 0;
}

.logo{
    width: 80%;
    max-width: 300px;
    margin: 0 auto 120px;
}
.logo img{
    display: block;
}

.input-group {
    width: 100%;
}

.input-group label {
    display: block;
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
}

.form-control {
    display: block;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px 8px;
    font-size: 14px;
    color: #111;
}

.scanBox {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f9f9f9;
}
</style>
