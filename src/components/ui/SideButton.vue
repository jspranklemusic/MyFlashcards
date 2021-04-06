<template>
    <span class="side-button">
        <slot></slot>
    </span>
</template>

<style lang="scss" scoped>
  .side-button{
      text-align: center;
      display: inline-block;
      width:45%;
      cursor:pointer;
      margin-left:2.5%;
      padding:0.25rem 1rem;
      font-weight:500;
      border-bottom:3px solid navy;
      transition:0.25s;
  }
</style>