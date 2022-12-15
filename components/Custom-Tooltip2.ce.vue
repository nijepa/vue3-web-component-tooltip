<template>
  <div class="tooltip-container">
    <slot />
    <div
      class="tooltip"
    >
      <span
        class="text"
      >{{ text }}</span>
    </div>
  </div>
  </template>
  <script setup>
  import { ref, computed, watch, useAttrs } from "vue";
  
  // setting props
  const props = defineProps({
    text: {
      type: String,
      default: 'true',
    },
  })
  </script>
  <style>
  .tooltip-container { 
    position: relative;
    display: inline-block;
    /* margin: 100px; */
  }
  
  .tooltip-container:hover .tooltip{
    opacity: 1;
  
  }
  
  .tooltip { 
    color: #ffffff;
    text-align: center;
    padding: 5px 0;
    border-radius: 4px;
  
    width: 120px;
    bottom: 120%;
    left: 50%;
    margin-left: -60px;
  
    opacity: 0;
    transition: opacity 1s;
  
    position: absolute;
    z-index: 1;
  
    background: #000000;
  }
  
  .text::after {
    content: " ";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #000000 transparent transparent transparent;
  
  }
  </style>