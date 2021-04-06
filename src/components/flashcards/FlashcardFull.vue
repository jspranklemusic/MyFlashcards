<template>
<section class="flashcard-fullview">
    <div class="flashcard-fullview__header">
        <div class="flex-title">
            

            <div>
                 <h1>{{flashcard?.title || ""}}</h1>
                <h2>{{flashcard?.subject || ""}}</h2>
            </div>
        
            <div class="study-edit-flex">
                <span>
                    Study
                </span>
                <Switch v-model="isStudyMode" @is-true="setStudyMode"/>
                <span>
                    Edit
                </span>
                &nbsp;
                    <button :disabled="isStudyMode" @click="deleteSet"> <i class="fas fa-trash"></i></button>
                &nbsp;
                    <button :disabled="isStudyMode" @click="addQuestion"><i class="fas fa-plus"></i></button>
                &nbsp;
            </div>

            

            
        </div>

     
    
    </div>
     
    <div v-show="!isStudyMode" ref="flash-container" class="flashcards-container">
        <flashcard-item 
            v-for="(question) in [...flashcard.questions].reverse()" 
            :cardID="question.id"
            :question="question.question"
            :answer="question.answer"
            :key="question"
            :class="{
                'cardfadingin':question.id==cardfadingin,
                'cardfadingout':question.id==cardfadingout,
            }"
            @delete-card="deleteCard"
            @edit-question="setIndividualQuestion"
            @edit-answer="setIndividualAnswer"
            > 
        </flashcard-item>
        <!-- <flashcard-item 
            v-if="flashcard.questions.length==0"
            @delete-card="deleteCard"
            @edit-question="setIndividualQuestion"
            @edit-answer="setIndividualAnswer"
        >
            
        </flashcard-item> -->
    </div>

    <div v-show="isStudyMode"  class="flashcards-container">
        
        <flashcard-study-item
            :array="[...flashcard.questions].reverse()"
            @delete-card="deleteCard"
            @edit-question="setIndividualQuestion"
            @edit-answer="setIndividualAnswer"
        >
        </flashcard-study-item>


        
    </div>
    
    
</section>
</template>

<script>
import FlashcardItem from "./FlashcardItem.vue"
import generateID from "../../scripts/generateID.js"
import Switch from '../ui/Switch.vue'
import FlashcardStudyItem from './FlashcardStudyItem.vue'
export default {
  components: { FlashcardItem, Switch, FlashcardStudyItem },
    data(){
        return{
            isStudyMode:true,
            cardfadingin:"",
            cardfadingout:""
        }
    },
    methods:{
        addQuestion(){
            let id = generateID(5);
            if(this.flashcard.questions.length > 0) 
                this.cardfadingin = id;
            this.flashcard.questions.push({question:"",answer:"",id:id});

        },
        deleteCard(id){
            // if(this.flashcard.questions.length > 1) 
            this.cardfadingout = id;
            

            //the timeout waits for the animation to finish.
            setTimeout(()=>{
                this.flashcard.questions = this.flashcard.questions.filter(question=>question.id!=id);
            },350)
            
        },
        setIndividualQuestion(id,content){
            let ind;
            if(id) {
                ind = this.flashcard.questions.findIndex(question=>question.id==id)
            } else{
                ind = 0
                this.flashcard.questions[ind].id = generateID(5);
            }
            this.flashcard.questions[ind].question = content;
        },
        setIndividualAnswer(id,content){
            let ind;
            if(id) {
                ind = this.flashcard.questions.findIndex(question=>question.id==id)
            } else{
                ind = 0
                this.flashcard.questions[ind].id = generateID(5);
            }
            this.flashcard.questions[ind].answer = content;
        },
        setStudyMode(bool){
            this.isStudyMode = bool;
        },
        deleteSet(){
            alert('deleted!')
        }
    },
    computed:{
        flashcard(){
            return this.$store.state.flashcards[this.index];
        },
        index(){
            return this.$store.state.flashcards.findIndex(flashcard=>flashcard.id==this.$route.params.id);
        }
    },

}
</script>

<style lang="scss" scoped>

    $input-margin:2rem;

    .flashcard-fullview{
        display: grid;
        width:100%;
        height:calc(var(--vh, 1vh) * 100);
        overflow: hidden;
        grid-template-rows: 6rem 1fr;


        &__header{
            height:100%;
            background:rgba(0, 0, 128, 0.26);
            color:white;
            display:flex;
            justify-content: center;
            align-items:center;
            width:100%;
            

            & .flex-title{
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content: space-evenly;
                height:100%;

                & h1{
                    font-size:1.25rem;
                    color:white;
                    font-weight:100;
                }

                & h2{
                    font-size:1rem;
                    color:rgba(255, 255, 255, 0.6);
                    text-align:center;
                }


            }

            .study-edit-flex{
                display:flex;
                background:rgb(211, 210, 187);
                padding:0.3rem;
                border-radius:100px;
                color:black;
                margin:0 0.5rem;
                align-items:center;

                & span{
                    margin:0 0.5rem;
                    font-size:0.8rem;
                    display:flex;
                    padding:0;
                    align-items:flex-end;
                    height:100%;

                }

                & button{
                    border:none;
                    border-radius:5px;
                    padding:3px 6px;
                    font-size:0.7rem;
                    background:white;
                }


            }

            & h2{
                font-size:1rem;
                opacity:0.9;
                font-weight:100;
            }

            & h1{
                margin:0rem 1rem;
            }

            .flashcard-controls{
                width:100%;
                display: flex;
                position:absolute;
                bottom:-$input-margin;
                height:$input-margin;

                & button{
                    font-size:1rem;
                    padding:0.25rem;
                }

                & input{
                    flex:1;
                    font-size:1rem;
                    padding:0.25rem 0.5rem;
                    border:none;
                }
            }
        }

        & .flashcards-container{
            overflow-x: hidden;
            overflow-y: scroll;
            padding:1rem 0;
            height:calc(calc(var(--vh, 1vh) * 100)*6rem);
        }
    }

    .cardfadingin{
        animation:cardfadingin 0.35s backwards;
        transition:0.35s;
    }
     .cardfadingout{
        animation:cardfadingout 0.35s forwards;
        transition:0.35s;
    }

    @keyframes cardfadingin{
        0%{
            max-height:0;
            margin:0 auto;
            opacity:0;
            padding:0;
        }
        100%{
            max-height:12rem;
            opacity:1;
            margin:1 auto;
        }
    }
     @keyframes cardfadingout{
        0%{
            max-height:12rem;
            opacity:1;
            margin:1 auto;
        }
        100%{
            max-height:0;
            margin:0 auto;
            opacity:0;
            padding:0;
        }
        
    }
    
    
</style>