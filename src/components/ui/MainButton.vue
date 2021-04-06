<template>
    <button class="main-button">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
.main-button{
      background:rgb(235, 235, 83);
      font-size:.85rem;
      padding:0.3rem 2rem;
      margin:0.5rem 0;
      border:none;
      border-radius:100px;
      font-family: inherit;
      font-weight:900;
      border:0.4rem solid goldenrod;
      width:50%;
      transition:0.25s;
      cursor:pointer;
      
  }
</style>