<template>
    <main class="subjects">
        <h1>Flashcards</h1>
        <section v-if="$store.state.flashcards.length" class="subjects-grid">
            <flashcard-info 
                @click="$router.push(`/flashcards/${flashcard.id}`)"
                v-for="flashcard in $store.state.flashcards" 
                :title="flashcard.title"
                :subject="flashcard.subject"
                :description="flashcard.description"
                :questions="flashcard.questions"
                :id="flashcard.id"
                :key="flashcard.id">
            </flashcard-info>
        </section>
        
        <main-button @click="$store.state.flashModalVisible = !$store.state.flashModalVisible" style="width:15rem;margin:1rem auto;display:block;">Add a Flashcard Set</main-button>


    </main>
</template>

<script>
import MainButton from '../components/ui/MainButton.vue'
import FlashcardInfo from '../components/flashcards/FlashcardInfo.vue'
export default {
  components: { MainButton,  FlashcardInfo },
   
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
        background:navy;
        width:max-content;
        margin:1rem auto;
        padding:0.5rem 4rem;
        border-radius:100px;
        box-sizing:border-box;
    }
</style>