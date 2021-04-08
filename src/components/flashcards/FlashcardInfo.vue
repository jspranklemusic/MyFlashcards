<template>
    <div class="subject-fade">
    <section class="subject-card">
        <h2><i class="fas fa-book"></i> {{title || "Carbon Structures"}}</h2>
        <h3>{{subject || "Organic Chemistry"}} &nbsp; | &nbsp; {{questions?.length || 0}} cards</h3>
        <hr>
        <p>{{description || "An exploration of carbon structures."}}</p>
        <div class="edit-study-btns">
            <!-- <button>Edit</button>
            <button>Study</button> -->
        </div>
        
    </section>
    </div>
</template>

<script>
export default {
    props:['title','questions', 'description', 'subject'],
  
}
</script>

<style lang="scss" scoped>

    h2{
        font-weight:900;
        text-align:center;
        padding:0.5rem;
        padding-top:1rem;
        word-break:break-all;
        font-size:1.25rem;
      
    }



    h3{
        font-weight:500;
        text-align:center;
        opacity:0.7;
        font-size:0.9rem;
    }

    hr{
        width:90%;
        margin:0.5rem auto;
        border:transparent;
        border-bottom:1px solid rgba(128, 128, 128, 0.486);
        
    }

    p{
        padding:1rem;
        font-size:0.9rem;
    }

    .edit-study-btns{
        display:flex;
        width:100%;

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
            opacity:0.5;
            transform:scale(0.92) translateX(1rem);
        }

        100%{
            opacity:1;
            transform:scale(1) translateX(0);
           
        }
    }

    
</style>


