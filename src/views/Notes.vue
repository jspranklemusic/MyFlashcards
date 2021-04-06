<template>
    <div class="notes-layout">
        <div class="notes-header">
            <h1>Notepad</h1>
            <!-- {{backgroundNoteProp.content}}
            {{foregroundNoteProp.content}} -->
           
            <h3 @click="toggleNotesHandler" class="mobile-screen-switch">See All Notes -></h3>
            <alert v-if="$store.state.alert">{{$store.state.alert}}</alert>
            
            
        </div>
    
        <section class="notes-container">
            <Note 
                style="z-index:1;"
                :note="backgroundNoteProp()" 
            />
            <div class="second-notepad" >
                <Note 
                    @change-content="changeContent" 
                    @delete-note="deleteNote" 
                    @new-note="addNote"
                    :swipenote="addNoteTimeout"
                    :class="{'notepad-fall':deletedID}"
                    style="z-index:2;"
                    :note="foregroundNoteProp()" 
                />
            </div>
             
        </section>

        <section class="notes-sidebar" :class="{'toggle-notes':toggleNotesList}">
            <div @click="selectNote(note.id)" :class="{

                'notes-sidebar__item':true,
                'noteitem-slide-in':true,
                'noteitem-slide-out':deletedID == note.id,
                'yellow-bg':selectedID==note.id
                
                }" v-for="note in [...notes].reverse()" :key="note.id" >
                <h3>{{note.title}}</h3>
                <h5>{{note.subject}}</h5>
                <em>{{note.date}}</em>
                <p>{{note.content.length > 40 ? note.content.slice(0,40)+"..." : note.content+""}}</p>
            </div>
        </section>
    </div>
</template>

<script>
import Note from '../components/notes/Note.vue'
import Alert from '../components/ui/Alert.vue'
export default {
  components: { Note, Alert},
    data(){
        return{
            notes:[
                {
                    title:"Title",
                    date:new Date(Date.now()).toLocaleDateString(),
                    subject:"Class 101",
                    id:1,//Math.random().toString(),
                    canEdit:false,
                    content:"Let's write something."
                },
            ],
            selectedID:1,
            deletedID:null,
            selectedIndex:0,
            addNoteTimeout:null,
            toggleNotesList:false,
        }
    },
    methods:{
        addNote(){
        
            if(this.addNoteTimeout) return;

                //this will have some tricky logic, because I will need to wait until the transition
                //of the turning page is complete before nullifying the value of ""
            

                this.notes.push({
                    title:"Title",
                    date:new Date(Date.now()).toLocaleDateString(),
                    subject:"Class 101",
                    id:Math.random().toString(),
                    canEdit:false,
                    content:"Let's write something."
                })
                this.addNoteTimeout = setTimeout(()=>{
                    this.selectedIndex = this.notes.length - 1;
                    this.selectedID = this.notes[this.selectedIndex].id;
                    this.addNoteTimeout = null;
                    
                },1000)
        
                
            
        },
        changeContent(obj){
            let note = this.notes[this.selectedIndex]
            note.content = obj.text
            note.title = obj.title

        },
        selectNote(id){
            this.selectedID=id;
            this.selectedIndex = this.notes.findIndex(note=>note.id==this.selectedID)
        },
        deleteNote(){
            if(!this.deletedID & this.notes.length > 1){
                this.deletedID = this.selectedID;
                setTimeout(()=>{
                    let arr = []; (arr);
                    this.notes.forEach(note=>{
                        if(note.id != this.selectedID) arr.push(note)
                    })
                    this.notes = arr;
                    if(this.selectedIndex > 0) this.selectedIndex--;
                    this.selectedID = this.notes[this.selectedIndex]?.id;
                    this.deletedID=null;
                },500)
                
            }
        },
        toggleNotesHandler(){
            this.toggleNotesList = !this.toggleNotesList
        },
        backgroundNoteProp(){
            return !this.deletedID ? this.notes[this.selectedIndex] : this.notes[this.selectedIndex - 1] || this.notes[this.selectedIndex + 1]       
        },
        foregroundNoteProp(){
            return !this.addNoteTimeout ? this.notes[this.selectedIndex] : this.notes[this.notes.length - 1];
        }

    },
    // computed:{
    //     backgroundNoteProp(){
    //         return !this.deletedID ? this.notes[this.selectedIndex] : this.notes[this.selectedIndex - 1] || this.notes[this.selectedIndex + 1]       
    //     },
    //     foregroundNoteProp(){
    //         return !this.addNoteTimeout ? this.notes[this.selectedIndex] : this.notes[this.notes.length - 1];
    //     }
    // }
}
</script>










<style lang="scss" scoped>

.notes-sidebar{

    height:100%;
    width:250px;
    overflow-y:scroll;
    transition:0.4s;
    background:rgba(255, 255, 255, 0.959);
    z-index:5;

    &__item{
        
        color:rgb(36, 36, 36);
        padding:1rem;
        border-bottom:1px solid rgba(0,0,0,0.1);
        transition:0.2s;
    }

    & h3{
        font-size:1rem;
    }

    & h5{
        font-size:0.8rem;
    }

    & em{
        opacity:0.5;
        font-size:0.8rem;
    }

    & p{
        font-size:0.7rem;
    }
}

.yellow-bg{
    background:rgba(238, 233, 193, 0.952);
}


.notes-layout{
    display:grid;
    grid-template-columns: 1fr 250px;
    grid-template-rows:5rem calc(calc(var(--vh, 1vh) * 100) - 5rem);
    height:calc(var(--vh, 1vh) * 100);
    width:100%;
    overflow:hidden;
    justify-content: center;

    @media only screen and (max-width:600px) {
        grid-template-columns: 100% 0;
    }
}

.notes-header{
    grid-column: 1/-1;
}

.notes-container{
    margin:0;
}

.noteitem-slide-in{
    animation:noteitem-slide-in 0.5s backwards;
    overflow:hidden;
}

.noteitem-slide-out{
    animation:noteitem-slide-out 0.5s forwards;
    overflow:hidden;
}

.second-notepad{
    position:absolute;
    width:100%;
    top:0;
    left:0;
    height:100%;
}

.toggle-notes{
    transform:translateX(-250px);
}



.mobile-screen-switch{
    @media only screen and (min-width:600px){
        display:none;
    }
    display:block;
    color:black;
    text-align:center;
    font-size:0.7rem;
    transform:translateY(0.25rem);
    background:white;
    padding:0.5rem 1rem;
    width:max-content;
    margin:auto;
    border-radius:100px;
}

.notepad-fall{
    animation:notepad-fall 0.75s forwards;
}

@keyframes noteitem-slide-in{
    0%{
        max-height:1px;
        opacity:0;
        padding:0;
    }
    100%{
        max-height:100px;
        opacity:1;
        padding:1rem;
    }
}

@keyframes notepad-fall{
    0%{
        transform: translateY(0%);
        opacity:1;
    }
    100%{
        transform: translateY(100%);
        opacity:0;
    }
}

@keyframes noteitem-slide-out{
    0%{
        max-height:100px;
        opacity:1;
        padding:1rem;
    }
    100%{
        max-height:1px;
        opacity:0;
        padding:0;
    }
    
}



</style>