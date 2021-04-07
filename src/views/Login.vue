<template>
  <div class="flex-homepage">
      <img class="main-logo" src="../assets/books.svg" alt="">
      <h1>My Flashcards</h1>
      <form @submit.prevent="formHandler" class="login-form" action="">

        <TextInput @text-input="setUsername" input="username"/>
        <TextInput @text-input="setPassword" input="password"/>
      
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
      <div class="error" v-show="this.error.length">{{error}}</div>

      
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
      username:"",
      password:"",
      error:"",
    }
  },
  methods:{
    formHandler(){
      if(!this.loggingIn){
        this.login();
      }else{
        this.register();
      }
    },
    async register(){

      if(this.username.length < 5){
        this.error = "Username must be at least 5 characters long."
        return
      }
      if(this.password.length < 5){
        this.error = "Password must be at least 5 characters long."
        return
      }

      const response = await fetch('/.netlify/functions/register',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username:this.username,
          password:this.password
        })
      });

      if(response.ok){
        const data = await response.json();
        this.$store.state.username = data.username;
        this.$store.state._id = data._id;
        this.$store.state.flashcards = data.flashcards;
        this.$store.state.notes = data.notes;
        localStorage._id = data._id;
      } else{
        this.error = "Username already exists."
      }
    },
    async login(){
      const response = await fetch('/.netlify/functions/login',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username:this.username,
          password:this.password
        })
      });

      if(response.ok){
        const data = await response.json();
        this.$store.state.username = data.username;
        this.$store.state._id = data._id;
        this.$store.state.flashcards = data.flashcards;
        this.$store.state.notes = data.notes;
        localStorage._id = data._id;
      } else{
        this.error = "Invalid login credentials"
      }

    },
    setUsername(txt){
      this.username = txt
    },
    setPassword(txt){
      this.password = txt
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

  .error{
    background-color:red;
    width:fit-content;
    margin:1rem auto;
    padding:0.5rem 1rem;
    animation:fadeinerror 0.3s backwards;
    

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

  @keyframes fadeinerror{
    0%{
      opacity:0;
      transform:translateY(40px);
    }
    70%{
      transform:translateY(-5px);
    }
    100%{
      opacity:1;
      transform:translateY(0px);
    }
  }
 
</style>
