import { createRouter, createWebHistory } from "vue-router";
import Subjects from "../../src/views/Subjects.vue"
import Notes from "../../src/views/Notes.vue"
import Flashcards from "../../src/views/Flashcards.vue"
import FlashcardFull from "../components/flashcards/FlashcardFull.vue"



const routes = [
    {
      path:'/',
      component:Notes
    },
    {
      path:'/subjects',
      component:Subjects
    },
    {
      path:'/notes',
      component:Notes
    },
    {
      path:'/flashcards',
      component:Flashcards
    },
    {
      path:'/flashcards/:id',
      component:FlashcardFull
    }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
