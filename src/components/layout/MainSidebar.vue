<template>
    <div :class="{sidebar:true, 'transform-left':!visible}">
        <div class="sidebar__wrapper" style="position:relative;">
            <router-link to="/">
                <img src="../../assets/books.svg" alt="">
            </router-link>
            
            <h3>My Flashcards</h3>
            <!-- <nav>
                <router-link to="/subjects"><i class="fas fa-square-root-alt"></i> Subjects</router-link>
            </nav>
            <nav>
                <router-link to="/quizzes"><i class="fas fa-question-circle"></i> Quizzes</router-link>
            </nav> -->
            <nav>
                <router-link to="/flashcards"><i class="far fa-square"></i> Flashcards</router-link>
            </nav>
            <nav>
                <router-link to="/notes"><i class="fas fa-pencil-alt"></i> Notes</router-link>
            </nav>
            <!-- <nav>
                <router-link to="/settings"><i class="fas fa-cog"></i> Settings</router-link>
            </nav> -->
             <nav >
                <a href="#"><span @click="$store.state.user=null"><i class="fas fa-user"></i> Logout</span></a>
            </nav>
            <div :class="{'transform-right':!visible,'toggle-icon':true}" >
                <i @click="visible=!visible" class="fas fa-ellipsis-h" ></i>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            visible:true
        }
    }
}
</script>

<style lang="scss" scoped>
    .sidebar{
        background:rgba(255, 255, 255, 0.932);
        height:calc(var(--vh, 1vh) * 100);
        width:9rem;
        position:absolute;
        box-shadow:0px 5px 5px black;
        top:0;
        z-index:10;
        left:0;
        transition:0.25s;

        & h3{
            font-size:1rem;
            margin-bottom:1rem;
        }

        & nav{
            width:100%;
            text-align:left;
            padding:0.75rem 0;
            border-top:1px solid rgba(0,0,0,.1);

            &:last-child{
                border-bottom:1px solid rgba(0,0,0,.08);
            }
        }

        & a{
            margin-left:0.5rem;
            text-decoration:none;
            font-size:0.8rem;
            color:rgb(59, 59, 59);

            & i{
                margin:0 .5rem;
                background:rgba(128, 126, 0, 0.253);
                padding:0.35rem;
                border-radius:50%;
            }
        }
        

        &__wrapper{
            display:flex;
            flex-direction:column;
            align-items:center;
            color:black;
            height:100%;


        }

        & img{
            width:4rem;
            height:4rem;
            background:navy;
            padding:0.5rem;
            border-radius:50%;
            margin:1rem 0;
        }

        

       
    }
     .toggle-icon{
           position: fixed;
           bottom:1rem;
           left:1rem;
           transition:0.25s;
           background:skyblue;
           border-radius:50%;
           width:2rem;
           height:2rem;
           display:flex;
           align-items: center;
           justify-content: center;

           @media only screen and (min-width:600px){
               display:none;
           }
           
        }

    .transform-left{
        transform:translateX(-9rem);
    }
    .transform-right{
        transform:translateX(9rem) rotateZ(90deg) scale(1);
    }
</style>