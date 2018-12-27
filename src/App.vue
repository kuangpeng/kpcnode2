<template>
    <div>
        <transition :name="transitionName" mode="in-out">
            <keep-alive>
                <router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition :name="transitionName" mode="in-out">
            <router-view class="router-view" v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: "App",
    data:function(){
        return {
            transitionName: 'slide-left',
            scrollMap: {}
        }
    },
    watch: {
        $route(to, from){
            let isBack = this.$router.isBack;
            if(isBack) {
　　　　　　     //this.transitionName = 'slide-right'
            } else {
　　    　　　　 //this.transitionName = 'slide-left'
            }
        　　//this.$router.isBack = false;

            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
            let path = from.path.replace(/\//g, '$');
            this.scrollMap[path] = scrollTop;
            localStorage.setItem("scrollMap", JSON.stringify(this.scrollMap));
        }
    },
    updated: function(){
        var hash = window.location.hash.slice(1);
        var scrollMap = JSON.parse(localStorage.getItem('scrollMap'));

        let path = hash.replace(/\//g, '$');
        if(scrollMap[path] && this.$route.meta.keepAlive){
            document.documentElement.scrollTop = scrollMap[path];
            window.pageYOffset = scrollMap[path];
            document.body.scrollTop = scrollMap[path];
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.name == 'home') {
            to.meta.isBack = true;
        }
        next();
    },
}
</script>

<style>
@import url('https://cdn.bootcss.com/normalize/8.0.1/normalize.min.css');
@import './assets/css/font-awesome.min.css';
@import './assets/css/common.css';
@import './assets/css/main.css';
html,body{
    position: relative;
    width: 100%;
}
body{
    overflow-y: auto;
    background-color: #e1e1e1;
}
.container{
    width: 100%;
    z-index: 10;
    /* margin-top: 46px; */
    margin-bottom: 50px;
}
.router-view{
    position: absolute;
    width: 100%;
    transition: all .4s ease-in-out;
    top: 50px;
}
.slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}
</style>
