<template>
<div class="scene">
    <div
        :class="{paper:true, 'swipe-note':swipenote}">
            <div class="button-flexrow">
                
                <i @click="$emit('new-note')" class="fas fa-edit"></i>
                <i @click="alertHandler" title='Press "Ctrl + s" to save.' class="fas fa-save"></i>
                <i @click="$emit('delete-note')" class="fas fa-trash"></i>
            </div>
            <div class="pattern">
                <div @click="notesClickHandler" class="content">
                        <h2 
                            @click.stop="note?.id ? $refs.title.focus() : $emit('init-notes')" 
                            ref="title" 
                            @input="save"
                            :contenteditable="true">
                            
                            <!-- {{note.title || "Your Title"}} -->
                           
                        </h2>
                        
                        <!-- <h4>{{note.subject || "subject"}}</h4> -->
                        <em style="opacity:0.5;">{{note.date ? note.date.toLocaleDateString() + " at " + note.date.toLocaleTimeString() : mountedDate.toLocaleDateString() + " at " + mountedDate.toLocaleTimeString() }}</em>
                        <br><br>
                        
                        <p @input="save" ref="content" 
                            :contenteditable="true">
                            
                        </p>
                        
                </div>
            </div>
        </div>
</div>
</template>

<script>
export default {
    props:{
        note:{
            default:{}
        },
        swipenote:{
            default:false
        }
    },
    emits:['delete-note', 'new-note','change-content','init-notes'],
    data(){
        return{
            mountedDate:new Date(Date.now()),
            
        }
    },
    methods:{
        notesClickHandler(){
            
            if(this.note?.id){

                this.$refs.content.focus()
            } else{
                console.log('yolo')
                this.$emit('init-notes')
                this.$refs.content.focus()
            }
            
        },
        titleClickHandler(){
             if(this.note?.id){

                this.$refs.title.focus()
            } else{
                console.log('yolo')
                this.$emit('init-notes')
                this.$refs.title.focus()
            }
        },
        alertHandler(){
            this.save();
            if(!this.$store.state.alert){
                this.$store.state.alert="Note saved!"
                setTimeout(()=>{
                this.$store.state.alert="" 
                },2000)
            }
        },
        save(){
            this.$emit('change-content', 
            {
                text:this.$refs.content.innerText,
                title:this.$refs.title.innerText
            });
        }
    },
    computed:{
        placeholderTitle(){
            return this.note.title ? "" : "Your Title Here"
        },
        placeholderContent(){
            return this.note.content ? "" : "Your text content here."
        }
    },
    updated(){
        this.$refs.content.innerText = this.note.content || "";
        this.$refs.title.innerText = this.note.title || ""
        if(this.swipenote) console.log(this.note.content)
        
    },
    mounted(){
        console.log(this.note.title, this.note.content)
        this.$refs.content.innerText = this.note.content || "";
        this.$refs.title.innerText = this.note.title || "";
        
        document.addEventListener('keydown',e=>{
            
          if(e.ctrlKey && e.key=="s") {
              e.preventDefault();
              this.alertHandler();

            }
          if(e.metaKey && e.key=="s") {
              e.preventDefault();
              this.alertHandler();
            }
        })
    }
}
</script>








<style lang="scss" scoped>

h2,h4{
    transform:translateY(-3px);
}
h4,em{
    user-select: none;
}
.paper {
  width: 100%;
  min-width:250px;
  max-width:750px;
  height: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: rgb(248, 244, 202);
  box-shadow: 0px 0px 5px 0px #888;
  color:rgb(46, 46, 46);
  border-radius:5px;
  overflow:hidden;
  margin:0 auto;
}



/* styling red vertical line */
.paper::after {
  content: '';
  width: 2px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 40px;
  background-color: rgba(255, 0, 0, 0.39);
}

/* styling blue horizontal lines */
.pattern {
  height: 100%;
  background-image: repeating-linear-gradient(rgb(248, 244, 202) 0px, rgb(248, 244, 202) 19px, rgba(0, 128, 128, 0.493) 20px);
}
/* styling text content */
.content {
  padding-top: 4px;
  padding-left: 56px;
  padding-right: 16px;
  line-height: 20px;
  font-size: 14px;
//   letter-spacing: 1px;
  word-spacing: 1px;
  overflow-y:scroll;
  height:100%;
  font-family:default;
  white-space:pre-wrap


}

.button-flexrow{
    display:flex;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:2rem;
    padding:0.5rem;
    align-items:center;
    font-size:1.15rem;
    justify-content: flex-end;

    & i{
        margin:0 0.5rem;
    }
    & figure{
        display:flex;
        align-items:center;
    }
}


[contenteditable="true"]:focus{
    outline:none;
    background:rgba(223, 201, 77, 0.281);
    transition:0.3s;
    
    &::selection{
        background:rgb(71, 193, 241);
    }
}

p{
    transform:translateY(-4px);

    &:empty{

        

        &::after{
            content:"Your text here.";
            color:grey;
            opacity:1;
            transition:0.4s;


            
        }

        &:focus{
            &::after{
                content:"Your text here.";
                opacity:0;
                transition:0.4s;
            }
        }
    }
}
h2{
     &:empty{

        &::after{
            content:"Your text here.";
            color:grey;
            opacity:1;
            transition:0.4s;
            
        }
        &:focus{
            &::after{
                content:"Your text here.";
                opacity:0;
                transition:0.4s;
            }
        }
    }
}

.swipe-note{
    animation:swipe-note 0.8s ease-in-out;
    transform-style: preserve-3d;
    transform-origin:0%;
    backface-visibility:visible;
    
}

.scene{
    perspective: 1500px;
    height:100%;
}

@keyframes swipe-note{
    0%{
        opacity:0.25;
        transform: rotateY(100deg);
    }
    100%{
        opacity:1;
        transform: rotateY(360deg);
    }
}
</style>