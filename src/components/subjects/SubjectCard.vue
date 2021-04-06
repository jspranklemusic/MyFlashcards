<template>
    <div class="subject-fade">
    <section class="subject-card">
        <h2><i class="fas fa-book"></i> {{name || "Subject Here"}}</h2>
        <h3>{{flashSets?.length  || 0 }} Flashcard Sets</h3>
        <hr>
        <p>{{description || "This is a description."}}</p>
    </section>
    </div>
</template>

<script>
export default {
    props:['name','flash-sets', 'description'],
  
}
</script>

<style lang="scss" scoped>

    h2{
        font-weight:900;
        text-align:center;
        padding:0.5rem;
        padding-top:1rem;
        word-break:break-all;
      
    }



    h3{
        font-weight:500;
        text-align:center;
        opacity:0.7;
        font-size:1rem;
    }

    hr{
        width:90%;
        margin:0.5rem auto;
        border:transparent;
        border-bottom:1px solid rgba(128, 128, 128, 0.486);
    }

    p{
        padding:1rem;
        word-break:break-all;
        
    }

    .subject-card{
        background:linear-gradient(white,rgb(230, 233, 248));
        border-radius:5px;
        width:100%;
        max-width:600px;
        min-height:10rem;
        height:100%;
        margin:auto;
        color:black;

        &::after{
            content:"";
            position: absolute;
            background:rgb(211, 180, 42);
            box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.37);
            width:100%;
            height:100%;
            top:5px;
            left:5px;
            border-radius:5px;
            z-index:-1;
            
        }
    }

    .subject-fade{
        animation:fadein-subject 0.5s backwards;
        transition:0.5s;
        max-height:100%;
        
    }

    @keyframes fadein-subject{
        0%{
            opacity:0;
            transform:scale(0.8) translateX(2rem);
        }

        100%{
            opacity:1;
            transform:scale(1) translateX(0);
           
        }
    }

    
</style>


