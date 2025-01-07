<script setup lang="ts">
import InfiniteScroll from '@/app/components/InfiniteScroll.vue';
import axios from 'axios';
import {onMounted, ref} from "vue"

const API_URI = "https://dummyjson.com"

const products = ref<Array<{image:string,title:string,price:number}>>([]);
const loading = ref(false)

const http = axios.create({
    baseURL : API_URI
})
const fetchProduct = async()=>{
    loading.value = true
    try {
        const response = await http.get(`/products?limit=3&skip=${products.value.length}`);
        products.value = [...products.value,...response.data.products];
        
    }catch(err){
        console.log({err});
    }finally{
        loading.value = false
    }
}
onMounted(fetchProduct);

const loadMoreProduct =()=>{
    if(loading.value ) return
    fetchProduct();
}

</script>
<template>
    <InfiniteScroll @loadend="loadMoreProduct" scroll-height="50vh">
        <div class="list-wrapper">
            <div class="product-card" v-for="(product,index) of products" :key="index">
                <div class="product-image" :style="{backgroundImage:`url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuvnCoJabi5utnnXEl7Xtrkfj7eF6cEKoIAQ&s')`}"></div>
                <div class="product-title">
                    <span class="title">{{ product.title }}</span>
                    <span class="price">${{ product.price }}</span>
                </div>
            </div>
            <p v-if="loading">Loading....</p>
            <p v-else>No data</p>
        </div>
    </InfiniteScroll>
</template>

<style scoped>
.test-page {
    padding: 30px 100px;
}
.list-wrapper {
    padding: 50px 100px;
}
.product-card {
    height: 150px;
    width: 500px;
    display: flex;
    gap: 20px;
    margin-top: 20px;
    background-color: #FFF;
    box-shadow: 0 5px 40px #DEDEDE;
    border-radius: 8px;
    font-family: Arial, Helvetica, sans-serif
}
.product-image {
    height: 100%;
    background-position: center;
    background-size: cover;
    flex: 1;
    border-radius: 8px 0 0 8px;
}
.product-title {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0;
}
.product-title .price {
    font-weight: bold;
    color: rgb(158, 158, 18);
}
</style>