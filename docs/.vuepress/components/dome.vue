<template>
    <div class="dome-2">
        {{name}}
    </div>
</template>

<script>
    export default {
        name: "dome",
        data(){
            return {
                name:'yh'
            }
        }
    }
</script>

<style lang="less" scoped>
.dome-2 {
    color: orange;
    &:hover {
        color: #000;
    }
}
</style>