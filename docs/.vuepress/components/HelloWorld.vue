<template>
    <div class="dome">
        <button @click="change">{{buttonName}}</button>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        data() {
            return {
                buttonName: "点击按钮"
            };
        },
        methods: {
            change() {
                console.log(111);
            }
        }
    };
</script>

<style lang="less" scoped>
.dome {
    width: 100px;
    height: 100px;
    color: orange;
}
</style>