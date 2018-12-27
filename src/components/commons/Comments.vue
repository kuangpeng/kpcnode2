<template>
    <div class="commentList">
        <div class="commentHeader van-hairline--bottom">
            {{num_reply}}条回复
        </div>
        <div class="commentBody">
            <comment-item v-for="(item, index) in comments" :key="index" v-bind="item" :authorname="authorname"></comment-item>
        </div>
        <div class="commentFooter">
            <van-pagination 
            v-model="currentPage" 
            :items-per-page="numPerPage"
            :total-items="total"
            mode="simple" 
            @change="pageTurn"
            />
        </div>
    </div>    
</template>

<script>
import {Pagination } from 'vant';
import CommentItem from './CommentItem.vue';

export default {
    name: 'Comments',
    components: {
        [Pagination.name]: Pagination,
        CommentItem
    },
    props: {
        authorname: {
            type: String
        },
        commentList: {
            type: Array,
            default: []
        }
    },
    data: function(){
        return {
            numPerPage: 10,
            currentPage: 1,
        }
    },
    computed: {
        num_reply: function(){
            return this.commentList?this.commentList.length:0;
        },
        total: function(){
            return this.commentList?this.commentList.length:0;
        },
        comments: function(){
            let start = (this.currentPage-1)*this.numPerPage;
            let end = (this.currentPage)*this.numPerPage;

            let currentList;
            if(end<this.commentList.length){
                currentList = this.commentList.slice(start, end);
            }
            else{
                currentList = this.commentList.slice(start);
            }
            return currentList;
        }
    },
    methods: {
        pageTurn: function(page){
            
        }
    }
}
</script>

<style>
.commentList{
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
}
.commentList .commentHeader{
    background-color: #f6f6f6;
    padding: 8px;
    font-size: 14px;
}
.commentList .commentBody{
    margin: 5px 0;
}
.commentList .commentFooter{
    padding: 10px;
}


</style>