<template>

    <div @click="flipCard"  class="flashcard-item flashcardfadein">
        <div :style="{transform:`rotateX(${flipDegs}deg)`,zIndex:'2'}" class="front">
            <div @click.stop="dec" class="left-arrow"><i class="fas fa-arrow-alt-circle-left"></i></div>
             <div :class="{

                    h3fadeinright:faddingInRight,
                    h3fadeoutright:faddingOutRight,
                    h3fadeinleft:faddingInLeft,
                    h3fadeoutleft:faddingOutLeft,
                    
                    }" style="width:100%;">



                 <h3>{{array[ind]?.question || "Question"}}</h3>
                <h4>See Answer</h4>



            </div>
         
            <div @click.stop="inc" class="right-arrow"><i class="fas fa-arrow-alt-circle-right"></i></div>
        </div>

        <div style="width:100%; height:100%; transform:translateY(-100%); z-index:1;">
            <div :style="{transform:`rotateX(${flipDegs - 180}deg)`}" class="front">
                <div @click.stop="dec" class="left-arrow"><i class="fas fa-arrow-alt-circle-left"></i></div>
                <div :class="{

                    h3fadeinright:faddingInRight,
                    h3fadeoutright:faddingOutRight,
                    h3fadeinleft:faddingInLeft,
                    h3fadeoutleft:faddingOutLeft,
                    
                    }" style="width:100%;">



                    <h3>{{array[ind]?.answer || "Answer"}}</h3>
                    <h4>See Question</h4>



                </div>
                <div @click.stop="inc" class="right-arrow"><i class="fas fa-arrow-alt-circle-right"></i></div>
            </div>
        </div>

        
    </div>

         <h4 v-if="array.length" class="progress-counter-text flashcardfadein">{{ind + 1}} of {{array.length}}</h4>
         <h4 v-else class="progress-counter-text flashcardfadein">0 of 0</h4>
   
</template>

<script>
export default {
    props:['question','answer','cardID','array'],
    data(){
        return{
            flipDegs:0,
            ind:0,
            faddingOutRight:false,
            faddingInRight:false,
            faddingOutLeft:false,
            faddingInLeft:false,
        }
    },
    methods:{
        flipCard(){
            this.flipDegs+=180
        },
        dec(){
            if(this.faddingOutLeft) return;
            if(this.faddingInLeft) return;
            
            this.faddingOutLeft = true;
            setTimeout(()=>{
                this.faddingOutLeft = false;
                this.faddingInLeft = true;
                this.ind == 0 ? this.ind = this.array.length - 1 : this.ind--;
                setTimeout(()=>{
                    this.faddingInLeft = false;
                    },250)
            },250)

            
        },
        inc(){
            if(this.faddingOutRight) return;
            if(this.faddingInRight) return;

            this.faddingOutRight = true;
            setTimeout(()=>{
                this.faddingOutRight = false;
                this.faddingInRight = true;
                this.ind == this.array.length - 1 ? this.ind = 0 : this.ind++;
                setTimeout(()=>{
                    this.faddingInRight = false;
                    },250)
            },250)
        },
    }
}
</script>

<style scoped lang="scss" >

    .progress-counter-text{
            position:relative;
            text-align:center;
            color:black;
        }


    .right-arrow{
        margin:0.5rem;
    }
    .left-arrow{
        margin:0.5rem;
    }

    .front{
        width:100%;
        height:100%;
        display:flex;
        align-items:center;
        justify-content: center;
        backface-visibility: hidden;
        transition:0.3s;
        background:rgb(255, 255, 255);
        overflow:hidden;
    }


    .flashcard-item{
        
        width:50%;
        margin:1rem auto;
        border-radius:5px;
        color:black;
        padding:1rem 1rem;
        height:20rem;
        display:block;
        
       

       

        h3{
            text-align:center;
            width:100%;
            font-size:2rem;
        }

        i{
            font-size:2rem;
        }

        h4{
            text-align:center;
            width:100%;
            opacity:0.5;
            position: absolute;
            bottom:-2rem;
        }

        

         @media only screen and (max-width:600px){
            width:100%;

            & h3{
                font-size:1.5rem;
            }

            & h4{
                font-size:1rem;
            }

            i{
                font-size:1.5rem;
            }
        }
    }

    .h3fadeinright{
        animation:h3fadeinright 0.25s backwards;
    }
     .h3fadeoutright{
        animation:h3fadeoutright 0.25s forwards;
    }
     .h3fadeinleft{
        animation:h3fadeinleft 0.25s backwards;
    }
     .h3fadeoutleft{
        animation:h3fadeoutleft 0.25s forwards;
    }
    .flashcardfadein{
        animation:flashcardfadein 0.5s backwards !important;
    }

    @keyframes flashcardfadein{
          0%{
            opacity:0;
            transform:translateY(25%);
        }
        100%{
            opacity:1;
            transform:translateX(0%);
        }
    }

    @keyframes h3fadeinright{
        0%{
            opacity:0;
            transform:translateX(25%);
        }
        100%{
            opacity:1;
            transform:translateX(0%);
        }
    }
     @keyframes h3fadeoutright{
         0%{
            opacity:1;
            transform:translateX(0%);
        }
        100%{
           opacity:0;
            transform:translateX(-25%);
        } 
    }

      @keyframes h3fadeinleft{
        0%{
            opacity:0;
            transform:translateX(-25%);
        }
        100%{
            opacity:1;
            transform:translateX(0%);
        }
    }
     @keyframes h3fadeoutleft{
         0%{
            opacity:1;
            transform:translateX(0%);
        }
        100%{
            opacity:0;
            transform:translateX(25%);
        } 
    }
</style>