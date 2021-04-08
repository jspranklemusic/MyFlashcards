<template>
    <div class="loading-container">
            <i class="fas fa-circle-notch loading-spinner-animation"></i>
            <div class="text">
                 <span class="text-fade-animate">
                     <slot ></slot>
                </span>
            </div>
    </div>
</template>



<style lang="scss" scoped>
    .loading-container{
        width: max-content;
        margin:0 auto;
         text-align:center;

    }
    .text{
        animation:animate-up-loading-spinner-text 0.5s backwards;
    }

    .loading-spinner-animation{
        animation:loading-spinner-animation 0.5s infinite linear;
        font-size:2em;
        margin-bottom:1rem;
        color:black;
       
    }

    .text-fade-animate{
        animation:text-fade-animate 1s infinite;
    }
    @keyframes animate-up-loading-spinner-text{
        0%{
            transform:translateY(20px);
        }
        100%{
            transform:translateY(0px);
        }
    }

    @keyframes loading-spinner-animation{
        0%{
            transform:rotateZ(0deg)
        }
        100%{
            transform:rotateZ(359deg)
        }
    }

    @keyframes text-fade-animate{
        0%{
            opacity:0.4;
        }
        50%{
             opacity:1;
        }
       
        100%{
           opacity:0.4;
        }
    }

</style>