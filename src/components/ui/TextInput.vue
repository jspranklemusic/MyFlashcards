<template>
<div :value="value">
    <input 
      @input="$emit('text-input',value)" 
      v-model="value" :id="inputDashed(splitText())" 
      :required="required || false"
      :placeholder="inputCapped(splitText())" 
      :type="type || 'text'">
      
    <label :for="inputDashed(splitText())">{{inputCapped(splitText())}}</label>

</div>
</template>

<script>
export default {
    emits:['text-input'],
    props:['input','type','required'],
    data(){
      return{
        value:""
      }
    },
    methods:{
        splitText(){
            let splitArr = (this.input || "my input").split("")
            return splitArr;
        },
        inputCapped(txtArr){
            txtArr[0] = txtArr[0].toUpperCase()
            return txtArr.join("");
        },
        inputDashed(txtArr){
            for(let i=0; i<txtArr.length; i++){
                if(txtArr[i]===" "){
                    txtArr[i]==="-"
                }
            }
            return txtArr.join("");
        }
    }
}
</script>

<style lang="scss" scoped>
     input{
      width:100%;
      font-size:1rem;
      padding:0.5rem;
      border-radius:100px;
      border:none;
      margin:0.5rem 0;
      outline:transparent;
      padding-left:1rem;
      transition:0.25s;
      box-shadow:none;
      

      &::placeholder{
        transition:0.5s;
      }
      
      &:focus{
        transform:scale(1.1);
        margin-bottom:1.5rem;
        margin-top:1rem;
        background:rgb(141, 212, 238);
        & + label{
          opacity:1;
          transform:translateY(-0.25rem) translateX(0.5rem);
        }
        &::placeholder{
          color:navy;
          opacity:0;
          
          
        }
      }
    }

    

    label{
      position: absolute;
      left:0;
      opacity:0;
      user-select: none;
      color: navy;
      transition:0.25s;
      transform:translateY(1rem) translateX(1.5rem);
      font-size:0.75rem;
    }
</style>