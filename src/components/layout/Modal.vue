<template>
    <section :class="{modal:true,'fadein-modal':open,'fadeout-modal':!open}">

        <div class="modal-content" :class="{'swingin-form':open, 'swingout-form':!open}">
            <h1>Add Subject<span @click="hideModal"><i class="far fa-times-circle"></i></span></h1>

            <form @submit.prevent="addSubject"> 
                <br>
                <TextInput ref="name" input="class Name"/>
                <br><br>
                <TextInput ref="description" input="description"/>
                <br><br>
                <main-button style="margin:auto;display:block;">Create</main-button>
                <br><br>

            </form>
        </div>
        
        
    </section>
</template>

<script>
import TextInput from '../ui/TextInput.vue'
import MainButton from '../ui/MainButton.vue'
export default {
  components: { TextInput, MainButton },
  data(){
      return{
          open:true,
      }
  },
  methods:{
      bindToInput(input){
          console.log(input)
      },
      hideModal(){
          this.open=!this.open;
          setTimeout(()=>{
              this.$store.state.modalVisible=!this.$store.state.modalVisible;
          },600)
      },
      addSubject(){
          this.$store.state.subjects.push({
              name:this.$refs.name.value,
              description:this.$refs.description.value
          });
          this.description="";
          this.name="";
          this.hideModal();
      }
  }
    
}
</script>

<style lang="scss" scoped>


    h1{
        background:navy;
        width:100%;
        min-width:270px;
        margin:auto;
        padding:2rem 0;

        & i{
            position:absolute;
            right:-2rem;
        }

    }
    .modal{
        background:rgba(0, 0, 0, 0.90);
        z-index:15;
        width:100%;
        height:calc(var(--vh, 1vh) * 100);
        position:absolute;
        top:0;
        left:0;


        &-content{
            width:60%;
            min-width:280px;
            background:rgba(128, 128, 128, 0.8);
            margin:4rem auto;
        }
    }

    .fadein-modal{
        animation:fadein-modal 0.6s backwards;
    }
    .fadeout-modal{
        animation:fadeout-modal 0.6s forwards;
    }

    .swingin-form{
        animation:swingin-form 0.4s forwards ;
    }
    .swingout-form{
        animation:swingout-form 0.6s forwards ease-out;
    }
    @keyframes swingin-form{
        0%{
            transform:translateX(20rem)
        }
        60%{
            transform:translateX(-2rem)
        }
        100%{
            transform:translateX(0rem)
        }
    }

    @keyframes swingout-form{
        0%{
            transform:translateY(0);
        }
        30%{
            transform:translateY(-2rem);
        }
        100%{
            transform:translateY(10rem);
        }
    }

    @keyframes fadein-modal{
        0%{
            opacity:0;
        }
        100%{
            opacity:1;
        }
    }

    @keyframes fadeout-modal{
        0%{
            opacity:1;
        }
        100%{
            opacity:0;
        }
    }

    

    form{
        width:85%;
        margin:auto;
    }
</style>