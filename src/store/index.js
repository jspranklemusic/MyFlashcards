import { createStore } from "vuex";

export default createStore({
  state: {
    _id:null,
    modalVisible:false,
    flashModalVisible:false,
    alert:"",
    subjects:[
      {
      name:"", 
      description:""
      }
    ],
    flashcards:[

    ],
    notes:[
      
    ]
  },
  mutations: {},
  actions: {},
  modules: {},
});
