<template>
    <main class="subjects">
        <h1>Subjects</h1>
        <section class="subjects-grid">
            <subject-card 
                v-for="subject in $store.state.subjects" 
                :name="subject.name"
                :description="subject.description"
                :key="subject">
            </subject-card>
        </section>
        
        <main-button @click="$store.state.modalVisible = !$store.state.modalVisible" style="width:15rem;margin:1rem auto;display:block;">Add a Subject</main-button>


    </main>
</template>

<script>
import MainButton from '../components/ui/MainButton.vue'
import SubjectCard from '../components/subjects/SubjectCard.vue'
export default {
  components: { MainButton, SubjectCard },
   
}
</script>

<style lang="scss" scoped>
    .subjects-grid{
        display:grid;
        margin:2rem 0;
        grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
        column-gap:2rem;
        row-gap:2rem;
        padding:2rem;
        align-items: stretch;
        justify-content: center;
    }
    h1{
        margin-top:2rem;
        background:navy;
        width:max-content;
        margin:auto;
        margin-top:2rem;
        padding:0.5rem 4rem;
        border-radius:100px;
        box-sizing:border-box;
    }
</style>