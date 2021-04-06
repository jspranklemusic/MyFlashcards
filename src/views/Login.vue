<template>
  <div class="flex-homepage">
      <img class="main-logo" src="../assets/books.svg" alt="">
      <h1>My Flashcards</h1>
      <form @submit.prevent="$store.state.user='not null'" class="login-form" action="">

        <TextInput input="username"/>
        <TextInput input="password"/>
      
        <div class="button-login-row">
          <main-button :class="{
            'switchbuttons-left':!loggingIn,
            'switchbuttons-right':loggingIn
            }" 
            type="submit">{{this.loggingIn ? "Register" : "Login"}}</main-button>
            
          <side-button @click="this.loggingIn = !this.loggingIn" :class="{
            'switchbuttons-left':loggingIn,
            'switchbuttons-right':!loggingIn
            }">{{!this.loggingIn ? "Register" : "Login"}}</side-button>
        </div>
      </form>

      
  </div>
</template>

<script>
import MainButton from "../components/ui/MainButton.vue"
import SideButton from "../components/ui/SideButton.vue"
import TextInput from "../components/ui/TextInput.vue"

export default 
  {
  components: { SideButton, MainButton, TextInput },
  data(){
    return{
      loggingIn:false,
    }
  }
}
</script>

<style lang="scss">


  h1{
    text-align:center;
    font-weight: 900;
  }

  .main-logo{
    width:8rem;
    height:8rem;
    display:block;
    margin:3rem auto;
    object-fit: cover;
    background:navy;
    padding:1rem;
    border-radius:50%;
  }


  .login-form{

    width:80%;
    max-width:500px;
    margin:1rem auto;

    & input{
      width:100%;
      font-size:1rem;
      padding:0.5rem;
      border-radius:100px;
      border:none;
      margin:0.5rem 0;
      outline:transparent;
      padding-left:1rem;
      transition:0.25s;
      

      &::placeholder{
        transition:0.5s;
      }
      
      &:focus{
        transform:scale(1.1);
        margin-bottom:1.5rem;
        margin-top:1rem;
        background:rgb(141, 212, 238);
        & + label{
          opacity:1;
          transform:translateY(-0.25rem) translateX(0.5rem);
        }
        &::placeholder{
          color:navy;
          opacity:0;
          
          
        }
      }
    }

    

    & label{
      position: absolute;
      left:0;
      opacity:0;
      user-select: none;
      color: navy;
      transition:0.25s;
      transform:translateY(1rem) translateX(1.5rem);
      font-size:0.75rem;
    }


   
  }

  .switchbuttons-left{
    animation:switchbuttons-left 0.5s backwards;
  }
  .switchbuttons-right{
    animation:switchbuttons-right 0.5s backwards;
  }

  @keyframes switchbuttons-left{
    0%{
      transform: translateX(10%);
    }
    100%{
      transform: translateX(0%);
    }
  }
  @keyframes switchbuttons-right{
    0%{
      transform: translateX(10%) scale(1.2);
      
    }
    100%{
      transform: translateX(0%) scale(1);
      
    }
  }
 
</style>
