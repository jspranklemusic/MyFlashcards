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
                    @init-notes="initNotes"
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
                <!-- <h5>{{note.subject}}</h5> -->
                <em>{{note.date.toLocaleDateString()}}</em>
                <p>{{note.content.length > 40 ? note.content.slice(0,40)+"..." : note.content+""}}</p>
            </div>
            <em style="color:grey;" v-show="!notes.length">You don't have any notes yet.</em>
        </section>
    </div>
</template>

<script>
import Note from '../components/notes/Note.vue'
import generateID from '../scripts/generateID.js'
import Alert from '../components/ui/Alert.vue'
export default {
  components: { Note, Alert},
    data(){
        return{
            selectedID:1,
            deletedID:null,
            selectedIndex:0,
            addNoteTimeout:null,
            toggleNotesList:false,
        }
    },
    methods:{
        async initNotes(){
            let myDate = new Date( Date.now() );
            let id = generateID();
            
            this.notes.push({
                title:"",
                date:myDate,
                subject:"",
                id:id,
                canEdit:false,
                content:""
            })

            this.selectedID = id;
            this.selectedIndex = 0;

             await fetch('/.netlify/functions/save',{
                        method:"POST",
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            ...this.$store.state
                        })
                    })
        },
        async addNote(){
        
            if(this.addNoteTimeout) return;

                //this will have some tricky logic, because I will need to wait until the transition
                //of the turning page is complete before nullifying the value of ""
                let myDate = new Date(Date.now())

                this.notes.push({
                    title:"",
                    date:myDate,
                    subject:"",
                    id:generateID(5),
                    canEdit:false,
                    content:""
                })

                this.addNoteTimeout = setTimeout(()=>{
                    this.selectedIndex = this.notes.length - 1;
                    this.selectedID = this.notes[this.selectedIndex].id;
                    this.addNoteTimeout = null;
                    
                },1000)
                 await fetch('/.netlify/functions/save',{
                        method:"POST",
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            ...this.$store.state
                        })
                    })
        
                
            
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
            if(!this.deletedID){
                this.deletedID = this.selectedID;
                setTimeout(async ()=>{
                    // let arr = []; (arr);
                    // this.notes.forEach(note=>{
                    //     if(note.id != this.selectedID) arr.push(note)
                    // })
                    // this.notes = arr;

                    this.notes.splice(this.selectedIndex,1);
                    if(this.selectedIndex > 0) this.selectedIndex--;
                    this.selectedID = this.notes[this.selectedIndex]?.id;
                    this.deletedID=null;

                    await fetch('/.netlify/functions/save',{
                        method:"POST",
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            ...this.$store.state
                        })
                    })
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
    computed:{
        notes(){
            return this.$store.state.notes;
        }
    }
}
</script>










<style lang="scss" scoped>

h1{
        background:navy;
        width:max-content;
        margin:1rem auto;

        padding:0.5rem 4rem;
        border-radius:100px;
        box-sizing:border-box;
    }

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