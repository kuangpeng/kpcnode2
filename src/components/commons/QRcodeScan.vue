<template>
<div class="scanBoxInner">
    <div class="cemara">
        <qrcode-stream :track="false" @decode="onDecode" @init="onInit" v-if="!destroyed">
            <div class="loading-indicator" v-if="loading">
                初始化中...
            </div>
        </qrcode-stream>
    </div>
    <div class="action">
        <van-button size="large" @click="cancel">取消</van-button>
    </div>
</div>
</template>

<script>
import {
    QrcodeStream,
    //QrcodeDropZone,
    //QrcodeCapture
} from 'vue-qrcode-reader';

import {
    Button
} from 'vant';

export default {
    name: 'QRcodeScan',
    components: {
        QrcodeStream,
        //QrcodeDropZone,
        //QrcodeCapture,
        [Button.name]: Button
    },
    data: function () {
        return {
            loading: false,
            firstLoad: true,
            destroyed: false,
            value: '',
            camera: {},
        }
    },
    computed: {
        cameraForzen() {
            return this.camera === false || (this.loading && !this.firstLoad)
        }
    },
    methods: {
        async onInit(promise) {
            this.loading = true;
            try {
                await promise;
            } catch (error) {
                console.error(error);
            } finally {
                this.firstLoad = false;
                this.loading = false;
            }
        },
        async onDecode(content) {
            this.value = content

            this.stopCamera();

            this.$emit('scan-complete', content);

        },
        stopCamera: function () {
            this.camera = false;
        },
        startCamera: function () {
            this.camera = null;
        },
        cancel: function () {
            this.stopCamera();
            this.$emit('scan-cancel');
        }
    }
}
</script>

<style>
.scanBoxInner {
    padding: 10px;
}

.cemara {
    width: 80%;
    max-width: 500px;
    margin: 0 auto;
}

.action {
    width: 80%;
    margin: 20px auto 0;
}
</style>
