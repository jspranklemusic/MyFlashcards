<template>
    <div class="flashcard-item">
       
            <div class="flex-item">
                <div>
                    <input ref="question" @blur="$emit('edit-question',cardID,$refs.question.value)" :value="question || ''" @input="$emit" :placeholder="question || 'Question'" type="text">
                    <div class="after"></div>
                </div>
               
                <div>
                    <input  ref="answer" @blur="$emit('edit-answer',cardID,$refs.answer.value)" :value="answer || ''" :placeholder="answer || 'Answer'" type="text">
                     <div class="after"></div>
                </div>     
            </div>
           
             <div class="icons-row">
                <i @click="$emit('delete-card',cardID)" class="fas fa-trash"></i>
            </div>
            
    </div>
</template>

<script>
export default {
    props:['question','answer','cardID','hidecan','save'],
}
</script>

<style lang="scss" >
    .flashcard-item{
        width:75%;
        max-width:600px;
        margin:1rem auto;
        background:rgb(245, 219, 73);
        border-radius:5px;
        padding:1rem 2rem;
        display:flex;
        flex-direction:column;
        align-items:center;
        
        .flex-item{
            flex:1;
            width:100%;
        }
           

        & .icons-row{
            color:Black;
            flex:0;
            margin-left:1.5rem;

        }


        & .input-container{
            transition:0.3s;
            

        }

        & .visible{
            max-height:5rem;
        }
   
        & input{
            padding:0.5rem 0.5rem;
            font-size:1rem;
            width:100%;
            margin:0.5rem 0 1rem 0;
            border:none;
            outline:transparent;
            transition:0.2s;
            position:relative;


            &:focus{
                background:rgb(255, 251, 196);
            }

            &:focus+.after{
                width:100%;
            } 

        }

        .after{
            background:orange;
            height:3px;
            width:0%;
            position:absolute;
            bottom:1rem;
            transition:0.3s;
        }

        @media only screen and (max-width:600px){
            width:100%;
            max-width:100%;
        }
    }
</style>