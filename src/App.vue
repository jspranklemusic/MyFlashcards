<template>
  <div class="app">
    <div class="layout" v-if="$store.state._id">
      <header>
         <MainSidebar/>
         
      </header>
     
      <main>
         <router-view></router-view>
         <modal
         v-if="$store.state.modalVisible"
         ></modal>
           <flash-modal
         v-if="$store.state.flashModalVisible"
         ></flash-modal>
      </main>
     
    </div>
    <div v-else>
      <Login/>
    </div>

  </div>
</template>

<script>
import MainSidebar from './components/layout/MainSidebar.vue'
import Modal from './components/layout/Modal.vue'
import FlashModal from './components/layout/FlashModal.vue'
import Login from './views/Login.vue'
export default {
  components: { Login, MainSidebar, Modal, FlashModal },
  data(){
    
    return{
      loggingIn:false,
    }
  },
  methods:{
    checkForID(){
      if(localStorage._id){

        this.$store.state._id = localStorage._id
        return true;
      }else{
        localStorage.clear();
        return false;
      }
    },
    async checkLogin(){
      const response = await fetch('/.netlify/functions/fetch',{
        headers:{
          'Content-Type':'application/json'
        },
        method:"POST",
        body:JSON.stringify({
          _id:localStorage._id
        })
      })
      if(response.ok){
        const data = await response.json();
        
        this.$store.state.flashcards = data.flashcards;
        this.$store.state._id = data._id;
        this.$store.state.notes = data.notes;
        this.$store.state.notes.map(note=>note.date = new Date(note.date))
        this.$store.state.user = data.user;

      }else{
        return
      }
    }
  },
  async created(){
    //first, check local storage for a user id. If there is one, fetch the user's info from the server.
    if(this.checkForID() ){
      this.checkLogin();
    }
  },
  mounted(){
    function setVH(){
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVH();
    window.addEventListener('resize', () => {
      setVH();
    });
  }

}
</script>

<style lang="scss">
     *{
    padding:0;
    margin:0;
    box-sizing:border-box;
    position:relative;
  }

  html{
      -webkit-tap-highlight-color: transparent;
  }

  .font-main{
    font-family: 'Kumbh Sans', sans-serif;
  }
  
  body{
    width:100vw;
    height:calc(var(--vh, 1vh) * 100);
    color:rgba(255, 255, 255, 0.938);
    overflow: hidden;
    background:linear-gradient(rgb(11, 145, 223),rgb(25, 117, 170));
    font-family: 'Kumbh Sans', sans-serif;
  }


  .layout{
    display:grid;
    grid-template-columns: 9rem 1fr;
    width:100vw;
    
    & main{
      height:calc(var(--vh, 1vh) * 100);
      width:100%;
      overflow-y:scroll;
    }

    @media only screen and (max-width:600px){
      grid-template-columns: 100%;
    }
  }
</style>