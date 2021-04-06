<template>
    <div :value="active" class="switch" @click="emitBoolean" :style="style.switch">
        <div :class="{circle:true,left0:active,right0:!active}"></div>
    </div>
</template>

<script>
export default {
    emits:['is-true'],
    data(){
        return{
            active:true,
            
        }
    },
    methods:{
        emitBoolean(){
            this.active = !this.active
            this.$emit('is-true',this.active)
        }
    },
    computed:{
        style(){
            return{
                switch:{
                    backgroundColor:this.active ? "blue" : "grey",
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

$height:1rem;

    .switch{
        width:$height + $height;
        height:$height;
        border-radius:100px;
        position:relative
    }
    
    .circle{
        background:white;
        width:$height;
        height:$height;
        border-radius:50%;
        position: absolute;
        top:0;
        left:0;
        transition:0.2s;
    }
    
    .left0{
        transform:translateX(0)
    }
    .right0{
        transform:translateX($height)
    }

    
</style>