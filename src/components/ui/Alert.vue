<template>
    <div class="alert">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .alert{
        padding:1rem 2rem;
        color:white;
        background:rgba(0, 0, 0, 0.863);
        animation:alert-animation 2s backwards;
        border-radius:100px;
        bottom:-100px;
        left:50%;
        z-index:10;
        position:fixed;
    }

    @keyframes alert-animation{
        0%{
            transform:translateY(0%) translateX(-50%);
            opacity:0;
        }
        
        30%{
            transform:translateY(-300%) translateX(-50%);
            opacity:0.5;
        }
        50%{
            transform:translateY(-300%) translateX(-50%);
            opacity:1;
        }
        70%{
            transform:translateY(-300%) translateX(-50%);
            opacity:1;
        }
        100%{
            transform:translateY(-300%) translateX(-50%);
            opacity:0;
        }
    }
</style>