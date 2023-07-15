<template>
    <div class="accessErrors">
        <div class="err errCode">404</div>
        <div class="err text">访问资源错误</div>
    </div>
</template>

<script>

export default {
    name:"",
    components: {},
    props: {},
    data() {
        return {};
    },
}
</script>

<style lang="less" scoped>
.accessErrors{
    width: 100%;
    height: 100%;
    padding-top: 10%;
    .err{
        text-align: center;
    }
    .errCode{
        font-size: 120px;
        letter-spacing:15px;
        color: #262f3e;
    }
    .text{
        font-size: 20px;
        letter-spacing:3px;
    }
}
</style>